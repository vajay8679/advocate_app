<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\ApiController;
use App\Http\Resources\TranslationResource;
use App\Models\Language;
use App\Models\Translation;
use App\Models\TranslationKey;
use Carbon\Carbon;
use File;
use Illuminate\Http\Request;
use Validator;
use DB;

class TranslationController extends ApiController
{
    public function getTranslations(Request $request, $lang = 'en')
    {
        $translation = [];
        //check and return the lang json file
        $fileName = base_path('/resources/lang/' . $lang . '.json');
        if (file_exists($fileName)) {
            $langData = file_get_contents($fileName);
            $translation = json_decode($langData, true);
        }
        $this->apiResponse['data'] = $translation;
        return $this->sendResponse();
    }

    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    public function index(Request $request)
    {
        $pageSize = $request->get('page_size', 25);
        $sortBy = $request->get('sort_by', 'language_code');
        $sortOrder = $request->get('sort_order', 'asc');

        //table names
        $translationKeysTable = (new TranslationKey)->getTable();
        $translationTable = (new Translation)->getTable();
        $languageTable = (new Language)->getTable();

        $records = new Translation();
        $records = $records->join($translationKeysTable, $translationTable . '.translation_key_id', '=', $translationKeysTable . '.id');
        $records = $records->join($languageTable, $translationTable . '.language_code', '=', $languageTable . '.iso_code');

        //add select code
        $records = $records->select($translationTable . '.id', 'language_code', 'text', $languageTable . '.name as language_name', $translationKeysTable . '.key');

        //get only which languages are active
        $records = $records->whereHas('language', function ($q) {
            $q->where('is_active', '1');
        });

        //add sort logic
        if ($sortBy == 'key') {
            $records = $records->orderBy($translationKeysTable . '.key', $sortOrder);
        } else if ($sortBy == 'language_name') {
            $records = $records->orderBy($languageTable . '.name', $sortOrder);
        } else {
            $records = $records->orderBy($sortBy, $sortOrder);
        }

        //add search logic here
        $searches = $request->get('search', []);
        if ($searches) {
            $searches = is_array($searches) ? $searches : json_decode($searches, true);
            foreach ($searches as $key => $search) {
                if(empty($search)){
                    continue;
                }
                switch ($key):
                    case 'search':
                        $records = $records->where('key', 'like', '%' . $search . '%')
                            ->orWhere('text', 'like', '%' . $search . '%');
                        break;
                    default:
                        $records = $records->where($key, 'like', '%' . $search . '%');
                endswitch;
            }
        }

        $list = $records->paginate($pageSize);
        $total = $list->total();
        $data = TranslationResource::collection($list);
        $this->apiResponse['data'] = ['total' => $total, 'data' => $data];
        $this->apiResponse['data']['totalPage'] = get_page_count($total, $pageSize);

        // $languages = LanguageResource::collection(Language::all());
        // $this->apiResponse['data'] = $languages;
        return $this->sendResponse();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Translation $translation
     * @return \App\Http\Controllers\json
     */
    public function update(Request $request, Translation $translation)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|',
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $requestData = $request->all();
            foreach ($requestData as $key => $val) {
                $translation->{$key} = $val;
            }
            $translation->update();

            // update language json file logic here
            $lang = $translation->language_code;
            $this->createLanguageFile($lang);
            $this->apiResponse['message'] = __('message.translation.update_success');
        }
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
            'key' => 'required|max:255|unique:translation_keys,key',
            'text' => 'required'
        ]);
        if ($validator->fails()) {
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $validator->messages()->first();
            $this->apiResponse['errors'] = $validator->errors();
        } else {
            $date = Carbon::now()->toDateTimeString();

            //add to tranlation key first
            $translationKey = new TranslationKey();
            $translationKey->key = $request->key;
            $translationKey->name = $request->text;
            $translationKey->created_at = $date;
            $translationKey->updated_at = $date;
            $translationKey->save();

            //add translations
            $languages = Language::all();
            foreach ($languages as $language) {
                $translations[] = array(
                    'language_code' => $language->iso_code,
                    'translation_key_id' => $translationKey->id,
                    'text' => $translationKey->name,
                    'created_at' => $date,
                    'updated_at' => $date
                );
            }
            DB::table('translations')->insert($translations);

            // update language json file logic here
            foreach ($languages as $language) {
                $this->createLanguageFile($language->iso_code);
            }

            $this->apiResponse['message'] = __('message.translation.create_success');
        }
        return $this->sendResponse();
    }

    private function createLanguageFile($langCode)
    {
        $result = true;
        try {
            //table names
            $translationKeysTable = (new TranslationKey)->getTable();
            $translationTable = (new Translation)->getTable();

            // Fetch translations
            $records = Translation::where('language_code', $langCode);
            $records = $records->join($translationKeysTable, $translationTable . '.translation_key_id', '=', $translationKeysTable . '.id');

            //add select code
            $records = $records->select('text', $translationKeysTable . '.key');

            $plucked = $records->get()->pluck('text', 'key')->toJson();
            $path = public_path('lang');
            if (!file_exists($path)) {
                mkdir($path);
            }
            //echo $path;die;
            File::put($path . '/' . $langCode . '.json', $plucked);
        } catch (\Exception $e) {
            $result = false;
            \Log::error($e->getMessage());
        }
        return $result;
    }
}
