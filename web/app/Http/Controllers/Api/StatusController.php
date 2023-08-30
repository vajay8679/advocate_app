<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Lib\Traits\Searchable;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Status;


class StatusController extends ApiController
{
    use Searchable;
    
    // echo '<pre>',print_r($request,1),'</pre>'; 
    public function index(Request $request)
    {
    // get table names
    
    $table = (new Status)->getTable();
     
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
    
    // this is required to search
    $columnMap = [
    //   'bank_name' => 'bank_name',
    //   'status_name' => 'status_name',
    //   'bank_headquarter' => 'bank_headquarter',
    //   'status' => 'status',
    //   'status_id' => 'status_id',
    "name" => "name",
    ];

    $desiredIds = [1, 2, 4, 5, 6];
    $query = Status::select([
      $table . '.id',
      // $table . '.name',
      \DB::raw("CONCAT(UPPER(SUBSTRING({$table}.name, 1, 1)), LOWER(SUBSTRING({$table}.name, 2))) as name"),
      $table . '.created_at',
      $table . '.updated_at',
    ])->whereIn($table . '.id', $desiredIds);


    $list = $this->getData($query, $data, $table, $columnMap, false);
    $this->apiResponse['data'] = $list;
    return $this->sendResponse();
  }


}