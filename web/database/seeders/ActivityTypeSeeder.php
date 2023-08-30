<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use DB;

class ActivityTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('activity_types')->delete();
        $date = Carbon::now()->toDateTimeString();
        $activity_types = array(
            array('id' => 1, 'name' => 'login', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 2, 'name' => 'mobile_login', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 3, 'name' => 'social_login', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 4, 'name' => 'signup', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 5, 'name' => 'social_signup', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 6, 'name' => 'forgot_password', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 7, 'name' => 'reset_password', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 8, 'name' => 'adv_click', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 9, 'name' => 'screen_time', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 10, 'name' => 'app_open', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 11, 'name' => 'app_close', 'created_at' => $date, 'updated_at' => $date),
            array('id' => 12, 'name' => 'video_click', 'created_at' => $date, 'updated_at' => $date),
        );
        DB::table('activity_types')->insert($activity_types);
    }
}
