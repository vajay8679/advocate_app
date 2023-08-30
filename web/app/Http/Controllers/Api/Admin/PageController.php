<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\PageRequest;
use App\Lib\Traits\Searchable;
use App\Models\Page;
use App\Models\EntityType;
use App\Models\Status;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class PageController extends ApiController
{
  use Searchable;

  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(PageRequest $request): JsonResponse
  {
    // get table names
    $table = (new Page)->getTable();
    $statusTable = (new Status())->getTable();
    $entityTypeTable = (new EntityType())->getTable();

    $data = array(
      'pageSize' => $request->get('page_size', 25),
      'sortBy' => $request->get('sort_by', $table . '.id'),
      'sortOrder' => $request->get('sort_order', 'desc')
    );

    $entity_type = $request->get('entity_type', '');

    // this is required to search
    $columnMap = [
      'slug' => 'slug',
      'title' => 'title',
      'content' => 'content',
//      'status' => 'status',
//      'status_id' => 'status_id',
    ];

    $query = Page::select([
      $table . '.uuid',
      $table . '.slug',
      $table . '.title',
      $table . '.content',
      $table . '.created_at',
      $table . '.updated_at',
      //$statusTable . '.name as status_name',
    ]);
//    >leftJoin($statusTable, function ($join) use ($table, $statusTable) {
//      $join->on($statusTable . '.id', '=', $table . '.status_id');
//    });


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
  public function store(PageRequest $request): JsonResponse
  {
    $parentId = null;
    if ($request->parent) {
      $parent = Page::where('uuid', $request->parent)->first();
      $parentId = $parent->id;
    }

    $item = new Page();
    $item->uuid = Uuid::uuid4();
    $item->title = $request->get('title', '');
    $item->content = $request->get('content', '');
    //$item->status_id = Status::ACTIVE;
    $item->slug = createUrlSlug($item->title);
    $item->save();

    $this->apiResponse['message'] = __('message.page.create_success');
    return $this->sendResponse();
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function show(Page $Page)
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
  public function update(PageRequest $request, Page $Page)
  {
    $parentId = null;
    if ($request->parent) {
      $parent = Page::where('uuid', $request->parent)->first();
      $parentId = $parent->id;
    }
    $item = Page::where('uuid', $Page->uuid)->first();

    $item->content = $request->get('content', '');
    $item->title = $request->get('title', '');
    $item->update();
    $this->apiResponse['message'] = __('message.page.update_success');
    return $this->sendResponse();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Page $item)
  {
    $item->delete();
    $this->apiResponse['message'] = __('message.page.delete_success');
    return $this->sendResponse();
  }
}
