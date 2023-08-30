<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
//Route::get('/dashboard', 'App\Http\Controllers\AdminController@index');
Route::get('{any?}', 'App\Http\Controllers\AdminController@index');
Route::get('/{any}/{other}', 'App\Http\Controllers\AdminController@index')->where([
    'any' => '^((?!api).)*$',
    //'other' => '[a-z0-9A-Z]+'
]);

Route::get('logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

//Auth routes
Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->middleware(['auth'])->name('verification.notice');


Route::get('/email/verify/{id}/{hash}', 'mailto:authcontroller@verifyemailaddress')->name('verification.verify');
Route::get('/reset-password', function (Request $request){
    $query = $request->getQueryString();
    return redirect('/admin/reset-password?'.$query);
})->name('password.reset');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return back()->with('status', 'verification-link-sent');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');