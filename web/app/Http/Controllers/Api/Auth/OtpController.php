<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\ApiController;
use App\Models\Status;
use App\Notifications\WelcomeNotification;
use Seshac\Otp\Otp;
use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\OtpNotification;
class OtpController extends ApiController
{
    /**
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    function verify(Request $request)
    {
        $token = $request->otp;
        $email = $request->email;
        $user = User::where('email', $email)->first();
        if ($user) {
            $verify = Otp::validate($user->uuid, $token);
            if(!$verify->status) {
                $this->setResponseCode(422);
                $this->apiResponse['message'] = 'You entered incorrect OTP.';
                $this->apiResponse['status'] = 'error';
            }else{
                $user->status_id = Status::ACTIVE;
                $user->email_verified_at = now();
                $user->save();
                $this->apiResponse['message'] = 'Email verified successfully.';

                $user->notify(new WelcomeNotification());
            }
        } else {
            $this->setResponseCode(422);
            $this->apiResponse['message'] = 'Something went wrong. Please contact admin.';
            $this->apiResponse['status'] = 'error';
        }

        //$verify = Otp::validate($identifier, $otp->token);
        return $this->sendResponse();
    }

    /**
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    function resend(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if ($user) {
            //create otp
            //$otp = Otp::generate($user->uuid);
            $otp = Otp::setLength(4)->generate($user->uuid);
            //notify user
            $data = [
                'name' => $user->first_name . ' ' . $user->last_name,
                'token' => $otp->token
            ];
            $user->notify(new OtpNotification($data));

            $this->apiResponse['message'] = 'Otp resent successfully.';
        } else {
            $this->setResponseCode(422);
            $this->apiResponse['message'] = 'Something went wrong. Please contact admin.';
            $this->apiResponse['status'] = 'error';
        }
        return $this->sendResponse();
    }
}
