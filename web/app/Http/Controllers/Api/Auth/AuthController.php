<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\ApiController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class AuthController extends ApiController
{
    public function index(Request $request)
    {
        $user = $request->user();//->toArray();
        $userInfo = UserResource::make($user)->toArray($request);
        $this->setResponseData($userInfo);
        return $this->sendResponse();
    }
}
