<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Http\Requests\BankBranchRequest;
use App\Lib\Traits\Searchable;
use App\Models\Bank;
use App\Models\BankBranch;
use App\Models\Status;
use Illuminate\Http\JsonResponse;
use Ramsey\Uuid\Uuid;
use Illuminate\Http\Request;

class BankBranchController extends ApiController
{
  use Searchable;

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(BankBranchRequest $request): JsonResponse
  {
    // get table names
    $table = (new BankBranch)->getTable();
    $bankTable = (new Bank())->getTable();
    $data = array(
      'pageSize' => $request->get('page_size', 25),
      'sortBy' => $request->get('sort_by', $table . '.id'),
      'sortOrder' => $request->get('sort_order', 'desc')
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
      'branch_name' => 'branch_name',
      'branch_code' => 'branch_code',
      'ifsc_code' => 'ifsc_code',
      'contact_person' => 'contact_person',
      'contact_number' => 'contact_number',
    ];

    $query = BankBranch::select([
      $table . '.id',
      $table . '.uuid',
      $table . '.branch_name',
      $table . '.branch_code',
      $table . '.ifsc_code',
      $table . '.contact_person',
      $table . '.contact_number',
      $table . '.branch_address',
      $table . '.bank_id',
      $bankTable .'.bank_name',
//      $table . '.state_id',
//      $table . '.city_id',
//      $table . '.country_id',
//      $table . '.zip',
      $table . '.updated_at',
    ])->leftJoin($bankTable, function ($join) use ($table, $bankTable) {
      $join->on($bankTable . '.id', '=', $table . '.bank_id');
    });


    $list = $this->getData($query, $data, $table, $columnMap, false);
    $this->apiResponse['data'] = $list;
    return $this->sendResponse();
  }



  public function getBranch(Request $request)
  {
    // get table names
    $table = (new BankBranch)->getTable();
    $bankTable = (new Bank())->getTable();
    $data = array(
      'pageSize' => $request->get('page_size', 25),
      'sortBy' => $request->get('sort_by', $table . '.id'),
      'sortOrder' => $request->get('sort_order', 'desc')
    );

    $searchFilter = $request->get('searchFilters');
    if ($searchFilter) {
      $searchFilter = json_decode($searchFilter, true);

      if (!isset($searchFilter['combinator'])) {
        $searchFilter['combinator'] = 'and';
      }
      $data['searchFilters'] = $searchFilter;
    }

    $bankId = $request->input('bank_id');

    // this is required to search
    $columnMap = [
      'branch_name' => 'branch_name',
      'branch_code' => 'branch_code',
      'ifsc_code' => 'ifsc_code',
      'contact_person' => 'contact_person',
      'contact_number' => 'contact_number',
    ];

    $query = BankBranch::select([
      $table . '.id',
      $table . '.uuid',
      $table . '.branch_name',
      $table . '.bank_id',
      $bankTable .'.bank_name',
      $table . '.updated_at',
    ])->leftJoin($bankTable, function ($join) use ($table, $bankTable) {
      $join->on($bankTable . '.id', '=', $table . '.bank_id');
    })->where($table . '.bank_id', $bankId);


    $list = $this->getData($query, $data, $table, $columnMap, false);
    $this->apiResponse['data'] = $list;
    return $this->sendResponse();
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Http\Response
   */
  public function store(BankBranchRequest $request): JsonResponse
  {
    $bank = Bank::where('uuid', $request->bank_uuid)->first();
    $item = new BankBranch();
    $item->uuid = Uuid::uuid4();
    $item->branch_name = $request->get('branch_name', '');
    $item->branch_code = $request->get('branch_code', '');
    $item->ifsc_code = $request->get('ifsc_code', '');
    $item->contact_person = $request->get('contact_person', '');
    $item->contact_number = $request->get('contact_number', '');
    $item->branch_address = $request->get('branch_address', '');
    $item->bank_id = $bank->id;
    $item->save();

    $this->apiResponse['message'] = __('message.bank.create_success');
    return $this->sendResponse();
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function show(BankBranchRequest $Page)
  {
    return $this->sendResponse();
  }

  /**
   * Update the specified resource in storage.
   *
   * @param \Illuminate\Http\Request $request
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function update(BankBranchRequest $request, string $uuid)
  {
    $item = BankBranch::where('uuid', $uuid)->first();

    $item->branch_name = $request->get('branch_name', '');
    $item->branch_code = $request->get('branch_code', '');
    $item->ifsc_code = $request->get('ifsc_code', '');
    $item->ifsc_code = $request->get('ifsc_code', '');
    $item->contact_person = $request->get('contact_person', '');
    $item->contact_number = $request->get('contact_number', '');
    $item->branch_address = $request->get('branch_address', '');
    $item->update();
    $this->apiResponse['message'] = __('message.bank.update_success');
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
    BankBranch::where('uuid', $uuid)->delete();
    $this->apiResponse['message'] = __('message.bank.delete_success');
    return $this->sendResponse();
  }
}
