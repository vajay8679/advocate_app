<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;


class OsinFormRequest extends FormRequest
{
    protected $apiResponse = array(
        'response_code' => Response::HTTP_UNAUTHORIZED,
        'message' => '',
    );

    /**
     * Handle a failed validation attempt.
     *
     * @param \Illuminate\Contracts\Validation\Validator $validator
     * @return void
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        throw (new ValidationException($validator))
            ->errorBag($this->errorBag)
            ->redirectTo($this->getRedirectUrl());
    }

    /**
     * {@inheritdoc}
     * @throws HttpResponseException
     */
    protected function failedAuthorization()
    {
        /*
         * throw new HttpResponseException($this->response(
            array('You are not authorized to perform this action.')
        ));
        */
        $this->apiResponse['message'] = 'You are not authorized to perform this action.';
        throw new HttpResponseException(response()->json($this->apiResponse, $this->apiResponse['response_code']));
    }

    /**
     * @param array $messages
     * @param int $responseCode
     * @return \Illuminate\Http\JsonResponse
     */
    protected function response($messages = [], $responseCode = 400)
    {
        dd('$this->errorBag');
        $this->apiResponse['response_code'] = $responseCode;
        $this->apiResponse['message'] = $messages;
        //return response()->json($messages, $responseCode);
        return response()->json($this->apiResponse, $responseCode);
    }
}
