<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Http\Request;
use App\Http\Resources\RoleResource;
use Validator;

class RoleController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pageSize = $request->get('page_size', 25);
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');

        $records = new Role();

        //add sort logic
        $records = $records->orderBy($sortBy, $sortOrder);

        //add search logic here
        $searches = $request->get('search', []);
        if ($searches) {
            foreach ($searches as $search) {
                $search = json_decode($search);
                switch ($search->id):
                    case 'status':
                        $conName = 'App\Status::' . $search->value;
                        if (defined($conName)) {
                            $statusId = constant($conName);
                            $records = $records->where('status_id', $statusId);
                        }
                        break;
                    default:
                        $records = $records->where($search->id, 'like', '%' . $search->value . '%');
                endswitch;
            }
        }

        $list = $records->paginate($pageSize);
        $total = $list->total();
        $data = RoleResource::collection($list);
        $this->apiResponse['data'] = ['total' => $total, 'data' => $data];
        $this->apiResponse['data']['totalPage'] = get_page_count($total, $pageSize);
        return $this->sendResponse();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|alpha|max:255|unique:roles,name',
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $role = new Role();
            $role->name = $request->name;
            $role->guard_name = 'api';
            $role->save();
            $this->apiResponse['message'] = __('message.role.create_success');
        }
        return $this->sendResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        return $this->sendResponse();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|alpha|max:255|unique:roles,name,' . $role->id,
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $requestData = $request->all();
            foreach ($requestData as $key => $val) {
                $role->{$key} = $val;
            }
            $role->update();
            $this->apiResponse['message'] = __('message.role.update_success');
        }
        return $this->sendResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        if ($role->id == 1 || $role->id == 2 || $role->id == 3) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = __('message.role.can_not_delete');
        } else {
            $role->delete();
            $this->apiResponse['message'] = __('message.role.delete_success');
        }
        return $this->sendResponse();
    }

    /**
     * Get all role permissions
     * @param Role $role
     * @return \App\Http\Controllers\json
     */
    public function getPermissions(Role $role)
    {
        $allPermisson = Permission::all()->pluck('name', 'id');
        $rolePermissions = $role->getAllPermissions()->pluck('id');
        $this->apiResponse['data'] = array(
            'allPermissions' => $allPermisson,
            'rolePermissions' => $rolePermissions,
        );
        return $this->sendResponse();
    }

    /**
     * Update role permissions
     * @param Request $request
     * @param Role $role
     * @return \App\Http\Controllers\json
     */
    public function updatePermissions(Request $request, Role $role){
        $role->syncPermissions($request->permissions);
        $this->apiResponse['message'] = __('message.role.permission_update');
        return $this->sendResponse();
    }
}
