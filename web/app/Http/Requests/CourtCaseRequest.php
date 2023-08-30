<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

// class CourtCaseRequest extends OsinFormRequest
class CourtCaseRequest extends FormRequest
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
//   public function rules(): array
//   {
//     $rules = [];
//     switch (strtolower($this->method())) {
//       case 'post':
//         $rules = [
//           //'title' => 'required',
//           'case_type' => 'required',
//           'allotted_date' => 'required|date',
//           'bank_id' => 'exists:banks,id',
//           'bank_branch_id' => 'exists:bank_branches,id',
//           'loan_account_number' => 'required',
//           'customer_name' => 'required',
//           'customer_phone' => 'required',
//           'customer_address' => 'required',
//           'symbolic_account' => 'required',
// //          'case_stage' => 'required',
//         ];
//       case 'put':
//       case 'patch':
//         $rules = [
//           'uuid' => 'exists:court_cases,uuid',
//           'case_type' => 'required',
//           'allotted_date' => 'required|date',
//           'bank_id' => 'exists:banks,id',
//           'bank_branch_id' => 'exists:bank_branches,id',
//           'loan_account_number' => 'required',
//           'customer_name' => 'required',
//           'customer_phone' => 'required',
//           'customer_address' => 'required',
//           'symbolic_account' => 'required',
// //          'case_stage' => 'required',
//         ];
//     }
//     return $rules;
//   }
        
    public function rules(): array
    {
        $rules = [];
        $caseType = $this->input('case_type');

        switch (strtolower($this->method())) {
            case 'post':
                $commonRules = [
                    // 'case_type' => 'required',
                    'assignee_id' => 'required',
                    'status_id' => 'exists:statuses,id',
                ];

                if ($caseType === 1) {
                    $specificRules = [
                        'allotted_date' => 'required|date',
                        'bank_id' => 'exists:banks,id',
                        'bank_branch_id' => 'exists:bank_branches,id',
                        'loan_account_number' => 'required',
                        'customer_name' => 'required',
                        'customer_phone' => 'required',
                        'customer_address' => 'required',
                        'symbolic_account' => 'required',
                        // 'case_stage' => 'required',
                    ];
                } elseif ($caseType === 2) {
                    $specificRules = [
                        'death' => 'required',
                        'insurance_company' => 'required',
                        'vehicle_number' => 'required',
                        'vehicle_owner' => 'required',
                        'vehicle_driver' => 'required',
                        'fir_number' => 'required',
                        'thana' => 'required',
                        'cnr' => 'required',
                        'filling_number' => 'required',
                        'macc_number' => 'required',
                        'court_name' => 'required',
                        'date_of_filling' => 'required',
                        'challan' => 'required',
                        'company_file_number' => 'required',
                        'office_file_number' => 'required',
                        'next_date' => 'required',
                        'date_of_disposal' => 'required',
                    ];
                } else {
                    $specificRules = [];
                }

                $rules = array_merge($commonRules, $specificRules);
                break;

            case 'put':
            case 'patch':
                // $rules = [
                //     'uuid' => 'exists:court_cases,uuid',
                //     'case_type' => 'required',
                //     'allotted_date' => 'required|date',
                //     'bank_id' => 'exists:banks,id',
                //     'bank_branch_id' => 'exists:bank_branches,id',
                //     'loan_account_number' => 'required',
                //     'customer_name' => 'required',
                //     'customer_phone' => 'required',
                //     'customer_address' => 'required',
                //     'symbolic_account' => 'required',
                //     // 'case_stage' => 'required',

                //     'death' => 'required|date',
                //     'company' => 'required',
                //     'vehicle_number' => 'required',
                //     'fir_number' => 'required',
                //     'thana' => 'required',
                //     'cnr' => 'required',
                //     'filling_number' => 'required',
                //     'macc_number' => 'required',
                //     'court_name' => 'required',
                //     'date_of_filling' => 'required|date',
                //     'challan' => 'required',
                //     'company_file_number' => 'required',
                //     'office_file_number' => 'required',
                //     'next_date' => 'required|date',
                // ];
                // break;
                $commonRules1 = [
                //   'case_type' => 'required',
                  'assignee_id' => 'required',
                  'status_id' => 'exists:statuses,id',
              ];

              if ($caseType === 1) {
                  $specificRules1 = [
                      'allotted_date' => 'required|date',
                      'bank_id' => 'exists:banks,id',
                      'bank_branch_id' => 'exists:bank_branches,id',
                      'loan_account_number' => 'required',
                      'customer_name' => 'required',
                      'customer_phone' => 'required',
                      'customer_address' => 'required',
                      'symbolic_account' => 'required',
                      // 'case_stage' => 'required',
                  ];
              } elseif ($caseType === 2) {
                  $specificRules1 = [
                      'death' => 'required',
                      'insurance_company' => 'required',
                      'vehicle_number' => 'required',
                      'vehicle_owner' => 'required',
                      'vehicle_driver' => 'required',
                      'fir_number' => 'required',
                      'thana' => 'required',
                      'cnr' => 'required',
                      'filling_number' => 'required',
                      'macc_number' => 'required',
                      'court_name' => 'required',
                      'date_of_filling' => 'required',
                      'challan' => 'required',
                      'company_file_number' => 'required',
                      'office_file_number' => 'required',
                      'next_date' => 'required',
                      'date_of_disposal' => 'required',
                  ];
              } else {
                  $specificRules1 = [];
              }

              $rules = array_merge($commonRules1, $specificRules1);
              break;
        }

        return $rules;
    }
}
