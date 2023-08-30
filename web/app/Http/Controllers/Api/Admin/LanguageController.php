<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Resources\LanguageResource;
use App\Models\Language;
use Illuminate\Http\Request;

class LanguageController extends ApiController
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    public function index(Request $request)
    {
        $pageSize = $request->get('page_size', 25);
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');

        $records = new Language();

        //add sort logic
        $records = $records->orderBy($sortBy, $sortOrder);

        //add search logic here
        $searches = $request->get('search', []);
        if ($searches) {
            $searches = is_array($searches) ? $searches : json_decode($searches, true);
            foreach ($searches as $key => $search) {
                // $search = json_decode($search);
                switch ($key):
                    case 'status':
                        $conName = 'App\Status::' . $search;
                        if (defined($conName)) {
                            $statusId = constant($conName);
                            $records = $records->where('status_id', $statusId);

                            //echo $statusId;die;
                        }
                        break;
                    default:
                        $records = $records->where($key, 'like', '%' . $search . '%');
                endswitch;
            }
        }

        $list = $records->paginate($pageSize);
        $total = $list->total();
        $data = LanguageResource::collection($list);
        $this->apiResponse['data'] = ['total' => $total, 'data' => $data];
        $this->apiResponse['data']['totalPage'] = get_page_count($total, $pageSize);

        // $languages = LanguageResource::collection(Language::all());
        // $this->apiResponse['data'] = $languages;
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
     * @param \App\Models\Language $language
     * @return \Illuminate\Http\Response
     */
    public function show(Language $language)
    {
        return $this->sendResponse();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Language $language
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Language $language)
    {
        $requestData = $request->all();
        foreach ($requestData as $key => $val) {
            $language->{$key} = $val;
        }
        $language->update();
        $this->apiResponse['message'] = __("message.language.update_success");
        return $this->sendResponse();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Language $language
     * @return \Illuminate\Http\Response
     */
    public function destroy(Language $language)
    {
        return $this->sendResponse();
    }
}
