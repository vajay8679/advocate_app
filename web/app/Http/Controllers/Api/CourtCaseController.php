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

class CourtCaseController extends ApiController
{
  use Searchable;
  
  public function index(CourtCaseRequest $request)
  {
    // get table names
    $table = (new CourtCase)->getTable();
    $bankTable = (new Bank)->getTable();
    $bankBranchTable = (new BankBranch)->getTable();
    $caseTypeTable = (new CaseType)->getTable();
    $userTable = (new User)->getTable();
    $statusTable = (new Status)->getTable();
    $courtCaseFileTable = (new CourtCaseFile)->getTable();

    $data = array(
      'pageSize' => $request->get('page_size', 25),
      '_pageNo' => $request->get('page_no', 'asc'),
      'sortBy' => $request->get('sort_by', $table . '.id'),
      'sortOrder' => $request->get('sort_order', 'desc'),

      'caseTypeId' => $request->input('case_type_id')
    );

    $searchFilter = $request->get('searchFilters');
    if ($searchFilter) {
      // $searchFilter = json_decode($searchFilter, true);

      if (!isset($searchFilter['combinator'])) {
        $searchFilter['combinator'] = 'and';
      }
      $data['searchFilters'] = $searchFilter;
    }

    // this is required to search
    $columnMap = [
      'bank_name' => 'bank_name',
      'status_name' => "{$statusTable}.name",
      'branch_name' => 'branch_name',
      'full_name' => \DB::raw("CONCAT({$userTable}.first_name, ' ', {$userTable}.last_name)"),
      'court_name' => 'court_name',
      'thana' => 'thana',
      'company_advocate' => 'company_advocate',
      'title' => 'title',
      'status' => 'status',
      'status_id' => 'status_id',
      'customer_name' => 'customer_name',
      'formatted_case_number' =>  \DB::raw("LPAD({$table}.id, 5, '0')") 
    ];

    $loggedInUserId = auth()->user()->id;
    $currentDate = Carbon::now();

    $query = CourtCase::select([
      $table . '.id',
      \DB::raw("LPAD($table.id, 5, '0') as formatted_case_number"), // Format the id column as three-digit values
      $table . '.uuid',
      $table . '.title',
      $table . '.case_type_id',
      $table . '.assignee_id',
      // \DB::raw("CONCAT($userTable.first_name, ' ', $userTable.last_name) as full_name"),
      \DB::raw("CONCAT({$userTable}.first_name, ' ', {$userTable}.last_name) as full_name"),

      \DB::raw("DATE_FORMAT($table.created_at, '%Y-%m-%d') as formatted_created_at"),

      $table . '.death',
      \DB::raw("DATE_FORMAT($table.death, '%Y-%m-%d') as death"),
      $table . '.injury',
      $table . '.insurance_company',
      $table . '.vehicle_number',
      $table . '.vehicle_owner',
      $table . '.vehicle_driver',
      $table . '.fir_number',
      $table . '.thana',
      $table . '.fir_delay',
      $table . '.status_id',
      // $statusTable . '.name as status_name',
      // \DB::raw("({$statusTable}.name) AS status_name"),
      \DB::raw("CASE WHEN {$table}.status_id = 5 THEN 1 ELSE 0 END as is_highlighted"), // Add the is_highlighted field
      \DB::raw("CONCAT(UPPER(SUBSTRING({$statusTable}.name, 1, 1)), LOWER(SUBSTRING({$statusTable}.name, 2))) as status_name"),


      $table . '.cnr',
      $table . '.filling_number',
      $table . '.macc_number',
      $table . '.court_name',
      $table . '.date_of_filling',
      \DB::raw("DATE_FORMAT($table.date_of_filling, '%Y-%m-%d') as date_of_filling"),

      $table . '.next_date',
      \DB::raw("DATE_FORMAT($table.next_date, '%Y-%m-%d') as next_date"),

      $table . '.company_advocate',
      $table . '.challan',
      $table . '.remark',
      $table . '.company_file_number',
      $table . '.investigation',
      $table . '.office_file_number',
      $table . '.date_of_disposal',
      \DB::raw("DATE_FORMAT($table.date_of_disposal, '%Y-%m-%d') as date_of_disposal"),

      $table . '.allotted_date',
      $table . '.loan_account_number',
      $table . '.symbolic_account',
      $table . '.customer_name',
      $table . '.customer_phone',
      $table . '.customer_address',
      $table . '.customer_phone',
      $table . '.case_stage',
      $table . '.updated_at',
      $table . '.bank_id',
      $table . '.bank_branch_id',
      $bankTable . '.bank_name',
      $bankBranchTable . '.branch_name',
      \DB::raw("(SELECT
      COALESCE(
          court_case_files.date_of_acknowledgment,
          court_case_files.due_date,
          court_case_files.date_of_filling,
          court_case_files.date_of_dm_order,
          court_case_files.date_of_physical_possession,
          court_case_files.date_of_dawa,
          court_case_files.date_of_kathan,
          court_case_files.date_of_notice,
          court_case_files.date_of_ws,
          court_case_files.date_of_evidence,
          court_case_files.date_of_six_seventeen,
          court_case_files.date_of_question,
          court_case_files.date_of_dispose
      )
      FROM court_case_files
      WHERE court_case_files.case_id = $table.id
      AND court_case_files.deleted_at IS NULL
      LIMIT 1
      ) AS date"),

      \DB::raw("CASE WHEN COALESCE(
        {$courtCaseFileTable}.date_of_acknowledgment,
        {$courtCaseFileTable}.due_date,
        {$courtCaseFileTable}.date_of_filling,
        {$courtCaseFileTable}.date_of_dm_order,
        {$courtCaseFileTable}.date_of_physical_possession,
        {$courtCaseFileTable}.date_of_dawa,
        {$courtCaseFileTable}.date_of_kathan,
        {$courtCaseFileTable}.date_of_notice,
        {$courtCaseFileTable}.date_of_ws,
        {$courtCaseFileTable}.date_of_evidence,
        {$courtCaseFileTable}.date_of_six_seventeen,
        {$courtCaseFileTable}.date_of_question,
        {$courtCaseFileTable}.date_of_dispose
    ) IS NOT NULL THEN 0 ELSE 1 END AS flag_date")
     
    ])->leftJoin($bankTable, function ($join) use ($table, $bankTable) {
      $join->on($bankTable . '.id', '=', $table . '.bank_id');
    })->leftJoin($bankBranchTable, function ($join) use ($table, $bankBranchTable) {
      $join->on($bankBranchTable . '.id', '=', $table . '.bank_branch_id');
    })->leftJoin($statusTable, function ($join) use ($table, $statusTable) {
      $join->on($statusTable . '.id', '=', $table . '.status_id');
    })->leftJoin($userTable, function ($join) use ($table, $userTable) {
      $join->on($userTable . '.id', '=', $table . '.assignee_id');
    })->leftJoin('court_case_files', function($join) use ($table) {
      $join->on($table . '.id', '=', 'court_case_files.case_id')
          ->where($table . '.deleted_at', '=', NULL)
          ->where('court_case_files.deleted_at', '=', NULL)
          ->where("$table.id", '=','court_case_files.case_id');

  })->orderBy("{$table}.created_at", "desc") // Add the ORDER BY clause here
    ;


    #case_type_id filter
    // $caseTypeId = $request->input('case_type_id');
    // if ($caseTypeId !== null && in_array($caseTypeId, [1, 2])) {
    //     $query->where('case_type_id', $caseTypeId);
    // }


    $caseTypeId = $data['caseTypeId'];
    if ($caseTypeId !== null && in_array($caseTypeId, [1, 2])) {
        $query->where('case_type_id', $caseTypeId);
    }


    $keys_for_cas_type_one = ['death','injury','insurance_company','vehicle_number','vehicle_owner','vehicle_driver','fir_number','thana','fir_delay','cnr','filling_number','macc_number','court_name','date_of_filling','next_date','company_advocate','challan','remark','company_file_number','investigation','office_file_number','date_of_disposal'];
    
    $keys_for_cas_type_two = ['allotted_date','loan_account_number','symbolic_account','customer_name','customer_phone','customer_address','case_stage','updated_at','bank_id','bank_branch_id','bank_name','branch_name'];
   
    if ($loggedInUserId !== 1) {
      $query->where(function ($query) use ($loggedInUserId, $table) {
          $query->where($table . '.assignee_id', $loggedInUserId)
              ; // To include cases with no assignee
      });
    }

    $list = $this->getData($query, $data, $table, $columnMap, false);

    foreach ($list as $key => $row) {
      if ($row->case_type_id == 1) {
        $row = Arr::except($row, $keys_for_cas_type_one);
      }else {
        $row = Arr::except($row, $keys_for_cas_type_two);
      }
    }

    $this->apiResponse['data'] = $list;
    return $this->sendResponse();
  }

  public function search(Request $request)
  {
      $table = (new CourtCase)->getTable();
      $bankTable = (new Bank)->getTable();
      $bankBranchTable = (new BankBranch)->getTable();
      $caseTypeTable = (new CaseType)->getTable();
      $userTable = (new User)->getTable();
      $statusTable = (new Status)->getTable();
  
      $startDate = $request->startDate;
      $endDate = $request->endDate;
      $caseTypeId = $request->case_type_id;

      $loggedInUserId = auth()->user()->id;

      $query = CourtCase::select([
      $table . '.id',
      \DB::raw("LPAD($table.id, 5, '0') as formatted_case_number"), // Format the id column as three-digit values
      $table . '.uuid',
      $table . '.title',
      $table . '.case_type_id',
      $table . '.assignee_id',
      \DB::raw("CONCAT($userTable.first_name, ' ', $userTable.last_name) as full_name"),
      \DB::raw("DATE_FORMAT($table.created_at, '%Y-%m-%d') as formatted_created_at"),

      $table . '.death',
      \DB::raw("DATE_FORMAT($table.death, '%Y-%m-%d') as death"),
      $table . '.injury',
      $table . '.insurance_company',
      $table . '.vehicle_number',
      $table . '.vehicle_owner',
      $table . '.vehicle_driver',
      $table . '.fir_number',
      $table . '.thana',
      $table . '.fir_delay',
      $table . '.status_id',
      $statusTable . '.name as status_name',
      $table . '.cnr',
      $table . '.filling_number',
      $table . '.macc_number',
      $table . '.court_name',
      $table . '.date_of_filling',
      \DB::raw("DATE_FORMAT($table.date_of_filling, '%Y-%m-%d') as date_of_filling"),

      $table . '.next_date',
      \DB::raw("DATE_FORMAT($table.next_date, '%Y-%m-%d') as next_date"),

      $table . '.company_advocate',
      $table . '.challan',
      $table . '.remark',
      $table . '.company_file_number',
      $table . '.investigation',
      $table . '.office_file_number',
      $table . '.date_of_disposal',
      \DB::raw("DATE_FORMAT($table.date_of_disposal, '%Y-%m-%d') as date_of_disposal"),

      $table . '.allotted_date',
      $table . '.loan_account_number',
      $table . '.symbolic_account',
      $table . '.customer_name',
      $table . '.customer_phone',
      $table . '.customer_address',
      $table . '.customer_phone',
      $table . '.case_stage',
      $table . '.updated_at',
      $table . '.bank_id',
      $table . '.bank_branch_id',
      $bankTable . '.bank_name',
      $bankBranchTable . '.branch_name',
      // $userTable . '.first_name as assignee_first_name',
      // $userTable . '.last_name as assignee_last_name',
    ])->leftJoin($bankTable, function ($join) use ($table, $bankTable) {
      $join->on($bankTable . '.id', '=', $table . '.bank_id');
    })->leftJoin($bankBranchTable, function ($join) use ($table, $bankBranchTable) {
      $join->on($bankBranchTable . '.id', '=', $table . '.bank_branch_id');
    })->leftJoin($statusTable, function ($join) use ($table, $statusTable) {
      $join->on($statusTable . '.id', '=', $table . '.status_id');
    })->leftJoin($userTable, function ($join) use ($table, $userTable) {
      $join->on($userTable . '.id', '=', $table . '.assignee_id');
    })->orderBy("{$table}.created_at", "desc");

    // Additional filter for date range
    if ($startDate && $endDate) {
        $startDate = Carbon::parse($startDate)->format('Y-m-d');
        $endDate = Carbon::parse($endDate)->format('Y-m-d');
        $query->whereBetween(\DB::raw("DATE($table.created_at)"), [$startDate, $endDate]);
    }

    // Additional filter for case_type_id
    if ($caseTypeId !== null) {
        $query->where('case_type_id', $caseTypeId);
    }

      $data = array(
          'pageSize' => $request->get('page_size', 25),
          'sortBy' => $request->get('sort_by', $table . '.id'),
          'sortOrder' => $request->get('sort_order', 'desc'),
      );
  
      $searchFilter = $request->get('searchFilters');
      if ($searchFilter) {
          $searchFilter = json_decode($searchFilter, true);
  
          if (!isset($searchFilter['combinator'])) {
              $searchFilter['combinator'] = 'and';
          }
          $data['searchFilters'] = $searchFilter;
      }
     
      if ($loggedInUserId !== 1) {
        $query->where(function ($query) use ($loggedInUserId, $table) {
            $query->where($table . '.assignee_id', $loggedInUserId)
                ; // To include cases with no assignee
        });
      }

      $list = $this->getData($query, $data, $table, false);
  
      $this->apiResponse['data'] = $list;
      return $this->sendResponse();
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(CourtCaseRequest $request): JsonResponse
  {
    $item = new CourtCase();
    $item->uuid = Uuid::uuid4();
    $item->title = $request->get('title', '');
    $item->case_type_id = $request->get('case_type', '');
    $item->case_stage = $request->get('case_stage', '');
    $item->assignee_id = $request->get('assignee_id', '');
    // $item->assignee_id = ($request->get('assignee_id', '') !== '1') ? $request->get('assignee_id', '') : '';
    $item->status_id = $request->get('status_id', '');

    if ($request->get('case_type') === 1) {
    $item->allotted_date = $request->get('allotted_date', '');
    $item->bank_id = $request->get('bank_id', '');
    $item->bank_branch_id = $request->get('bank_branch_id', '');
    $item->loan_account_number = $request->get('loan_account_number', '');
    $item->customer_name = $request->get('customer_name', '');
    $item->customer_phone = $request->get('customer_phone', '');
    $item->customer_address = $request->get('customer_address', '');
    $item->symbolic_account = $request->get('symbolic_account', '');
    } elseif ($request->get('case_type') === 2) {
      
    #fields for Motor Insurance
    $item->death = $request->get('death', '');
    $item->injury = $request->get('injury', null);
    $item->insurance_company = $request->get('insurance_company', '');
    $item->vehicle_number = $request->get('vehicle_number', '');
    $item->vehicle_owner = $request->get('vehicle_owner', '');
    $item->vehicle_driver = $request->get('vehicle_driver', '');

    $item->fir_number = $request->get('fir_number', '');
    $item->thana = $request->get('thana', '');
    $item->fir_delay = $request->get('fir_delay', null);
    $item->cnr = $request->get('cnr', '');
    $item->filling_number = $request->get('filling_number', '');
    $item->macc_number = $request->get('macc_number', '');
    $item->court_name = $request->get('court_name', '');
    $item->date_of_filling = $request->get('date_of_filling', '');
    $item->next_date = $request->get('next_date', '');
    $item->company_advocate = $request->get('company_advocate', null);
    $item->challan = $request->get('challan', '');
    $item->remark = $request->get('remark', null);
    $item->company_file_number = $request->get('company_file_number', '');
    $item->investigation = $request->get('investigation', null);
    $item->office_file_number = $request->get('office_file_number', '');
    $item->date_of_disposal = $request->get('date_of_disposal', '');

     }
    $item->save();

    // $this->apiResponse['message'] = __('message.courtCase.create_success');
    $this->apiResponse['message'] = __('This Data hass been Created Successfully');
    return $this->sendResponse();
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function show(Request $request, string $uuid)
  {
    $table = (new CourtCase)->getTable();
    $case = CourtCase::where('uuid', $uuid)->first();
    $item = CourtCase::with([
      'bank',
      'bankBranch',
      'status',
      'users',
      'courtCaseType',
      'courtCaseType.stages',
      'courtCaseType.stages.courtCaseStage' => function ($query) use($case) {
        $query->where('case_id', $case->id);
      },
      'courtCaseType.stages.courtCaseFiles'  => function ($query) use($case) {
        $query->where('case_id', $case->id);
      },
    ])
      ->select(\DB::raw("*, LPAD($table.id, 5, '0') as formatted_case_number")) // Add the formatted_case_number field
      ->where($table . '.uuid', $uuid)
      ->first();


    $this->apiResponse['data'] = $item;
    return $this->sendResponse();
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function update(CourtCaseRequest $request, string $uuid)
  {
    $item = CourtCase::where('uuid', $uuid)->first();

    $item->title = $request->get('title', '');
    $item->case_type_id = $request->get('case_type', '');
    $item->case_stage = $request->get('case_stage', '');
    $item->assignee_id = $request->get('assignee_id', '');
    // $item->assignee_id = ($request->get('assignee_id', '') !== '1') ? $request->get('assignee_id', '') : '';
    $item->status_id = $request->get('status_id', '');

    if ($request->get('case_type') === 1) {
    #fields for Bank Recovery
    $item->allotted_date = $request->get('allotted_date', '');
    $item->bank_id = $request->get('bank_id', '');
    $item->bank_branch_id = $request->get('bank_branch_id', '');
    $item->loan_account_number = $request->get('loan_account_number', '');
    $item->customer_name = $request->get('customer_name', '');
    $item->customer_phone = $request->get('customer_phone', '');
    $item->customer_address = $request->get('customer_address', '');
    $item->symbolic_account = $request->get('symbolic_account', '');
    } elseif ($request->get('case_type') === 2) {
    #fields for Motor Insurance
    $item->death = $request->get('death', '');
    $item->injury = $request->get('injury', null);
    $item->insurance_company = $request->get('insurance_company', '');
    $item->vehicle_number = $request->get('vehicle_number', '');
    $item->vehicle_owner = $request->get('vehicle_owner', '');
    $item->vehicle_driver = $request->get('vehicle_driver', '');
    $item->fir_number = $request->get('fir_number', '');
    $item->thana = $request->get('thana', '');
    $item->fir_delay = $request->get('fir_delay', null);
    $item->cnr = $request->get('cnr', '');
    $item->filling_number = $request->get('filling_number', '');
    $item->macc_number = $request->get('macc_number', '');
    $item->court_name = $request->get('court_name', '');
    $item->date_of_filling = $request->get('date_of_filling', '');
    $item->next_date = $request->get('next_date', '');
    $item->company_advocate = $request->get('company_advocate', null);
    $item->challan = $request->get('challan', '');
    $item->remark = $request->get('remark', null);
    $item->company_file_number = $request->get('company_file_number', '');
    $item->investigation = $request->get('investigation', null);
    $item->office_file_number = $request->get('office_file_number', '');
    $item->date_of_disposal = $request->get('date_of_disposal', '');
    }
    $item->update();
    
    // $this->apiResponse['message'] = __('message.courtCase.update_success');
    $this->apiResponse['message'] = __('This Data hass been Updated Successfully');
    return $this->sendResponse();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(string $uuid)
  {
    CourtCase::where('uuid', $uuid)->delete();
    // $this->apiResponse['message'] = __('message.courtCase.delete_success');
    $this->apiResponse['message'] = __('This Data hass been Deleted Successfully.');
    return $this->sendResponse();
  }
}