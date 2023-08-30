<?php

namespace App\Http\Requests;

use App\Http\Requests\OsinFormRequest;

class UpdateProfileRequest extends OsinFormRequest
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
            'first_name' => 'required',
            'last_name' => 'required',
            'phone' => 'phone_number',
            'bio' => '',
            'gender' => '',
            'fb_username' => '',
            'github_username' => '',
            'instagram_username' => '',
            'linkedin_username' => '',
            'skype_username' => '',
            'twitter_username' => '',
        ];
    }
}
