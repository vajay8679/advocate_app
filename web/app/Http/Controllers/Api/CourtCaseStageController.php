<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Models\CourtCaseFile;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\CourtCase;
use App\Models\CaseStage;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Carbon;
use Validator;

class CourtCaseStageController extends ApiController
{
  function deleteMedia($fileId, Request $request): JsonResponse{
    CourtCaseFile::where('uuid', $fileId)->delete();
    $this->apiResponse['message'] = 'File deleted successfully.';
    return $this->sendResponse();
  }

  function addMedia(Request $request ) : JsonResponse{

    $caseId = $request->get('case_id');
    $courtCase = CourtCase::find($caseId);

    if ($courtCase && $courtCase->status_id === 5) {
      // If 'status_id' is 5, you cannot add any stage fields
      $this->setResponseCode(422);
      $this->apiResponse['message'] = 'Cannot add stages for a court case with status is Completed.';
  } else {

    $validator = Validator::make($request->all(), [
      'media_url' => 'required|url',
      'media_title' => 'required|max:255',
      'case_id' => 'required',
      'stage_id' => 'required',
      'paper_publication' => 'required_if:stage_id,1',
      'date_of_acknowledgment' => 'required_if:stage_id,1',
      'due_date' => 'required_if:stage_id,2',
      'date_of_filling' => 'required_if:stage_id,3',
      'case_number' => 'required_if:stage_id,3',
      'court_name' => 'required_if:stage_id,3', 
      'date_of_dm_order' => 'required_if:stage_id,4',
      'date_of_physical_possession' => 'required_if:stage_id,5',
      'date_of_dawa' => 'required_if:stage_id,6',
      'date_of_kathan' => 'required_if:stage_id,7',
      'date_of_notice' => 'required_if:stage_id,8',
      'date_of_ws' => 'required_if:stage_id,9',
      'date_of_evidence' => 'required_if:stage_id,10',
      'date_of_six_seventeen' => 'required_if:stage_id,11',
      'date_of_question' => 'required_if:stage_id,12',
      'date_of_dispose' => 'required_if:stage_id,13',

    ]);
    if ($validator->fails()) {
      $this->setResponseCode(422);
      $this->apiResponse['message'] = $validator->messages()->first();
      $this->apiResponse['errors'] = $validator->errors();
    } else {
      $item = new CourtCaseFile();
      $item->uuid = Uuid::uuid4();
      $item->case_id = $request->get('case_id');
      $item->case_stage_id = $request->get('stage_id');
      $item->media_title = $request->get('media_title');
      $item->media_url = $request->get('media_url');
      $item->paper_publication = $request->get('paper_publication');
      $item->date_of_acknowledgment = $request->get('date_of_acknowledgment');
      $item->due_date = $request->get('due_date');
      $item->date_of_filling = $request->get('date_of_filling');
      $item->case_number = $request->get('case_number');
      $item->court_name = $request->get('court_name');
      $item->date_of_dm_order = $request->get('date_of_dm_order');
      $item->date_of_physical_possession = $request->get('date_of_physical_possession');
      $item->date_of_dawa = $request->get('date_of_dawa');
      $item->date_of_kathan = $request->get('date_of_kathan');
      $item->date_of_notice = $request->get('date_of_notice');
      $item->date_of_ws = $request->get('date_of_ws');
      $item->date_of_evidence = $request->get('date_of_evidence');
      $item->date_of_six_seventeen = $request->get('date_of_six_seventeen');
      $item->date_of_question = $request->get('date_of_question');
      $item->date_of_dispose = $request->get('date_of_dispose');

      $userLoginId = auth()->user()->id;
      $item->user_login_id = $userLoginId;
      $item->save();

      $this->apiResponse['data'] = $item;
      $this->apiResponse['message'] = 'File saved successfully.';
    }
  }
    return $this->sendResponse();
  }

  public function listStage(Request $request)
{
    // Get table names
    $courtCaseFileTable = (new CourtCaseFile)->getTable();
    $userTable = (new User())->getTable();
    $courtCasetable = (new CourtCase)->getTable();
    $caseStageTable = (new CaseStage)->getTable();

    $data = [
        'pageSize' => $request->get('page_size', 25),
        'sortBy' => $request->get('sort_by', $courtCaseFileTable . '.id'),
        'sortOrder' => $request->get('sort_order', 'desc'),
    ];

    $searchFilter = $request->get('searchFilters');
    if ($searchFilter) {
        $searchFilter = json_decode($searchFilter, true);

        if (!isset($searchFilter['combinator'])) {
            $searchFilter['combinator'] = 'and';
        }
        $data['searchFilters'] = $searchFilter;
    }

    // This is required for searching
    $columnMap = [
        'first_name' => 'first_name',
        'last_name' => 'last_name',
    ];

    $currentDate = Carbon::now();

    $query = CourtCaseFile::select([
        "{$courtCaseFileTable}.id",
        "{$courtCaseFileTable}.uuid",
        "{$courtCaseFileTable}.case_stage_id",
        "{$courtCaseFileTable}.case_id",
        "{$courtCaseFileTable}.user_login_id",
        "{$courtCaseFileTable}.media_title",
        "{$caseStageTable}.stage_name",
        \DB::raw("COALESCE({$courtCaseFileTable}.date_of_acknowledgment, {$courtCaseFileTable}.due_date, {$courtCaseFileTable}.date_of_filling, {$courtCaseFileTable}.date_of_dm_order, {$courtCaseFileTable}.date_of_physical_possession,  {$courtCaseFileTable}.date_of_dawa,  {$courtCaseFileTable}.date_of_kathan,  {$courtCaseFileTable}.date_of_notice,  {$courtCaseFileTable}.date_of_ws,  {$courtCaseFileTable}.date_of_evidence,  {$courtCaseFileTable}.date_of_six_seventeen,  {$courtCaseFileTable}.date_of_question,  {$courtCaseFileTable}.date_of_dispose) AS date"),

        "{$userTable}.first_name",
        "{$userTable}.last_name",

        "{$courtCaseFileTable}.created_at",
        "{$courtCaseFileTable}.updated_at",
    ])
        ->leftJoin("{$courtCasetable}", "{$courtCasetable}.id", "=", "{$courtCaseFileTable}.case_id")
        ->leftJoin("{$caseStageTable}", "{$caseStageTable}.id", "=", "{$courtCaseFileTable}.case_stage_id")
        ->leftJoin("{$userTable}", "{$userTable}.id", "=", "{$courtCaseFileTable}.user_login_id")
        ->whereNull("{$courtCaseFileTable}.deleted_at")
        ->where(function ($query) use ($courtCaseFileTable, $currentDate) {
            $query->where("{$courtCaseFileTable}.date_of_acknowledgment", "<", $currentDate)
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
        });

    $list = $query->paginate($data['pageSize']); // Use pagination instead of getData()
    // return response()->json(['data' => $list]);

    $paginationLinks = [
                        [
                            'url' => $list->previousPageUrl(),
                            'label' => '&laquo; Previous',
                            'active' => false,
                        ],
    ];

    for ($i = 1; $i <= $list->lastPage(); $i++) {
        $paginationLinks[] = [
            'url' => $list->url($i),
            'label' => $i,
            'active' => $i === $list->currentPage(),
        ];
    }

    $paginationLinks[] = [
        'url' => $list->nextPageUrl(),
        'label' => 'Next &raquo;',
        'active' => false,
    ];

    $responseData = [
      'current_page' => $list->currentPage(),
      'data' => $list->items(),
      'first_page_url' => $list->url(1),
      'from' => $list->firstItem(),
      'last_page' => $list->lastPage(),
      'last_page_url' => $list->url($list->lastPage()),
      'links' => $paginationLinks,
      'next_page_url' => $list->nextPageUrl(),
      'path' => $list->path(),
      'per_page' => $list->perPage(),
      'prev_page_url' => $list->previousPageUrl(),
      'to' => $list->lastItem(),
      'total' => $list->total(),
      ];
 
      return response()->json([
          'response_code' => 200,
          'data' => $responseData,
          'message' => '',
          'status' => 'ok',
      ]);    
}


}