<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\ForgotPasswordRequest;
use App\Models\User;
use App\Notifications\OtpNotification;
use Illuminate\Support\Facades\Password;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Seshac\Otp\Otp;
use App\Notifications\PasswordResetOtp;

class ForgotPasswordController extends ApiController
{
    use SendsPasswordResetEmails;

    public function sendPasswordResetLinkEmail(ForgotPasswordRequest $request)
    {
        $status = Password::sendResetLink(
            $request->only('email')
        );
        if($status === Password::RESET_LINK_SENT){
            $this->apiResponse['message'] = trans('passwords.sent');
        }else{
            $this->apiResponse['message'] = trans($status);
            $this->setResponseCode(422);
        }
        return $this->sendResponse();
    }

    public function sendPasswordResetOtpEmail(ForgotPasswordRequest $request){
        $user = User::where('email', $request->email)->first();
        $otp = Otp::setLength(4)->generate($user->uuid);
        if($otp->status){
            $data = [
                'name' => $user->first_name . ' ' . $user->last_name,
                'token' => $otp->token
            ];
            $user->notify(new PasswordResetOtp($data));
            $this->apiResponse['message'] = 'If an account exist with this email. You will receive email.';
        }else{
            $this->setResponseCode(201);
            $this->apiResponse['message'] = $otp->message;
        }
        return $this->sendResponse();
    }
}
