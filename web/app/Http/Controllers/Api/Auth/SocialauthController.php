<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\ApiController;
use App\Models\Activity;
use App\Models\ActivityType;
use App\Models\LoginHistory;
use App\Models\Status;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use App\Models\UserSocialAccount;
use App\Models\User;
use Ramsey\Uuid\Guid\Guid;
use App\Events\LogActivity;

class SocialauthController extends ApiController
{
    /**
     * @param Request $request
     * @param string $provider
     * @return mixed
     */
    public function redirectToLogin(Request $request, $provider=""){

        return Socialite::driver($provider)->stateless()->redirect();
    }

    /**
     * @param Request $request
     * @param $provider
     * @return \App\Http\Controllers\json
     */
    public function handleProviderCallback(Request $request, $provider){

        /*
        $code = ''; //token from the google response
        $user = Socialite::driver($provider)->userFromToken($code);
        $this->apiResponse['data'] = $user;
        return $this->sendResponse();
        */

        // Socialite will pick response data automatic
        $user = Socialite::driver($provider)->stateless()->user();
        $this->apiResponse['data'] = $user;
        return $this->sendResponse();
    }

    /**
     * @param Request $request
     * @param $provider
     * @return \App\Http\Controllers\json
     */
    public function handleProviderLogin(Request $request, $provider){
        $providerUser = null;
        $accessToken = $request->accessToken;
        //$profile = $request->profile;
        try {
            $providerUser = Socialite::driver($provider)->userFromToken($accessToken);
        } catch (Exception $exception) {}

        if ($providerUser) {
            $user = $this->findOrCreate($providerUser, $provider);
            // print_r($user);
            $device_name = $request->get('device_name', 'web');
            // log user login history
            $loginHistory = new LoginHistory();
            $loginHistory->ip_address = $request->ip();
            $loginHistory->latitude = null; //
            $loginHistory->longitude = null;
            $loginHistory->user_id = $user->id;
            $loginHistory->device = $device_name;
            $loginHistory->save();

            //Log event
            //Log event
            $activity = new Activity();
            $activity->user_id = $user->id;
            $activity->activity_type_id = ActivityType::LOGIN;
            $activity->ip_address = $request->ip();
            LogActivity::dispatch($activity);

            // Prepare api response
            $this->apiResponse['data'] = [
                'uuid' => $user->uuid,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'status' => $user->status->name,
                'token' => $user->createToken($device_name)->plainTextToken,
                'wallet_balance' => $user->balance,
            ];
            //set message
            $this->apiResponse['message'] = trans("auth.login.success");
        }else{
            $this->apiResponse['message'] = trans("auth.failed");
            $this->setResponseCode(422);
        }
        return $this->sendResponse();
    }

    /**
     * Find or create user instance by provider user instance and provider name.
     *
     * @param ProviderUser $providerUser
     * @param string $provider
     *
     * @return User
     */
    public function findOrCreate($providerUser, string $provider): User
    {
        //print_r(get_class_vars(get_class($providerUser)));die;
        $linkedSocialAccount = UserSocialAccount::where('provider_name', $provider)
            ->where('provider_id', $providerUser->getId())
            ->first();
        if ($linkedSocialAccount) {
            return $linkedSocialAccount->user;
        } else {
            $user = null;
            if ($email = $providerUser->getEmail()) {
                $user = User::where('email', $email)->first();
            }
            if (! $user) {
                $userRaw = $providerUser->getRaw();
                $firstName = isset($userRaw['given_name']) ? $userRaw['given_name'] : $providerUser->getName();
                $lastName = isset($userRaw['family_name']) ? $userRaw['family_name'] : $providerUser->getName();
                $data = [
                    'uuid' => Guid::uuid4()->toString(),
                    'first_name' => $firstName,
                    'last_name' => $lastName,
                    'email' => $providerUser->getEmail(),
                    'username' => $providerUser->getEmail(),
                    'profile_image' => $providerUser->getAvatar(),
                    'status_id' => Status::ACTIVE,
                ];
                //print_r($data);die;
                $user = User::create($data);
            }
            $user->linkedSocialAccounts()->create([
                'provider_id' => $providerUser->getId(),
                'provider_name' => $provider,
            ]);
            return $user;
        }
    }
}
