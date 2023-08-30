<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityType extends Model
{
    const LOGIN = 1;
    const MOBILE_LOGIN = 2;
    const SOCIAL_LOGIN = 3;
    const SIGNUP = 4;
    const SOCIAL_SIGNUP = 5;
    const FORGOT_PASSWORD = 6;
    const RESET_PASSWORD = 7;
    const ADV_CLICK = 8;
    const SCREEN_TIME = 9;
    const APP_OPENED = 10;
    const APP_CLOSED = 11;
    const VIDEO_CLICK = 12;

    const ACTIVITY_TYPE_ARRAY = [
        'LOGIN',
        'MOBILE_LOGIN',
        'SOCIAL_LOGIN',
        'SIGNUP',
        'SOCIAL_SIGNUP',
        'FORGOT_PASSWORD',
        'RESET_PASSWORD',
        'ADV_CLICK',
        'SCREEN_TIME',
        'APP_OPENED',
        'APP_CLOSED',
        'VIDEO_CLICK',
    ];
}
