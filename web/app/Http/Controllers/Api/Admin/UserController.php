<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Lib\Traits\Searchable;
use App\Models\Activity;
use App\Models\ActivityType;
use App\Models\Contract;
use App\Models\Invite;
use App\Models\Role;
use App\Models\Status;
use App\Models\SupportTicket;
use App\Models\UserContract;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
use Validator;
use Illuminate\Validation\Rule;
use Hash;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use DB;
use App\Notifications\NewContractNotification;
use Illuminate\Database\Query\Builder;

class UserController extends ApiController
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
        $table = (new User)->getTable();
        $statusTable = (new Status())->getTable();

        $data = array(
            'pageSize' => $request->get('page_size', 25),
            'sortBy' => $request->get('sort_by', $table . '.id'),
            'sortOrder' => $request->get('sort_order', 'desc')
        );

        // this is required to search
        $columnMap = [
            'first_name' => 'first_name',
            'last_name' => 'last_name',
            'email' => 'email',
            'dob' => 'dob',
            'gender' => 'gender',
            'status' => 'status',
            'status_id' => 'status_id',
        ];

        $query = User::select([
            $table . '.id',
            $table . '.uuid',
            $table . '.first_name',
            $table . '.last_name',
            \DB::raw("CONCAT($table.first_name, ' ', $table.last_name) as full_name"),
            $table . '.username',
            $table . '.dob',
            $table . '.gender',
            $table . '.bio',
            $table . '.profile_image',
            $table . '.email',
            $table . '.phone',
            $table . '.profile_image',
            $table . '.profile_cover',
            $table . '.email_verified_at',
            $table . '.referral_count',
            $table . '.referral_code',
            $table . '.created_at',
            $table . '.status_id',
            $table . '.device_info',
            $statusTable . '.name as status_name',
        ])
          ->where($table . '.id', '>', 2)
          ->leftJoin($statusTable, function ($join) use ($table, $statusTable) {
            $join->on($statusTable . '.id', '=', $table . '.status_id');
          });
      $query->with(['roles:name']);

        // add search logic here
//        $searchStr = $request->get('searchQuery', '');
//        if ($searchStr) {
//            $query->where(function ($builder) use ($searchStr) {
//                $builder->orWhere('first_name', 'like', '%' . $searchStr . '%')
//                    ->orWhere('last_name', 'like', '%' . $searchStr . '%')
//                    ->orWhere('email', 'like', '%' . $searchStr . '%')
//                    ->orWhere('phone', 'like', '%' . $searchStr . '%');
//            });
//        }

        $searchFilter = $request->get('searchFilters');
        if ($searchFilter) {
            $searchFilter = json_decode($searchFilter, true);

            if (!isset($searchFilter['combinator'])) {
                $searchFilter['combinator'] = 'and';
            }
            $data['searchFilters'] = $searchFilter;
        }
        $list = $this->getData($query, $data, $table, $columnMap, false);
        $dataList = [];
        foreach ($list as $key => $item){
            $roles = isset($item->roles[0]) ? $item->roles[0]->name : 'N/A';
            $item->role = $roles;
            unset($item->roles);
        }

        $this->apiResponse['data'] = $list;
        return $this->sendResponse();
    }


    public function getUserList(Request $request)
    {
        // get table names
        $table = (new User)->getTable();
        $statusTable = (new Status())->getTable();

        $data = array(
            'pageSize' => $request->get('page_size', 25),
            'sortBy' => $request->get('sort_by', $table . '.id'),
            'sortOrder' => $request->get('sort_order', 'desc')
        );

        // this is required to search
        $columnMap = [
            'first_name' => 'first_name',
            'last_name' => 'last_name',
            'email' => 'email',
            'dob' => 'dob',
            'gender' => 'gender',
            'status' => 'status',
            'status_id' => 'status_id',
        ];

        $loggedInUserId = auth()->id(); // Assuming you're using Laravel's authentication

        // If a user is logged in, restrict the query to their own data
        $restrictToLoggedInUser = false;
        if ($loggedInUserId && $loggedInUserId !== 1) {
            $restrictToLoggedInUser = true;
        }

        $query = User::select([
            $table . '.id',
            $table . '.uuid',
            $table . '.first_name',
            $table . '.last_name',
            \DB::raw("CONCAT($table.first_name, ' ', $table.last_name) as full_name"),
        ])
          ->where($table . '.id', '>', 2)
          ->leftJoin($statusTable, function ($join) use ($table, $statusTable) {
            $join->on($statusTable . '.id', '=', $table . '.status_id');
          });

          if ($restrictToLoggedInUser) {
            $query->where($table . '.id', $loggedInUserId);
        }

      $query->with(['roles:name']);

        $searchFilter = $request->get('searchFilters');
        if ($searchFilter) {
            $searchFilter = json_decode($searchFilter, true);

            if (!isset($searchFilter['combinator'])) {
                $searchFilter['combinator'] = 'and';
            }
            $data['searchFilters'] = $searchFilter;
        }
        $list = $this->getData($query, $data, $table, $columnMap, false);
        $dataList = [];
        foreach ($list as $key => $item){
            $roles = isset($item->roles[0]) ? $item->roles[0]->name : 'N/A';
            $item->role = $roles;
            unset($item->roles);
        }

        $this->apiResponse['data'] = $list;
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
            'first_name' => 'required|alpha|max:255',
            'last_name' => 'required|alpha|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|unique:users,phone',
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {

            $user = new User();
            $user->uuid = Uuid::uuid4();
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->email = $request->email;
            $user->username = $request->email;
            $user->phone = empty($request->phone) ? null : $request->phone;
            $user->password = Hash::make($request->password);
            $user->status_id = Status::ACTIVE;
            $user->referral_code = Str::random(10);
            $user->save();

            //check if roles came
            $roles = $request->get('role', []);
            if (!empty($roles)) {
                $user->syncRoles($roles);
            }

            $this->apiResponse['message'] = __('message.user.create_success');
        }
        return $this->sendResponse();
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $this->apiResponse['data'] = UserResource::make($user);
        return $this->sendResponse();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|alpha|max:255',
            'last_name' => 'required|alpha|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            //'phone' => 'unique:users,phone,' . $user->id,
            'status_id' => ['required', Rule::in([Status::ACTIVE, Status::IN_ACTIVE]),],
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(401);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $requestData = $request->all();
            $allowedArray = ['first_name', 'last_name', 'username', 'email', 'status_id', 'phone', 'gender', 'dob'];
            foreach ($requestData as $key => $val) {
                if (!in_array($key, $allowedArray)) {
                    continue;
                }
                if($key=='phone' && empty($val)){
                    $val = null;
                }
                $user->{$key} = $val;
            }

            $user->update();

            //check if roles came
            $roles = $request->get('role', []);
            if (!empty($roles)) {
                $user->syncRoles($roles);
            }


            $this->apiResponse['message'] = __('message.user.update_success');
        }
        return $this->sendResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        $this->apiResponse['message'] = __('message.user.delete_success');
        return $this->sendResponse();
    }

    /**
     * @param Request $request
     * @param User $user
     * @return \App\Http\Controllers\json
     */
    public function updatePassword(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required',
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $user->password = Hash::make($request->password);
            $this->apiResponse['message'] = __('message.user.password_update_success');
        }
        return $this->sendResponse();
    }


    /**
     * Change user status
     * @param Request $request
     * @param User $user
     * @return \App\Http\Controllers\json
     */
    public function changeStatus(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'status_id' => ['required', Rule::in([Status::ACTIVE, Status::IN_ACTIVE]),],
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $user->status_id = $request->get('status_id');
            $user->save();
            $this->apiResponse['message'] = 'User status changed successfully.';
        }
        return $this->sendResponse();
    }

    /**
     * Get user Referral list
     * @param Request $request
     * @param User $user
     * @return \App\Http\Controllers\json
     */
    public function getUserReferrals(Request $request, User $user)
    {
        if (empty($user)) {
            $this->apiResponse['message'] = 'Invalid user';
            $this->setResponseCode(201);
        } else {
            $data = array(
                'pageSize' => $request->get('page_size', 25),
                'sortBy' => $request->get('sort_by', 'id'),
                'sortOrder' => $request->get('sort_order', 'desc')
            );

            $table = (new User)->getTable();
            $columnMap = [
                'first_name' => 'first_name',
                'last_name' => 'last_name',
                'email' => 'email',
                'created_at' => 'created_at',
            ];
            $query = User::select([
                $table . '.id',
                $table . '.uuid',
                $table . '.first_name',
                $table . '.last_name',
                $table . '.username',
                $table . '.profile_image',
                $table . '.email',
                $table . '.phone',
                $table . '.profile_image',
                $table . '.profile_cover',
                $table . '.email_verified_at',
                $table . '.referral_count',
                $table . '.referral_code',
                $table . '.total_points',
                $table . '.created_at',
            ])->where($table . '.referred_by', '=', $user->id);

            $list = $this->getData($query, $data, $table, $columnMap);
            $this->apiResponse['data'] = $list;
        }
        return $this->sendResponse();
    }

    /**
     * @param Request $request
     * @param User $user
     * @return \App\Http\Controllers\json
     */
    function referralStats(Request $request, User $user)
    {

        $prefix = DB::getTablePrefix();
        $table = (new Invite)->getTable();
        $result = Invite::select([
            DB::raw('count(' . $prefix . $table . '.id) as total'),
            'accepted'
        ])->where('user_id', $user->id)
            ->groupBy('accepted')
            ->get()->toArray();
        $accepted = 0;
        $pending = 0;
        $total = 0;
        if (!empty($result)) {
            foreach ($result as $val) {
                if ($val['accepted'] == 1) {
                    $accepted = $val['total'];
                } else {
                    $pending = $val['total'];
                }
            }
            $total = $pending + $accepted;
        }
        $this->apiResponse['data'] = [
            'total' => $total,
            'accepted' => $accepted,
            'pending' => $pending,
        ];
        return $this->sendResponse();
    }
}
