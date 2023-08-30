<?php

namespace App\Http\Requests;

use \App\Http\Requests\OsinFormRequest;

class ProfilePicRequest extends OsinFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'image_uuid' => 'required',
            'file_name' => 'required',
            'image_data' => 'required',
            'media_type' => 'required'
        ];
    }
}
