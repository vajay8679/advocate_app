<?php

namespace App\Http\Requests;

class UploadRequest extends OsinFormRequest
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
      'media_section' => 'required|exists:media_sections,alias',
    ];
  }
}
