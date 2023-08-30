<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Lib\Traits\Searchable;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\CourtCaseRequest;
use Illuminate\Http\JsonResponse;
use Psy\Util\Str;
use Ramsey\Uuid\Uuid;
use App\Models\CourtCase;
use App\Models\CaseType;
use App\Models\CaseStage;
use App\Models\CourtCaseStage;
use App\Models\CourtCaseFile;
use App\Models\Bank;
use App\Models\BankBranch;
use App\Models\Status;
use Illuminate\Support\Arr;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

class DashboardController extends ApiController
{
  use Searchable;

    public function index(Request $request)
    {
    // get table names
    
    $table = (new User)->getTable();
    $courtCasetable = (new CourtCase)->getTable();
    $statusTable = (new Status)->getTable();
    $caseTypeTable = (new CaseType)->getTable();
    $courtCaseFileTable = (new CourtCaseFile)->getTable();
    $caseStageTable = (new CaseStage)->getTable();

    // $data = array(
    //   'pageSize' => $request->get('page_size', 25),
    //   'sortBy' => $request->get('sort_by', $table . '.id'),
    //   'sortOrder' => $request->get('sort_order', 'desc'),
    // );
    
    // $searchFilter = $request->get('searchFilters');
    // if ($searchFilter) {
    //   $searchFilter = json_decode($searchFilter, true);

    //   if (!isset($searchFilter['combinator'])) {
    //     $searchFilter['combinator'] = 'and';
    //   }
    //   $data['searchFilters'] = $searchFilter;
    // }
    
    // this is required to search
    // $columnMap = [
    // //   'bank_name' => 'bank_name',
    // //   'status_name' => 'status_name',
    // //   'bank_headquarter' => 'bank_headquarter',
    // //   'status' => 'status',
    // //   'status_id' => 'status_id',
    // "name" => "name",
    // ];

    $query1 = User::select([
        $table . '.id',
        \DB::raw("LPAD($table.id, 5, '0') as formatted_case_number"), // Format the id column as three-digit values
        $table . '.uuid',
        $table . '.first_name',
        $table . '.last_name',
        $table . '.email',
        // $table . '.phone',
        \DB::raw("IFNULL($table.phone, 'NA') as formatted_phone"), // Display 'NA' if phone is null
        $table . '.created_at as formatted_created_at',
        // \DB::raw("DATE_FORMAT($table.created_at, '%Y-%m-%d') as formatted_created_at"),
        $table . '.status_id',
        // $statusTable . '.name as status_name',
        \DB::raw("CONCAT(UPPER(SUBSTRING({$statusTable}.name, 1, 1)), LOWER(SUBSTRING({$statusTable}.name, 2))) as status_name"),

    ])->leftJoin($statusTable, function ($join) use ($table, $statusTable) {
        $join->on($statusTable . '.id', '=', $table . '.status_id');
      })->whereNull($table . '.deleted_at')
      ->where($table . '.id', '!=', 1) // Exclude rows with id = 1
      ->orderBy($table . '.created_at', 'desc')
      ->limit(5);

    //   $query2 = User::withoutGlobalScopes()->select([
    //     \DB::raw("COUNT($table.id) as total_user_count"), 
    // ]);

    $query2 = User::withoutGlobalScopes()
    ->where('id', '!=', 1) // Exclude user with ID 1
    ->select([
        \DB::raw("COUNT($table.id) as total_user_count"), 
    ])
    ->get();

    // $query3 = User::select([
    //     \DB::raw("COUNT($table.id) as total_active_user_count"), 
    // ])->leftJoin($statusTable, function ($join) use ($table, $statusTable) {
    //     $join->on($statusTable . '.id', '=', $table . '.status_id');
    //   })->where($table . '.status_id', '=', 1);

    $query4 = CourtCase::withoutGlobalScopes()->select([
        \DB::raw("COUNT($courtCasetable.id) as total_registered_case"), 
    ])->whereNull("{$courtCasetable}.deleted_at");

    $userId = auth()->user()->id; // Get the ID of the currently authenticated user
    $query4_user = CourtCase::withoutGlobalScopes()
        ->select([
            \DB::raw("COUNT(id) as total_registered_case_user"), 
        ])
        ->where('assignee_id', $userId) // Filter cases for the current user
        ->whereNull("{$courtCasetable}.deleted_at")
        ->groupBy('assignee_id') // Group the results by assignee_id
        ->get();

    $query4_bank_reccovery = CourtCase::withoutGlobalScopes()->select([
      \DB::raw("COUNT($courtCasetable.id) as total_registered_case_bank_recovery"), 
      ])->whereNull("{$courtCasetable}.deleted_at")
      ->where($courtCasetable . '.case_type_id', '=', 1);

    $query4_bank_reccovery_user = CourtCase::withoutGlobalScopes()->select([
      \DB::raw("COUNT($courtCasetable.id) as total_registered_case_bank_recovery_user"), 
      ])->whereNull("{$courtCasetable}.deleted_at")
      ->where($courtCasetable . '.case_type_id', '=', 1);
    if ($userId) {
        $query4_bank_reccovery_user->where($courtCasetable . '.assignee_id', '=', $userId);
    }

    $query4_macd_cases = CourtCase::withoutGlobalScopes()->select([
      \DB::raw("COUNT($courtCasetable.id) as total_registered_case_macd"), 
      ])->whereNull("{$courtCasetable}.deleted_at")
      ->where($courtCasetable . '.case_type_id', '=', 2);

    $query4_macd_cases_user = CourtCase::withoutGlobalScopes()->select([
      \DB::raw("COUNT($courtCasetable.id) as total_registered_case_macd_user"), 
      ])->whereNull("{$courtCasetable}.deleted_at")
      ->where($courtCasetable . '.case_type_id', '=', 2);
    if ($userId) {
        $query4_macd_cases_user->where($courtCasetable . '.assignee_id', '=', $userId);
    }
    // $query5 = CourtCase::select([
    //     \DB::raw("COUNT($courtCasetable.id) as total_registered_case_closed"), 
    // ])->whereNull($courtCasetable . '.deleted_at');
   
    $query5 = CourtCase::select([
        \DB::raw("COUNT($courtCasetable.id) as total_registered_case_closed"), 
    ])->leftJoin($statusTable, function ($join) use ($courtCasetable, $statusTable) {
        $join->on($statusTable . '.id', '=', $courtCasetable . '.status_id');
      })->where($courtCasetable . '.status_id', '=', 5);


      $query5_user = CourtCase::select([
        \DB::raw("COUNT($courtCasetable.id) as total_registered_case_closed_user"), 
    ])->leftJoin($statusTable, function ($join) use ($courtCasetable, $statusTable) {
        $join->on($statusTable . '.id', '=', $courtCasetable . '.status_id');
      })->where($courtCasetable . '.status_id', '=', 5);
      if ($userId) {
        $query5_user->where($courtCasetable . '.assignee_id', '=', $userId);
    }

    $query5_bank_reccovery = CourtCase::select([
      \DB::raw("COUNT($courtCasetable.id) as total_registered_case_closed_bank_recovery"), 
      ])->leftJoin($statusTable, function ($join) use ($courtCasetable, $statusTable) {
          $join->on($statusTable . '.id', '=', $courtCasetable . '.status_id');
      })->where($courtCasetable . '.status_id', '=', 5)
      ->where($courtCasetable . '.case_type_id', '=', 1);


    $query5_bank_reccovery_user = CourtCase::select([
      \DB::raw("COUNT($courtCasetable.id) as total_registered_case_closed_bank_recovery_user"), 
      ])->leftJoin($statusTable, function ($join) use ($courtCasetable, $statusTable) {
          $join->on($statusTable . '.id', '=', $courtCasetable . '.status_id');
      })->where($courtCasetable . '.status_id', '=', 5)
      ->where($courtCasetable . '.case_type_id', '=', 1);
      if ($userId) {
        $query5_bank_reccovery_user->where($courtCasetable . '.assignee_id', '=', $userId);
    }

    $query5_macd_cases = CourtCase::select([
      \DB::raw("COUNT($courtCasetable.id) as total_registered_case_closed_macd"), 
      ])->leftJoin($statusTable, function ($join) use ($courtCasetable, $statusTable) {
      $join->on($statusTable . '.id', '=', $courtCasetable . '.status_id');
      })->where($courtCasetable . '.status_id', '=', 5)
      ->where($courtCasetable . '.case_type_id', '=', 2);

    
      $query5_macd_cases_user = CourtCase::select([
        \DB::raw("COUNT($courtCasetable.id) as total_registered_case_closed_macd_user"), 
        ])->leftJoin($statusTable, function ($join) use ($courtCasetable, $statusTable) {
        $join->on($statusTable . '.id', '=', $courtCasetable . '.status_id');
        })->where($courtCasetable . '.status_id', '=', 5)
        ->where($courtCasetable . '.case_type_id', '=', 2);
        if ($userId) {
          $query5_macd_cases_user->where($courtCasetable . '.assignee_id', '=', $userId);
      }

    $selectedYear = $request->year;
    if (!$selectedYear) {
      $selectedYear = Carbon::now()->year;
    }
    // $selectedYear = isset($year) ? $year : Carbon::now()->year;
    $query6 = CourtCase::select([
      \DB::raw("YEAR(created_at) as year"),
      \DB::raw("MONTH(created_at) as month_number"),  // Extract numeric month value
      \DB::raw("DATE_FORMAT(created_at, '%b') as month_name"),  // '%b' will give you abbreviated month names like JAN, FEB, etc.
      \DB::raw("SUM(CASE WHEN status_id = 1 THEN 1 ELSE 0 END) as count_status_1"),
      \DB::raw("SUM(CASE WHEN status_id = 5 THEN 1 ELSE 0 END) as count_status_5"),
      ])
      ->whereYear('created_at', $selectedYear) // Filter by the selected year
      ->groupBy('year', 'month_number', 'month_name')
      ->orderBy('year', 'asc')
      ->orderBy('month_number', 'asc');

      $query6_years = CourtCase::select([
            \DB::raw("YEAR(created_at) as year")
        ])
        ->groupBy('year')
        ->pluck('year');


      $query6_user = CourtCase::select([
        \DB::raw("YEAR(created_at) as year"),
        \DB::raw("MONTH(created_at) as month_number"),  // Extract numeric month value
        \DB::raw("DATE_FORMAT(created_at, '%b') as month_name"),  // '%b' will give you abbreviated month names like JAN, FEB, etc.
        \DB::raw("SUM(CASE WHEN status_id = 1 THEN 1 ELSE 0 END) as count_status_1"),
        \DB::raw("SUM(CASE WHEN status_id = 5 THEN 1 ELSE 0 END) as count_status_5"),
        ])
        ->whereYear('created_at', $selectedYear) // Filter by the selected year
        ->where('assignee_id', $userId) // Filter by the user's ID
        ->groupBy('year', 'month_number', 'month_name')
        ->orderBy('year', 'asc')
        ->orderBy('month_number', 'asc');

    $currentDate = Carbon::now();

    $query7 = CourtCaseFile::select([
      "{$courtCaseFileTable}.id",
      "{$courtCasetable}.uuid",
      "{$courtCaseFileTable}.case_id",
      "{$courtCaseFileTable}.date_of_acknowledgment",
      "{$courtCaseFileTable}.due_date",
      "{$courtCaseFileTable}.date_of_filling",
      "{$courtCaseFileTable}.date_of_dm_order",
      "{$courtCaseFileTable}.date_of_physical_possession",
      "{$courtCaseFileTable}.case_number",
      "{$courtCaseFileTable}.date_of_dawa",
      "{$courtCaseFileTable}.date_of_kathan",
      "{$courtCaseFileTable}.date_of_notice",
      "{$courtCaseFileTable}.date_of_ws",
      "{$courtCaseFileTable}.date_of_evidence",
      "{$courtCaseFileTable}.date_of_six_seventeen",
      "{$courtCaseFileTable}.date_of_question",
      "{$courtCaseFileTable}.date_of_dispose",
      // \DB::raw("IFNULL($courtCaseFileTable.case_number, 'NA') as formatted_case_number"), // Display 'NA' if case_number is null
      "{$courtCasetable}.case_type_id",
      \DB::raw("({$caseTypeTable}.case_type) AS case_type_name"),
      \DB::raw("LPAD($table.id, 5, '0') as formatted_case_number"), // Format the id column as three-digit values
      "{$courtCasetable}.status_id",
      // \DB::raw("({$statusTable}.name) AS status_name"),
      \DB::raw("CONCAT(UPPER(SUBSTRING({$statusTable}.name, 1, 1)), LOWER(SUBSTRING({$statusTable}.name, 2))) as status_name"),

      "{$courtCasetable}.assignee_id",
      \DB::raw("CONCAT({$table}.first_name, ' ', {$table}.last_name) AS full_name"),
      
      // "{$courtCasetable}.court_name",
      \DB::raw("IFNULL($courtCasetable.court_name, 'NA') as formatted_court_name"), // Display 'NA' if court_name is null

      // "{$courtCasetable}.fir_number",
      \DB::raw("IFNULL($courtCasetable.fir_number, 'NA') as formatted_fir_number"), // Display 'NA' if fir_number is null

      // "{$courtCasetable}.macc_number",
      \DB::raw("IFNULL($courtCasetable.macc_number, 'NA') as formatted_macc_number"), // Display 'NA' if fir_number is null
      
      "{$courtCaseFileTable}.case_stage_id",
      \DB::raw("({$caseStageTable}.stage_name) AS stage_names"),
      \DB::raw("COALESCE({$courtCaseFileTable}.date_of_acknowledgment, {$courtCaseFileTable}.due_date, {$courtCaseFileTable}.date_of_filling, {$courtCaseFileTable}.date_of_dm_order, {$courtCaseFileTable}.date_of_physical_possession, {$courtCaseFileTable}.date_of_dawa, {$courtCaseFileTable}.date_of_kathan, {$courtCaseFileTable}.date_of_notice, {$courtCaseFileTable}.date_of_ws, {$courtCaseFileTable}.date_of_evidence, {$courtCaseFileTable}.date_of_six_seventeen, {$courtCaseFileTable}.date_of_question, {$courtCaseFileTable}.date_of_dispose) AS date"),
      "{$courtCaseFileTable}.user_login_id",

      ])->leftJoin("{$courtCasetable}", "{$courtCasetable}.id", "=", "{$courtCaseFileTable}.case_id")
      ->leftJoin("{$statusTable}", "{$statusTable}.id", "=", "{$courtCasetable}.status_id")
      ->leftJoin("{$table}", "{$table}.id", "=", "{$courtCasetable}.assignee_id")
      ->leftJoin("{$caseTypeTable}", "{$caseTypeTable}.id", "=", "{$courtCasetable}.case_type_id")
      ->leftJoin("{$caseStageTable}", "{$caseStageTable}.id", "=", "{$courtCaseFileTable}.case_stage_id")
      ->whereNull("{$courtCaseFileTable}.deleted_at")
      ->where("{$courtCasetable}.status_id", "<>", 5)
      ->where(function ($query7) use ($currentDate,$courtCaseFileTable) {
        $query7->where("{$courtCaseFileTable}.date_of_acknowledgment", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.due_date", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_filling", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_dm_order", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_physical_possession", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_dawa", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_kathan", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_notice", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_ws", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_evidence", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_six_seventeen", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_question", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_dispose", "<", $currentDate);
    })
      ->orderBy("{$courtCaseFileTable}.created_at", "desc") // Add the ORDER BY clause here
      ->limit(10); // Add the limit clause

    $query7_user = CourtCaseFile::select([
      "{$courtCaseFileTable}.id",
      "{$courtCasetable}.uuid",
      "{$courtCaseFileTable}.case_id",
      "{$courtCaseFileTable}.date_of_acknowledgment",
      "{$courtCaseFileTable}.due_date",
      "{$courtCaseFileTable}.date_of_filling",
      "{$courtCaseFileTable}.date_of_dm_order",
      "{$courtCaseFileTable}.date_of_physical_possession",
      "{$courtCaseFileTable}.date_of_dawa",
      "{$courtCaseFileTable}.date_of_kathan",
      "{$courtCaseFileTable}.date_of_notice",
      "{$courtCaseFileTable}.date_of_ws",
      "{$courtCaseFileTable}.date_of_evidence",
      "{$courtCaseFileTable}.date_of_six_seventeen",
      "{$courtCaseFileTable}.date_of_question",
      "{$courtCaseFileTable}.date_of_dispose",
      \DB::raw("({$caseTypeTable}.case_type) AS case_type_name"),
      \DB::raw("LPAD($table.id, 5, '0') as formatted_case_number"),
      "{$courtCasetable}.status_id",
      \DB::raw("CONCAT(UPPER(SUBSTRING({$statusTable}.name, 1, 1)), LOWER(SUBSTRING({$statusTable}.name, 2))) as status_name"),
      \DB::raw("CONCAT({$table}.first_name, ' ', {$table}.last_name) AS full_name"),
      \DB::raw("IFNULL($courtCasetable.court_name, 'NA') as formatted_court_name"),
      \DB::raw("IFNULL($courtCasetable.fir_number, 'NA') as formatted_fir_number"),
      \DB::raw("IFNULL($courtCasetable.macc_number, 'NA') as formatted_macc_number"),
      "{$courtCaseFileTable}.case_stage_id",
      \DB::raw("({$caseStageTable}.stage_name) AS stage_names"),
      \DB::raw("COALESCE({$courtCaseFileTable}.date_of_acknowledgment, {$courtCaseFileTable}.due_date, {$courtCaseFileTable}.date_of_filling, {$courtCaseFileTable}.date_of_dm_order, {$courtCaseFileTable}.date_of_physical_possession, {$courtCaseFileTable}.date_of_dawa, {$courtCaseFileTable}.date_of_kathan, {$courtCaseFileTable}.date_of_notice, {$courtCaseFileTable}.date_of_ws, {$courtCaseFileTable}.date_of_evidence, {$courtCaseFileTable}.date_of_six_seventeen, {$courtCaseFileTable}.date_of_question, {$courtCaseFileTable}.date_of_dispose) AS date"),
      "{$caseStageTable}.stage_name",
      "{$courtCaseFileTable}.user_login_id",
      "{$courtCasetable}.id",
  ])
      ->leftJoin("{$caseStageTable}", "{$caseStageTable}.id", "=", "{$courtCaseFileTable}.case_stage_id")
      ->leftJoin("{$courtCasetable}", "{$courtCasetable}.id", "=", "{$courtCaseFileTable}.case_id")
      ->leftJoin("{$caseTypeTable}", "{$caseTypeTable}.id", "=", "{$courtCasetable}.case_type_id")
      ->leftJoin("{$statusTable}", "{$statusTable}.id", "=", "{$courtCasetable}.status_id")
      ->leftJoin("{$table}", "{$table}.id", "=", "{$courtCaseFileTable}.user_login_id")
      ->where("{$courtCaseFileTable}.user_login_id", "=", $userId)
      ->whereNull("{$courtCaseFileTable}.deleted_at")
      ->where("{$courtCasetable}.status_id", "<>", 5)
      ->where(function ($query7_user) use ($currentDate,$courtCaseFileTable) {
        $query7_user->where("{$courtCaseFileTable}.date_of_acknowledgment", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.due_date", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_filling", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_dm_order", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_physical_possession", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_dawa", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_kathan", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_notice", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_ws", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_evidence", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_six_seventeen", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_question", "<", $currentDate)
            ->orWhere("{$courtCaseFileTable}.date_of_dispose", "<", $currentDate);
    })
      ->orderBy("{$courtCaseFileTable}.created_at", "desc") // Add the ORDER BY clause here
      ->limit(10);
  

    $query8 = CourtCase::select([
      \DB::raw("COUNT(*) as count_same_date"),
      \DB::raw("DATE_FORMAT($courtCasetable.created_at, '%Y-%m-%d') as formatted_created_at"),
      ])
      ->leftJoin("{$statusTable}", "{$statusTable}.id", "=", "{$courtCasetable}.status_id")
      ->leftJoin("{$table}", "{$table}.id", "=", "{$courtCasetable}.assignee_id")
      ->leftJoin("{$caseTypeTable}", "{$caseTypeTable}.id", "=", "{$courtCasetable}.case_type_id")
      ->whereNull("{$courtCasetable}.deleted_at")
      ->where("{$courtCasetable}.status_id", "<>", 5)
      ->groupBy(\DB::raw("DATE_FORMAT($courtCasetable.created_at, '%Y-%m-%d')"))
      ->orderBy(\DB::raw("DATE_FORMAT($courtCasetable.created_at, '%Y-%m-%d')"));      

          
      $query8_user = CourtCase::select([
        \DB::raw("COUNT(*) as count_same_date_user"),
        \DB::raw("DATE_FORMAT($courtCasetable.created_at, '%Y-%m-%d') as formatted_created_at_user"),
        ])
        ->leftJoin("{$statusTable}", "{$statusTable}.id", "=", "{$courtCasetable}.status_id")
        ->leftJoin("{$table}", "{$table}.id", "=", "{$courtCasetable}.assignee_id")
        ->leftJoin("{$caseTypeTable}", "{$caseTypeTable}.id", "=", "{$courtCasetable}.case_type_id")
        ->whereNull("{$courtCasetable}.deleted_at")
        ->where("{$courtCasetable}.status_id", "<>", 5)
        ->groupBy(\DB::raw("DATE_FORMAT($courtCasetable.created_at, '%Y-%m-%d')"))
        ->orderBy(\DB::raw("DATE_FORMAT($courtCasetable.created_at, '%Y-%m-%d')"));      
      if ($userId) {
        $query8_user->where($courtCasetable . '.assignee_id', '=', $userId);
    }


    $query9 = CourtCase::select([
      "{$courtCasetable}.id",
      \DB::raw("LPAD($table.id, 5, '0') as formatted_case_number"), // Format the id column as three-digit values
      "{$courtCasetable}.uuid",
      "{$courtCasetable}.case_type_id",
      \DB::raw("({$caseTypeTable}.case_type) AS case_type_name"),
      "{$courtCasetable}.status_id",
      \DB::raw("({$statusTable}.name) AS status_name"),
      "{$courtCasetable}.assignee_id",
      \DB::raw("CONCAT({$table}.first_name, ' ', {$table}.last_name) AS full_name"),
      \DB::raw("DATE_FORMAT($courtCasetable.created_at, '%Y-%m-%d') as formatted_created_at"),
      \DB::raw("YEAR($courtCasetable.created_at) as year"),
      \DB::raw("MONTH($courtCasetable.created_at) as month"),
      ])
      ->leftJoin("{$statusTable}", "{$statusTable}.id", "=", "{$courtCasetable}.status_id")
      ->leftJoin("{$table}", "{$table}.id", "=", "{$courtCasetable}.assignee_id")
      ->leftJoin("{$caseTypeTable}", "{$caseTypeTable}.id", "=", "{$courtCasetable}.case_type_id")
      ->whereNull("{$courtCasetable}.deleted_at")
      ->where("{$courtCasetable}.status_id", "<>", 5);

      $query9_user = CourtCase::select([
        "{$courtCasetable}.id",
        \DB::raw("LPAD($table.id, 5, '0') as formatted_case_number"), // Format the id column as three-digit values
        "{$courtCasetable}.uuid",
        "{$courtCasetable}.case_type_id",
        \DB::raw("({$caseTypeTable}.case_type) AS case_type_name"),
        "{$courtCasetable}.status_id",
        \DB::raw("({$statusTable}.name) AS status_name"),
        "{$courtCasetable}.assignee_id",
        \DB::raw("CONCAT({$table}.first_name, ' ', {$table}.last_name) AS full_name"),
        \DB::raw("DATE_FORMAT($courtCasetable.created_at, '%Y-%m-%d') as formatted_created_at_user"),
        \DB::raw("YEAR($courtCasetable.created_at) as year"),
        \DB::raw("MONTH($courtCasetable.created_at) as month"),
        ])
        ->leftJoin("{$statusTable}", "{$statusTable}.id", "=", "{$courtCasetable}.status_id")
        ->leftJoin("{$table}", "{$table}.id", "=", "{$courtCasetable}.assignee_id")
        ->leftJoin("{$caseTypeTable}", "{$caseTypeTable}.id", "=", "{$courtCasetable}.case_type_id")
        ->whereNull("{$courtCasetable}.deleted_at")
        ->where("{$courtCasetable}.status_id", "<>", 5);

        if ($userId) {
          $query9_user->where($courtCasetable . '.assignee_id', '=', $userId);
      }


    $rowNumber = 0; // Initialize rowNumber variable
    $userDetails = $query1->get();
    foreach ($userDetails as $item) {
      $item->row_number = ++$rowNumber; // Increment and assign serial number
    }

    $totalUsers = $query2->first();
    // $totalActiveUsers = $query3->first();
    $totalRegisteredCases = $query4->first();
    $totalRegisteredCasesUser = $query4_user->first();
    $totalRegisteredClosedCases = $query5->first();
    $totalRegisteredClosedCasesUser = $query5_user->first();
    $totalBankRegisteredCases = $query4_bank_reccovery->first();
    $totalBankRegisteredCasesUser = $query4_bank_reccovery_user->first();
    $totalRegisteredClosedCasesBankRecovery = $query5_bank_reccovery->first();
    $totalRegisteredClosedCasesBankRecoveryUser = $query5_bank_reccovery_user->first();
    $totalMacdRegisteredCases = $query4_macd_cases->first();
    $totalMacdRegisteredCasesUser = $query4_macd_cases_user->first();
    $totalRegisteredClosedCasesMacd = $query5_macd_cases->first();
    $totalRegisteredClosedCasesMacdUser = $query5_macd_cases_user->first();
    $monthlyCourtCaseCounts = $query6->get();
    $yearCourtCaseCounts = $query6_years->toArray();

    
    $monthlyCourtCaseCountsUser = $query6_user->get();
    
    $rowNumber_date = 0; // Initialize rowNumber variable
    $dueDateCases = $query7->get();
    foreach ($dueDateCases as $item) {
      $item->row_number_date = ++$rowNumber_date; // Increment and assign serial number
    }


    

    $rowNumber_date_user = 0; // Initialize rowNumber variable
    $dueDateCasesUser = $query7_user->get();
    foreach ($dueDateCasesUser as $item) {
      $item->row_number_date = ++$rowNumber_date_user; // Increment and assign serial number
    }

    $query8Results = $query8->get();
    $query9Results = $query9->get();

    $query8ResultsUser = $query8_user->get();
    $query9ResultsUser = $query9_user->get();

    

    
    $combinedResponse = [];
    
    foreach ($query8Results as $result8) {
        $combinedItem = [
            'count_same_date' => $result8->count_same_date,
            'formatted_created_at' => $result8->formatted_created_at,
        ];

    
        foreach ($query9Results as $result9) {
            if ($result9->formatted_created_at === $result8->formatted_created_at) {
                $combinedItem['calender_view_court_case_details_info'][] = [
                    'id' => $result9->id,
                    'formatted_case_number' => $result9->formatted_case_number,
                    'uuid' => $result9->uuid,
                    'case_type_id' => $result9->case_type_id,
                    'case_type_name' => $result9->case_type_name,
                    'status_id' => $result9->status_id,
                    'status_name' => $result9->status_name,
                    'assignee_id' => $result9->assignee_id,
                    'full_name' => $result9->full_name,
                    'formatted_created_at' => $result9->formatted_created_at,
                    'year' => $result9->year,
                    'month' => $result9->month,
                ];
            }
        }
    
        $combinedResponse[] = $combinedItem;
    }


    $combinedResponse1 = [];
    
    foreach ($query8ResultsUser as $result8) {
        $combinedItem1 = [
            'count_same_date_user' => $result8->count_same_date_user,
            'formatted_created_at_user' => $result8->formatted_created_at_user,
        ];

    
        foreach ($query9ResultsUser as $result9) {
            if ($result9->formatted_created_at_user === $result8->formatted_created_at_user) {
                $combinedItem1['calender_view_court_case_details_info_user'][] = [
                    'id' => $result9->id,
                    'formatted_case_number' => $result9->formatted_case_number,
                    'uuid' => $result9->uuid,
                    'case_type_id' => $result9->case_type_id,
                    'case_type_name' => $result9->case_type_name,
                    'status_id' => $result9->status_id,
                    'status_name' => $result9->status_name,
                    'assignee_id' => $result9->assignee_id,
                    'full_name' => $result9->full_name,
                    'formatted_created_at_user' => $result9->formatted_created_at_user,
                    'year' => $result9->year,
                    'month' => $result9->month,
                ];
            }
        }
    
        $combinedResponse1[] = $combinedItem1;
    }


    $monthlyCounts = [];
    for ($monthNumber = 1; $monthNumber <= 12; $monthNumber++) {
        $matchingMonth = $monthlyCourtCaseCounts->firstWhere('month_number', $monthNumber);

        $monthlyCounts[] = [
            'year' => $matchingMonth ? $matchingMonth->year : $selectedYear,
            // 'year' => $matchingMonth ? $matchingMonth->year : date('Y'), // Use current year if no data for the month
            'month' => $matchingMonth ? $matchingMonth->month_name : date('M', mktime(0, 0, 0, $monthNumber, 1)), // Use abbreviated month name
            'count_status_1' => $matchingMonth ? $matchingMonth->count_status_1 : 0,
            'count_status_5' => $matchingMonth ? $matchingMonth->count_status_5 : 0,
        ];
    }


    $monthlyCounts1 = [];
    for ($monthNumber = 1; $monthNumber <= 12; $monthNumber++) {
        $matchingMonth = $monthlyCourtCaseCountsUser->firstWhere('month_number', $monthNumber);

        $monthlyCounts1[] = [
            'year' => $matchingMonth ? $matchingMonth->year : $selectedYear,
            // 'year' => $matchingMonth ? $matchingMonth->year : date('Y'), // Use current year if no data for the month
            'month' => $matchingMonth ? $matchingMonth->month_name : date('M', mktime(0, 0, 0, $monthNumber, 1)), // Use abbreviated month name
            'count_status_1' => $matchingMonth ? $matchingMonth->count_status_1 : 0,
            'count_status_5' => $matchingMonth ? $matchingMonth->count_status_5 : 0,
        ];
    }

    // // Combine the results into a single array
    if ($userId == 1){
    $combinedData = [
        'recent_user_details' => $userDetails,
        'total_users' => $totalUsers->total_user_count,
        // 'total_active_users' => $totalActiveUsers->total_active_user_count,
        'total_registered_cases' => $totalRegisteredCases->total_registered_case,
        'total_registered_closed_cases' => $totalRegisteredClosedCases->total_registered_case_closed,
        'total_registered_bank_cases' => $totalBankRegisteredCases->total_registered_case_bank_recovery, 
        'total_registered_closed_cases_bank_recovery' => $totalRegisteredClosedCasesBankRecovery->total_registered_case_closed_bank_recovery,
        'total_registered_mact_cases' => $totalMacdRegisteredCases->total_registered_case_macd, 
        'total_registered_closed_cases_mact' => $totalRegisteredClosedCasesMacd->total_registered_case_closed_macd,
        'monthly_court_case_counts' => $monthlyCounts,
        'year_list' => $yearCourtCaseCounts,
        'due_date_court_case_details' => $dueDateCases,
        'calender_view_court_case_details' => $combinedResponse,
             
    ];

  } else {
    $combinedData = [
      'total_registered_cases_user' => $totalRegisteredCasesUser->total_registered_case_user,
      'total_registered_closed_cases_user' => $totalRegisteredClosedCasesUser->total_registered_case_closed_user,
      'total_registered_bank_cases_user' => $totalBankRegisteredCasesUser->total_registered_case_bank_recovery_user, 
      'total_registered_closed_cases_bank_recovery_user' => $totalRegisteredClosedCasesBankRecoveryUser->total_registered_case_closed_bank_recovery_user,
      'total_registered_mact_cases_user' => $totalMacdRegisteredCasesUser->total_registered_case_macd_user, 
      'total_registered_closed_cases_mact_user' => $totalRegisteredClosedCasesMacdUser->total_registered_case_closed_macd_user,
      'monthly_court_case_counts_user' => $monthlyCounts1,
      'year_list' => $yearCourtCaseCounts,     
      'due_date_court_case_details_user' => $dueDateCasesUser,
      'calender_view_court_case_details_user' => $combinedResponse1,
  ];
  }

      
    // Return the combined results as a JSON response
    // return response()->json($result);

    $responseData = [
        'current_page' => 1,
            'data' => [$combinedData],
            'first_page_url' => '', // Replace with appropriate URL
            'from' => 1,
            'last_page' => 1,
            'last_page_url' => '', // Replace with appropriate URL
            'links' => [], // Define links if necessary
            'next_page_url' => '', // Replace with appropriate URL
            'path' => '', // Replace with appropriate URL
            'per_page' => 10,
            'prev_page_url' => null,
            'to' => 1,
            'total' => 1,
        // 'message' => '',
        // 'status' => 'ok',
    ];

    // return response()->json($responseData);

    // $list = $this->getData($responseData, true);
    $this->apiResponse['data'] = $combinedData;
    return $this->sendResponse();
  }
    
   
}