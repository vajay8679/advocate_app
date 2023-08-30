<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Http\Requests\ChangePasswordRequest;
use App\Lib\Traits\Searchable;
use App\Models\Contract;
use App\Models\UserContract;
use App\Notifications\ChangePassword;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserProfileResource;
use App\Http\Requests\UpdateProfileRequest;

class UserProfileController extends ApiController
{
    use Searchable;
    /**
     * THis method will return user profile
     * @param Request $request
     * @param \App\Models\User $user
     * @return \App\Http\Controllers\json
     */
    public function show(User $user)
    {
        //dd(UserProfileResource::make($user));
        $this->apiResponse['data'] = UserProfileResource::make($user);
        return $this->sendResponse();
    }

    public function update(UpdateProfileRequest $request)
    {
        try {
            $allowedArray = ['first_name', 'last_name', 'phone', 'gender', 'dob'];
            $requestData = $request->all();
            $user = $request->user();
            foreach ($requestData as $key => $val) {
              if (!in_array($key, $allowedArray)) {
                continue;
              }
              if($key=='phone' && empty($val)){
                $val = null;
              }
              $user->{$key} = $val;
            }

            $user->update();
            $this->apiResponse['message'] = trans('message.profile.info.success');
        } catch (\Exception $exception) {
            $this->setResponseCode(500);
            $this->apiResponse['error'] = $exception->getMessage();
            $this->apiResponse['message'] = trans('message.error_ocurred');
        }
        return $this->sendResponse();
    }

    /**
     * @param ChangePasswordRequest $request
     * @return \App\Http\Controllers\json
     */
    public function changePassword(ChangePasswordRequest $request)
    {

        $current_password = Auth::User()->password;
        if (Hash::check($request->current_password, $current_password)) {
            //check if new and current password is same
            if (Hash::check($request->password, $current_password)) {
                $this->apiResponse['message'] = trans('auth.new_pwd_differ_error');
                $this->setResponseCode(422);
            } else {
                $user_id = Auth::User()->id;
                $user = User::find($user_id);
                $user->password = Hash::make($request->password);
                $user->save();
                $user->notify(new ChangePassword($user));
                $this->apiResponse['message'] = trans('auth.change_pwd_success');
            }
        } else {
            $this->apiResponse['message'] = trans('auth.change_pwd_error');
            $this->setResponseCode(422);
        }
        return $this->sendResponse();
    }

    /**
     * Get user Referral List
     * @param Request $request
     * @return \App\Http\Controllers\json
     */
    public function referralList(Request $request){
        try{
            $user = $request->user();
            $data = array(
                'pageSize' => $request->get('page_size', 25),
                'sortBy' => $request->get('sort_by', 'id'),
                'sortOrder' => $request->get('sort_order', 'desc')
            );

            $table = (new User)->getTable();
            $columnMap = [
                'first_name' => 'first_name',
                'last_name' => 'last_name',
                'email' => 'email',
                'created_at' => 'created_at',
            ];
            $query = User::select([
                $table . '.id',
                $table . '.uuid',
                $table . '.first_name',
                $table . '.last_name',
                $table . '.username',
                $table . '.profile_image',
                $table . '.email',
                $table . '.phone',
                $table . '.profile_image',
                $table . '.referral_count',
                $table . '.referral_code',
                $table . '.total_points',
                $table . '.created_at',
            ])->where($table . '.referred_by', '=', $user->id);

            $list = $this->getData($query, $data, $table, $columnMap);
            $this->apiResponse['data'] = $list;
        }catch (\Exception $e){
            $this->apiResponse['message'] = 'Something went wrong. Please try again later';
        }
        return $this->sendResponse();
    }

    public function updateToken(Request $request){
      try{
        $request->user()->update(['fcm_token'=>$request->token]);
        return response()->json([
          'success'=>true
        ]);
      }catch(\Exception $e){
        report($e);
        return response()->json([
          'success'=>false
        ],500);
      }
    }
}
