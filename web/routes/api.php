<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});


//Route::get('translation/{lang?}', 'Api\Admin\TranslationController@getTranslations');
//Route::get('page/{slug?}', 'Api\PageController@show');//->where('slug', '*');

Route::prefix('auth')
  ->namespace('App\Http\Controllers')
  ->group(function () {
    Route::post('/signin', [\App\Http\Controllers\Api\Auth\LoginController::class, 'index']);
    Route::post('/signup', [\App\Http\Controllers\Api\Auth\SignupController::class]);

    Route::post('/forgot-password/link', 'Api\Auth\ForgotPasswordController@sendPasswordResetLinkEmail');
    Route::post('/forgot-password/otp', 'Api\Auth\ForgotPasswordController@sendPasswordResetOtpEmail');
    Route::post('/reset-password/email', 'Api\Auth\ResetPasswordController@resetPasswordEmail');
    Route::post('/reset-password/otp', 'Api\Auth\ResetPasswordController@resetPasswordOtp');

    Route::post('/verify-otp', 'Api\Auth\OtpController@verify');
    Route::post('/resend-otp', 'Api\Auth\OtpController@resend');

    Route::post('/social-login/{provider}', 'Api\Auth\SocialAuthController@handleProviderLogin')->where('provider', '.*');

    Route::get('/social-login/{provider}/redirect', 'Api\Auth\SocialAuthController@redirectToLogin')->where('provider', '.*');
    Route::get('/social-login/{provider}/callback', 'Api\Auth\SocialAuthController@handleProviderCallback')->where('provider', '.*');
  });


Route::middleware('auth:sanctum')
  ->namespace('App\Http\Controllers')
  ->prefix('admin')
  ->group(function () {
    /**
     * Dashboard stats & Analytics
     */
    Route::get('analytics/summary', 'Api\Admin\AnalyticsController@summary');
    Route::get('analytics/device-usage', 'Api\Admin\AnalyticsController@deviceUsage');
    Route::get('analytics/registration', 'Api\Admin\AnalyticsController@userRegistration');
    Route::get('analytics/mobile-login', 'Api\Admin\AnalyticsController@userMobileLogin');
    Route::get('analytics/recent-activities', 'Api\Admin\AnalyticsController@recentActivities');
    Route::get('analytics/user-stats', 'Api\Admin\AnalyticsController@userStats');
    Route::get('analytics/token-stats', 'Api\Admin\AnalyticsController@tokenStats');

    /**
     * User management routes
     */
    Route::get('user-referral-list/{user}', 'Api\Admin\UserController@getUserReferrals');
    Route::apiResource('users', 'Api\Admin\UserController');
    Route::get('users-list', 'Api\Admin\UserController@getUserList');

    Route::put('update-user-password/{user}', 'Api\Admin\UserController@updatePassword');
    Route::put('update-user-status/{user}', 'Api\Admin\UserController@changeStatus');
    Route::get('user-contract-history/{user}', 'Api\Admin\UserController@contractHistory');
    Route::post('user-stats/{user}', 'Api\Admin\UserController@getStats');
    Route::post('referral-stats/{user}', 'Api\Admin\UserController@referralStats');

    Route::apiResource('category', 'Api\Admin\CategoryController');
    Route::apiResource('pages', 'Api\Admin\PageController');
    Route::apiResource('bank', 'Api\Admin\BankController');
    Route::apiResource('bank-branch', 'Api\Admin\BankBranchController');
    Route::get('bank-branches', 'Api\Admin\BankBranchController@getBranch');

    Route::get('entity-type', 'Api\EntityTypeController@index');
    Route::apiResource('case-types', 'Api\Admin\CourtCaseTypeController');

    /**
     * Language Routes
     */
//    Route::apiResource('language', 'Api\Admin\LanguageController');
//    Route::apiResource('translations', 'Api\Admin\TranslationController')->only([
//        'index', 'update', 'store'
//    ]);

    /**
     * Authorization routes
     */
    Route::apiResource('roles', 'Api\Admin\RoleController');
    Route::apiResource('permission', 'Api\Admin\PermissionController');
    Route::get('get-role-permissions/{role}', 'Api\Admin\RoleController@getPermissions');
    Route::put('update-role-permissions/{role}', 'Api\Admin\RoleController@updatePermissions');


    /**
     * Media
     */
    Route::apiResource('media', 'Api\Admin\MediaController');

    /**
     * Support Ticket
     */
    Route::get('support-ticket/stats', 'Api\SupportTicketController@stats');
    Route::apiResource('support-ticket', 'Api\SupportTicketController');

    /**
     * Activity api
     */
    Route::apiResource('activity', 'Api\Admin\ActivityController');

    Route::get('get-top-users', 'Api\Admin\UserController@getTopUsers');
  });

Route::middleware('auth:sanctum')->namespace('App\Http\Controllers\Api')->group(function () {
  Route::get('/auth', 'Auth\AuthController@index');

  Route::get('profile/{user?}', 'UserProfileController@show');
  Route::post('profile', 'UserProfileController@update');
  Route::post('change-password', 'UserProfileController@changePassword');
  Route::post('upload', 'UploadController@index');
  Route::post('upload/image', 'UploadController@image');
  Route::post('upload/profile-picture', 'UploadController@profilePicture');
  Route::post('upload/image-data', 'UploadController@base64Image');
  Route::patch('fcm-token', 'UserProfileController@updateToken')->name('fcmToken');

  Route::apiResource('court-case', 'CourtCaseController');
  Route::get('court-case-search', 'CourtCaseController@search');
  Route::apiResource('status-cases', 'StatusController');
  Route::apiResource('dashboard-view', 'DashboardController');
  // Route::get('dashboard-view/{year?}', 'DashboardController@index');

  Route::delete('court-case-file/{fileId}', 'CourtCaseStageController@deleteMedia');
  Route::post('court-case-file', 'CourtCaseStageController@addMedia');
  Route::get('court-case-stage-logs', 'CourtCaseStageController@listStage');
  
})->name('api.');
