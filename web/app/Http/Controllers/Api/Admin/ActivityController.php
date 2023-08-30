<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Lib\Traits\Searchable;
use App\Models\Activity;
use App\Models\ActivityType;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;

class ActivityController extends ApiController
{
    use Searchable;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // get table names
        $table = (new Activity())->getTable();
        $activityTypeTable = (new ActivityType())->getTable();
        $userTable = (new User())->getTable();

        $data = array(
            'pageSize' => $request->get('page_size', 25),
            'sortBy' => $request->get('sort_by', $table . '.id'),
            'sortOrder' => $request->get('sort_order', 'desc')
        );

        // this is required to search
        $columnMap = [
            'activity_type_id' => 'activity_type_id',
        ];

        $query = Activity::select([
            $table . '.id',
            $table . '.ip_address',
            $table . '.created_at',
            $activityTypeTable . '.name as activity_type',
            $userTable . '.first_name',
            $userTable . '.last_name',
        ])->join($activityTypeTable, function ($join) use ($activityTypeTable, $table) {
            $join->on($activityTypeTable . '.id', '=', $table . '.activity_type_id');
        })->join($userTable, function ($join) use ($userTable, $table) {
            $join->on($userTable . '.id', '=', $table . '.user_id');
        });

        // add search logic here
        $searchFilter = $request->get('searchFilters');
        if ($searchFilter) {
            $searchFilter = json_decode($searchFilter, true);
            if (!isset($searchFilter['combinator'])) {
                $searchFilter['combinator'] = 'and';
            }
            $data['searchFilters'] = $searchFilter;
        }

        // filter on activity_type_id
        $activityTypeId = $request->get('activity_type_id');
        if ($activityTypeId && $activityTypeId != '') {
            $query->where('activity_type_id', $activityTypeId);
        }

        $this->apiResponse['data'] = $this->getData($query, $data, $table, $columnMap);
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
        return $this->sendResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        return $this->sendResponse();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Activity $activity)
    {
        return $this->sendResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Activity $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        return $this->sendResponse();
    }
}
