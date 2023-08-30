<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\Activity;
use App\Models\ActivityType;
use App\Models\LoginHistory;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends ApiController
{
    /**
     *
     *
     */
    public function deviceUsage(Request $request)
    {

        return $this->sendResponse();
    }

    /**
     *
     */
    public function userRegistration(Request $request)
    {
        $startDate = $request->get('start_date', null);
        $endDate = $request->get('end_date', null);
        //get user registered filter start date, end date
        // SELECT DATE(created_at) AS date, COUNT(id) FROM osin_users GROUP BY DATE(created_at)
        $data = [];
        if (!empty($startDate) && !empty($endDate)) {
            $startDate = format_date('Y-m-d', $startDate);
            $endDate = format_date('Y-m-d', $endDate);

            $userTable = (new User)->getTable();
            $users = DB::table($userTable)
                ->select(DB::raw('count(id) as user_count, DATE(created_at) as date'))
                ->groupByRaw('DATE(created_at)')
                ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate])
                ->get();;//->keyBy('date');

            //prepare result
            $data = $this->getDatesFromRange($startDate, $endDate);
            foreach ($users as $user) {
                if (array_key_exists($user->date, $data)) {
                    $data[$user->date] = $user->user_count;
                }
            }
        }
        $this->apiResponse['data'] = $data;
        return $this->sendResponse();
    }

    /**
     *
     */
    public function summary(Request $request)
    {

        $activityTable = (new Activity())->getTable();
        $loginHistoryTable = (new LoginHistory())->getTable();


        // user table stats
        $activeUsers = 0;
        $pendingUsers = 0;
        $blockedUsers = 0;
        $totalUsers = 0;
        $usersStat = User::select(
            [
                DB::raw('count(id) as total_count'),
                'status_id'
            ]
        )
            ->whereIn('status_id', [Status::ACTIVE, Status::BLOCKED, Status::PENDING])
            ->groupBy('status_id')
            ->get()->toArray();

        foreach ($usersStat as $stat) {
            $totalUsers += $stat['total_count'];
            if ($stat['status_id'] === Status::ACTIVE) {
                $activeUsers = $stat['total_count'];
            }
            if ($stat['status_id'] === Status::PENDING) {
                $pendingUsers = $stat['total_count'];
            }
            if ($stat['status_id'] === Status::BLOCKED) {
                $blockedUsers = $stat['total_count'];
            }
        }

        // get total activity
        $totalActivity = DB::table($activityTable)->count(['id']);

        // get total mobile login count
        $totalMobileLogin = DB::table($loginHistoryTable)->where('device', '=', 'mobile')->count(['id']);


        $data = [
            'total_users' => $totalUsers,
            'total_active_users' => $activeUsers,
            'total_pending_users' => $pendingUsers,
            'total_blocked_users' => $blockedUsers,
            'total_activity' => $totalActivity,
            'total_mobile_login' => $totalMobileLogin,
            'total_active_contract' => $this->getActiveContractCount(),
            'total_expired_contract' => $this->getExpiredContractCount(),
        ];
        $this->apiResponse['data'] = $data;
        return $this->sendResponse();
    }

    /**
     * Get user stats
     *
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    public function userStats(Request $request)
    {
        $tickets = DB::table('users')
            ->select('status_id', DB::raw('count(id) as total_count'))
            ->whereNull('deleted_at')
            ->groupBy('status_id')
            ->get()->toArray();
        $data = [];
        $total = 0;
        foreach ($tickets as $ticket) {
            $ticket->status = Status::$statusList[$ticket->status_id];
            $data[] = $ticket;
            $total += $ticket->total_count;
        }
        $this->apiResponse['data'] = $data;
        return $this->sendResponse();
    }

    public function tokenStats(Request $request)
    {
        $earnedToken = DB::table('users')
            ->select(DB::raw('sum(total_points) as total_count'))
            ->first();
        $totalToken = DB::table('site_settings')
            ->select('setting_val')
            ->where('name', 'available_coin')
            ->first();
        $this->apiResponse['data'] = array(
            'available_points' => (!empty($totalToken) && $totalToken->setting_val) ? $totalToken->setting_val : 00,
            'points_earned_user' => number_format((float)$earnedToken->total_count, 2, '.', '')
        );
        return $this->sendResponse();
    }

    /**
     * @return mixed
     */
    private function getActiveContractCount()
    {
        $date = format_date('Y-m-d');
        $result = DB::table('user_contracts')
            ->select(DB::raw('count(id) as total_count'))
            ->where('start_date', '<=', $date)
            ->where('end_date', '>=', $date)
            ->first();
        return $result->total_count;
    }

    /**
     * @return mixed
     */
    private function getExpiredContractCount(){
        $date = format_date('Y-m-d');
        $result = DB::table('user_contracts')
            ->select(DB::raw('count(id) as total_count'))
            ->where('end_date', '<', $date)
            ->first();
        return $result->total_count;
    }

    /**
     *
     */
    public function userMobileLogin(Request $request)
    {
        $startDate = $request->get('start_date', null);
        $endDate = $request->get('end_date', null);
        //get user registered filter start date, end date
        // SELECT DATE(created_at) AS date, COUNT(id) FROM osin_users GROUP BY DATE(created_at)
        $data = [];
        if (!empty($startDate) && !empty($endDate)) {
            $startDate = format_date('Y-m-d', $startDate);
            $endDate = format_date('Y-m-d', $endDate);

            $userTable = (new User)->getTable();
            $activityTable = (new Activity)->getTable();
            $users = DB::table($activityTable)
                ->select(DB::raw('count(id) as user_count, DATE(created_at) as date'))
                ->groupByRaw('DATE(created_at)')
                ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate])
                ->where('activity_type_id', ActivityType::MOBILE_LOGIN)
                /*->leftJoin($userTable, function ($join) use ($activityTable, $userTable) {
                    $join->on($userTable . '.id', '=', $activityTable . '.user_id');
                })*/
                ->get();
            /*
             $users = DB::table($userTable)
                ->select(DB::raw('count(id) as user_count, DATE(created_at) as date'))
                ->groupByRaw('DATE(created_at)')
                ->whereBetween(DB::raw('DATE(created_at)'), [$startDate, $endDate])
                ->get();;//->keyBy('date');
            */
            //prepare result
            $data = $this->getDatesFromRange($startDate, $endDate);
            foreach ($users as $user) {
                if (array_key_exists($user->date, $data)) {
                    $data[$user->date] = $user->user_count;
                }
            }
        }
        $this->apiResponse['data'] = $data;
        return $this->sendResponse();
    }
}
