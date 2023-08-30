<?php

namespace App\Http\Controllers\Api\Auth;

use App\Events\LogActivity;
use App\Http\Controllers\ApiController;
use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\Activity;
use App\Models\ActivityType;
use App\Models\Status;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Auth;
use App\Models\LoginHistory;
use Illuminate\Support\Facades\App;

/**
 * @OA\Tag(
 *     name="Authentication",
 *     description="API Endpoints for authentications apis"
 * )
 */

/**
 * @OA\Post(
 *      path="/api/login",
 *      operationId="authLogin",
 *      tags={"Authentication"},
 *      summary="Login with email or phone or user and password",
 *      description="Authenticate a user by his login credentials.",
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
 *      ),
 *      @OA\Response(
 *          response=422,
 *          description="Wrong credentials response",
 *          @OA\JsonContent(
 *              @OA\Property(property="message", type="string", example="Sorry, wrong email address or password. Please try again")
 *          )
 *      )
 *     )
 */
class LoginController extends ApiController
{
    public function index(LoginRequest $request)
    {
        try {
            $user = User::where(function ($query) use ($request) {
                $query->orWhere('email', $request->username)
                    ->orWhere('username', $request->username)
                    ->orWhere('phone', $request->username)
                    ->orWhere('phone', $request->username);
            })->first();
            if (!empty($user) && $user->status_id == Status::IN_ACTIVE) {
                $this->apiResponse['message'] = 'You account has been blocked. Please contact admin.';
                $this->setResponseCode(422);
            } else if (!empty($user) && $user->status_id == Status::PENDING) {
                $this->apiResponse['message'] = 'Your email is not verified. Please verify email.';
                $this->setResponseCode(422);
            } else if (!empty($user) && Hash::check($request->password, $user->password)) {

                //Set user auth session
                Auth::setUser($user);

                $device_name = $request->get('device_name', 'web');

                // log user login history
                $loginHistory = new LoginHistory();
                $loginHistory->ip_address = $request->ip();
                $loginHistory->latitude = null; //
                $loginHistory->longitude = null;
                $loginHistory->user_id = $user->id;
                $loginHistory->device = $device_name;
                $loginHistory->save();

                // Prepare api response
                $userInfo = UserResource::make($user)->toArray($request);
                $userInfo['token'] = $user->createToken($device_name)->plainTextToken;
                //$userInfo['wallet_balance'] = $user->balance;


                //Log event
                $activity = new Activity();
                $activity->user_id = $user->id;
                $activity->activity_type_id = ($device_name=='web') ? ActivityType::LOGIN : ActivityType::MOBILE_LOGIN;
                $activity->ip_address = $request->ip();
                LogActivity::dispatch($activity);

                //save device token
                if($request->device_token && $request->device_token !== $user->device_token){
                    $user->device_token = $request->device_token;
                    $user->save();
                }

                //save device info
                if(!empty($request->device_info)){
                    $user->device_info = $request->device_info;
                    $user->save();
                }

                $this->apiResponse['data'] = $userInfo;
                //set message
                $this->apiResponse['message'] = __("auth.login.success");

            } else {
                $locale = App::getLocale();
                $this->apiResponse['locale'] = $locale;
                $this->apiResponse['message'] = __("auth.failed");
                $this->setResponseCode(422);
            }

        } catch (\Exception $e) {
            $this->apiResponse['message'] = $e->getMessage();
            $this->setResponseCode(500);
        }
        return $this->sendResponse();
    }

}
