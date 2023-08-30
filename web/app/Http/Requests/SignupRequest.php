<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends OsinFormRequest
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
            'first_name' => 'required|alpha|max:255',
            'last_name' => 'required|alpha|max:255',
            'email' => 'required|email|unique:users,email',
            //'phone' => 'required|unique:users,phone',
            'password' => 'required|min:6|confirmed',
            'password_confirmation' => 'required|min:6',
            'referral_code' => 'exists:users,referral_code',
        ];
    }
}
