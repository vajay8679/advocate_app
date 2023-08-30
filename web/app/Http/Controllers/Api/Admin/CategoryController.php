<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Requests\CategoryRequest;
use App\Lib\Traits\Searchable;
use App\Models\EntityType;
use App\Models\Status;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Category;
use Ramsey\Uuid\Uuid;

class CategoryController extends ApiController
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
    $table = (new Category)->getTable();
    $statusTable = (new Status())->getTable();
    $entityTypeTable = (new EntityType())->getTable();

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

    $entity_type = $request->get('entity_type', '');

    // this is required to search
    $columnMap = [
      'machine_name' => 'machine_name',
      'name' => 'name',
      'description' => 'description',
      'entity_type' => 'entity_type',
      'parent' => 'parent',
      'parent_id' => 'parent_id',
      'status' => 'status',
      'status_id' => 'status_id',
    ];

    $query = Category::select([
      $table . '.uuid',
      $table . '.machine_name',
      $table . '.name',
      $table . '.description',
      $table . '.entity_type',
      $table . '.uuid',
      $table . '.created_at',
      $table . '.updated_at',
      $entityTypeTable . '.entity_name',
      $statusTable . '.name as status_name',
      'parent.name as parent_name',
      'parent.uuid as parent_uuid',
    ])->leftJoin($statusTable, function ($join) use ($table, $statusTable) {
      $join->on($statusTable . '.id', '=', $table . '.status_id');
    })->leftJoin($table .' as parent', function ($join) use ($table) {
      $join->on($table . '.parent_id', '=', 'parent.id');
    })->leftJoin($entityTypeTable, function ($join) use ($table, $entityTypeTable) {
      $join->on($entityTypeTable . '.entity_type', '=', $table.'.entity_type');
    });
    if($entity_type != '') {
      $query->where($table .'.entity_type', $entity_type);
    }

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
  public function store(CategoryRequest $request): JsonResponse
  {
    $parentId = null;
    if ($request->parent) {
      $parent = Category::where('uuid', $request->parent)->first();
      $parentId = $parent->id;
    }

    $item = new Category();
    $item->uuid = Uuid::uuid4();
    $item->description = $request->get('description', '');
    $item->name = $request->get('name', '');
    $item->machine_name = $request->get('machine_name', null);
    $item->entity_type = $request->get('entity_type', '');
    $item->status_id = Status::ACTIVE;
    $item->parent_id = $parentId;
    $item->machine_name = null;//createUrlSlug($item->name);
    $item->save();

    $this->apiResponse['message'] = __('message.category.create_success');
    return $this->sendResponse();
  }

  /**
   * Display the specified resource.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function show(Category $category)
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
  public function update(Request $request, Category $category)
  {
    $parentId = null;
    if ($request->parent) {
      $parent = Category::where('uuid', $request->parent)->first();
      $parentId = $parent->id;
    }
    $item = Category::where('uuid', $category->uuid)->first();

    $item->description = $request->get('description', '');
    $item->name = $request->get('name', '');
    $item->machine_name = $request->get('machine_name', null);
    $item->entity_type = $request->get('entity_type', '');
    $item->parent_id = $parentId;
    $item->update();
    $this->apiResponse['message'] = __('message.category.update_success');
    return $this->sendResponse();
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param int $id
   * @return \Illuminate\Http\Response
   */
  public function destroy(Category $category)
  {
    $category->delete();
    $this->apiResponse['message'] = __('message.category.delete_success');
    return $this->sendResponse();
  }
}
