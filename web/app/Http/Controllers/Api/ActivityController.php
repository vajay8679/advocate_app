<?php

namespace App\Http\Controllers\Api;

use App\Events\LogActivity;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Models\ActivityType;
use Illuminate\Validation\Rule;
use Validator;
use DB;

class ActivityController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            'activity_type' => ['required', Rule::in(ActivityType::ACTIVITY_TYPE_ARRAY)],
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $user = $request->user();
            $activityType = $request->get('activity_type');
            //Log event
            $activity = new Activity();
            $activity->user_id = $user->id;
            $activity->activity_type_id = constant("App\Models\ActivityType::$activityType");
            $activity->ip_address = $request->ip();
            $activity->activity_data = json_encode($request->activity_data);
            LogActivity::dispatch($activity);

            $this->apiResponse['message'] = 'Activity saved sc';
        }
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
        $this->apiResponse['data'] = $activity->toArray();
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
        $this->apiResponse['message'] = 'Activity can not be updated.';
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
        $this->apiResponse['message'] = 'Activity can not be deleted.';
        return $this->sendResponse();
    }
}
