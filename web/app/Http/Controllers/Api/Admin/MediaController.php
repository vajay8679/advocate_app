<?php


namespace App\Http\Controllers\Api\Admin;


use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Http\Resources\MediaResource;
use App\Models\Media;

class MediaController extends ApiController
{
    function index(Request $request){
        $pageSize = $request->get('page_size', 25);
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');

        $records = new Media();
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
        $data = MediaResource::collection($list);
        $this->apiResponse['data'] = ['total' => $total, 'data' => $data];
        $this->apiResponse['data']['totalPage'] = get_page_count($total, $pageSize);
        return $this->sendResponse();
        return $this->sendResponse();
    }
}
