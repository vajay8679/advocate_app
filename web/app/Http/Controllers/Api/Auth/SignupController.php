<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Requests\SignupRequest;
use App\Models\Invite;
use App\Models\UserContract;
use App\Notifications\OtpNotification;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Ramsey\Uuid\Guid\Guid;
use DB;
use Hash;
use App\Models\Status;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Seshac\Otp\Otp;


class SignupController extends ApiController
{
    /**
     * @OA\Post(
     *      path="/api/signup",
     *      operationId="signup",
     *      tags={"Authentication"},
     *      summary="Register a user to system",
     *      description="Register a user to system or website.",
     *      @OA\Response(
     *          response=200,
     *          description="Successful operation"
     *       ),
     *      @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *      ),
     *      @OA\Response(
     *          response=403,
     *          description="Forbidden"
     *      )
     *     )
     */
    public function __invoke(SignupRequest $request)
    {
        try {
            DB::transaction(function () use ($request) {
                // check if referal code
                $referralCode = $request->get('referral_code', null);
                $referredBy = null;
                if (!empty($referralCode)) {
                    $referredBy = User::where('referral_code', $referralCode)->first();
                }

                //Create user
                $user = new User();
                $user->uuid = Guid::uuid4();
                $user->first_name = $request->first_name;
                $user->last_name = $request->last_name;
                $user->email = $request->email;
                $user->username = $request->email;
                $user->phone = $request->phone;
                $user->password = Hash::make($request->password);
                $user->status_id = Status::PENDING;
                $user->registered_from_ip = $request->ip();
                $user->referral_code = $this->getToken();
                $user->referred_by = empty($referredBy) ? null : $referredBy->id;
                $user->device_type = empty($request->device_type) ? null : strtolower($request->device_type);
                $user->device_token = empty($request->device_token) ? null : $request->device_token;
                $user->device_info = empty($request->device_info) ? null : json_encode($request->device_info);
                $user->save();

                //assign role
                $user->assignRole('user');

                // update referral count
                if (!empty($referredBy)) {
                    $referredBy->referral_count = $referredBy->referral_count + 1;
                    $referredBy->update();

                    //accept invite
                    $invite = Invite::where('user_id', $referredBy->id)
                        ->where('email', $request->email)->first();
                    if($invite){
                        $invite->accepted = 1;
                        $invite-save();
                    }
                }

                //create otp
                $otp = Otp::setLength(4)->generate($user->uuid);

                //notify user
                $data = [
                    'name' => $user->first_name . ' ' . $user->last_name,
                    'token' => $otp->token
                ];
                $user->notify(new OtpNotification($data));

                //send verification email
                // $user->sendEmailVerificationNotification();
                event(new Registered($user));

                $this->apiResponse['data'] = array(
                    'uuid' => $user->uuid,
                );
            });
            $this->apiResponse['message'] = trans('auth.signup.success');
        } catch (\Exception $e) {
            $this->setResponseCode(422);
            $this->apiResponse['message'] = $e->getMessage();
            $this->apiResponse['exception'] = $e->getMessage();
        }
        return $this->sendResponse();
    }

    private function getToken()
    {
        $token = Str::random(6);;
        $code = $token . substr(strftime("%Y", time()), 2);
        $code = 'CS@6-' . strtoupper($code);
        $user_code = User::where('referral_code', $code)->first();
        //dd(empty($user_code));
        if (!empty($user_code)) {
            $code = $this->getToken();
        }
        return $code;
    }
}
