<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\SupportTicketRequest;
use App\Lib\Traits\Searchable;
use App\Models\Status;
use App\Models\SupportTicket;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\SupportTicketResource;
use Illuminate\Support\Facades\DB;

class SupportTicketController extends ApiController
{
    use Searchable;

    /**
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    public function index(Request $request)
    {
        $data = array(
            'pageSize' => $request->get('page_size', 25),
            'sortBy' => $request->get('sort_by', 'id'),
            'sortOrder' => $request->get('sort_order', 'desc')
        );

        // get table names
        $table = (new SupportTicket)->getTable();
        $statusTable = (new Status())->getTable();
        $userTable = (new User())->getTable();

        // this is required to search
        $columnMap = [
            'subject' => 'subject',
            'description' => 'description',
            'tags' => 'tags',
            'type' => 'type',
            'contact_attributes' => 'contact_attributes',
            'created_at' => $table.'.created_at',
            'updated_at' => $table.'.created_at',
            'assignee_first_name' => 'AS.first_name',
            'assignee_last_name' => 'AS.last_name',
            'priority' => 'priority'
        ];

        // get table names
        $query = SupportTicket::with(['status', 'user', 'assignee'])
            ->select([
                    $table . '.id',
                    $table . '.uuid',
                    $table . '.subject',
                    $table . '.description',
                    $table . '.tags',
                    $table . '.priority',
                    $table . '.type',
                    $table . '.contact_attributes',
                    $table . '.due_date as due_at',
                    $table . '.created_at',
                    $table . '.updated_at',
                    $statusTable . '.name as status_name',
                    'U.uuid as user_uuid',
                    'U.first_name',
                    'U.last_name',
                    'U.email',
                    'AS.uuid as assignee_uuid',
                    'AS.first_name as assignee_first_name',
                    'AS.last_name as assignee_last_name',
                ]
            )
            ->rightJoin($statusTable, function ($join) use ($table, $statusTable) {
                $join->on($statusTable . '.id', '=', $table . '.status_id');
            })
            ->leftJoin($userTable .' as U', function ($join) use ($table, $userTable) {
                $join->on('U.id', '=', $table . '.user_id');
            })
            ->leftJoin($userTable .' as AS', function ($join) use ($table, $userTable) {
                $join->on('AS.id', '=', $table . '.assigned_to');
            });
            //->whereNull($table . '.deleted_at');

        $ticketType = $request->get('type', 'all');
        if ($ticketType !== 'all') {
            $query = $query->where('type', $ticketType);
        }
        //ass search
        $searchFilter = $request->get('searchFilters');
        if ($searchFilter) {
            $searchFilter = json_decode($searchFilter, true);
            if(!isset($searchFilter['combinator'])){
                $searchFilter['combinator'] = 'and';
            }
            $data['searchFilters'] = $searchFilter;
        }
        $list = $this->getData($query, $data, $table, $columnMap);
        //$data = SupportTicketResource::collection($list);
        $this->apiResponse['data'] = $list;
        //$this->apiResponse['data']['totalPage'] = get_page_count($total, $data['pageSize']);
        return $this->sendResponse();
    }

    /**
     * @param SupportTicket $ticket
     * @return \App\Http\Controllers\json
     */
    public function show(SupportTicket $ticket)
    {
        $this->apiResponse['data'] = SupportTicketResource::make($ticket);
        return $this->sendResponse();
    }

    /**
     * @param SupportTicketRequest $request
     * @param SupportTicket $ticket
     * @return \App\Http\Controllers\json
     */
    public function update(SupportTicketRequest $request, SupportTicket $ticket)
    {
        return $this->sendResponse();
    }

    /**
     * @param SupportTicketRequest $request
     * @param SupportTicket $ticket
     * @return \App\Http\Controllers\json
     */
    public function destroy(SupportTicketRequest $request, SupportTicket $ticket)
    {
        return $this->sendResponse();
    }

    /**
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    public function stats(Request $request)
    {
        $tickets = DB::table('support_tickets')
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
}
