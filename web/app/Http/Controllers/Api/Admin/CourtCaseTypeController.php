<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\CategoryRequest;
use App\Lib\Traits\Searchable;
use App\Models\CaseType;
use Illuminate\Http\JsonResponse;

class CourtCaseTypeController extends ApiController
{
  use Searchable;

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(CategoryRequest $request): JsonResponse
  {
    // get table names
    $table = (new CaseType())->getTable();
    $data = array(
      'pageSize' => $request->get('page_size', 25),
      'sortBy' => $request->get('sort_by', $table . '.case_type'),
      'sortOrder' => $request->get('sort_order', 'asc')
    );
    $searchFilter = $request->get('searchFilters');
    if ($searchFilter) {
      $searchFilter = json_decode($searchFilter, true);

      if (!isset($searchFilter['combinator'])) {
        $searchFilter['combinator'] = 'and';
      }
      $data['searchFilters'] = $searchFilter;
    }

    $entity_type = $request->get('entity_type', '');

    // this is required to search
    $columnMap = [
      'id' => 'id',
      'case_type' => 'case_type',
    ];

    $query = CaseType::select([
      $table . '.id',
      $table . '.case_type',
    ]);

    $list = $this->getData($query, $data, $table, $columnMap, false);
    $this->apiResponse['data'] = $list;
    return $this->sendResponse();
  }

}
