<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends OsinFormRequest
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
            'name' => 'required|alpha|max:255',
            'parent' => 'exists:categories,uuid',
            'entity_type' => 'exists:entity_types,entity_type',
            'parent' => 'exists:categories,uuid',
          ];
        case 'put':
        case 'patch':
          $rules = [
            'uuid' => 'exists:categories,uuid',
            'name' => 'required|alpha|max:255',
            'parent' => 'exists:categories,uuid',
            'entity_type' => 'exists:entity_types,entity_type',
            'parent' => 'exists:categories,uuid',
          ];
      }
      return $rules;
    }
}
