<?php

namespace App\Http\Requests;

class BankBranchRequest extends OsinFormRequest
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
          'bank_uuid' => 'required|exists:banks,uuid',
          'branch_name' => 'required|max:255',
          'branch_code' => 'required|max:255',
          'ifsc_code' => 'required|max:255',
        ];
      case 'put':
      case 'patch':
        $rules = [
          'uuid' => 'exists:bank_branches,uuid',
          'branch_name' => 'required|max:255',
          'branch_code' => 'required|max:255',
          'ifsc_code' => 'required|max:255',
        ];
    }
    return $rules;
  }
}
