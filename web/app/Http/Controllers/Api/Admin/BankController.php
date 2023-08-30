<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\BankRequest;
use App\Lib\Traits\Searchable;
use App\Models\Bank;
use App\Models\Status;
use Illuminate\Http\JsonResponse;
use Ramsey\Uuid\Uuid;

class BankController extends ApiController
{
  use Searchable;

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(BankRequest $request): JsonResponse
  {
    // get table names
    $table = (new Bank)->getTable();
    $statusTable = (new Status())->getTable();
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
      'bank_name' => 'bank_name',
      'bank_headquarter' => 'bank_headquarter',
      'status' => 'status',
      'status_id' => 'status_id',
    ];

    $query = Bank::select([
      $table . '.id',
      $table . '.uuid',
      $table . '.bank_name',
      $table . '.bank_headquarter',
      $table . '.created_at',
      $table . '.updated_at',
      $statusTable . '.name as status_name',
    ])->leftJoin($statusTable, function ($join) use ($table, $statusTable) {
      $join->on($statusTable . '.id', '=', $table . '.status_id');
    });


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
  public function store(BankRequest $request): JsonResponse
  {
    $item = new Bank();
    $item->uuid = Uuid::uuid4();
    $item->bank_name = $request->get('bank_name', '');

    $item->bank_headquarter = $request->get('bank_headquarter', '');
    $item->status_id = Status::ACTIVE;
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
  public function show(BankRequest $Page)
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
  public function update(BankRequest $request, string $uuid)
  {
    $item = Bank::where('uuid',$uuid)->first();

    $item->bank_name = $request->get('bank_name', '');
    $item->bank_headquarter = $request->get('bank_headquarter', '');
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
    Bank::where('uuid', $uuid)->delete();
    $this->apiResponse['message'] = __('message.bank.delete_success');
    return $this->sendResponse();
  }
}
