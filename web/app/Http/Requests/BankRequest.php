<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BankRequest extends OsinFormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {

      $rules = [];
      switch (strtolower($this->method())) {
        case 'post':
          $rules = [
            'bank_name' => 'required|max:255',
          ];
        case 'put':
        case 'patch':
          $rules = [
            'uuid' => 'exists:banks,uuid',
            'bank_name' => 'required|max:255',
          ];
      }
      return $rules;
    }
}
