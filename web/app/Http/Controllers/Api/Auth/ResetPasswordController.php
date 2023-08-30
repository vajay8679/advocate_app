<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\ResetPasswordRequest;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use App\Notifications\PasswordResetOtp;
use App\Http\Requests\ResetPasswordOtpRequest;
use Seshac\Otp\Otp;


class ResetPasswordController extends ApiController
{
    public function resetPasswordEmail(ResetPasswordRequest $request)
    {//return $this->sendResponse();
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
                event(new PasswordReset($user));
            }
        );
        if ($status != Password::PASSWORD_RESET) {
            $this->setResponseCode(422);
        }
        $this->apiResponse['message'] = trans($status);
        return $this->sendResponse();
    }

    /**
     * @param ResetPasswordRequest $request
     * @return \App\Http\Controllers\json
     */
    public function resetPasswordOtp(ResetPasswordOtpRequest $request){
        $user = \App\Models\User::where('email', $request->email)->first();
        if($user) {
            $token = $request->otp;
            $verify = Otp::validate($user->uuid, $token);
            if(!$verify->status) {
                $this->setResponseCode(422);
                $this->apiResponse['message'] = 'You entered incorrect OTP.';
                $this->apiResponse['status'] = 'error';
            }else{
                $user->forceFill([
                    'password' => Hash::make($request->password)
                ])->save();
                event(new PasswordReset($user));
                $this->apiResponse['message'] = trans('passwords.reset');
            }
        }else{
            $this->setResponseCode(422);
            $this->apiResponse['message'] = 'If an account exist with this email. You will receive email.';
        }
        return $this->sendResponse();
    }
}
