<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use DB;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('site_settings')->delete();
        $date = Carbon::now()->toDateTimeString();
        $activity_types = array(
            array('id' => 1, 'name' => 'available_coin', 'display_name' => 'Available Coin', 'setting_val'=> '500', 'created_at' => $date, 'updated_at' => $date),
        );
        DB::table('site_settings')->insert($activity_types);
    }
}
