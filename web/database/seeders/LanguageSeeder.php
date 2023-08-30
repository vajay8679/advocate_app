<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('languages')->delete();

        $languages = array(
            array('name' => 'English', 'iso_code'=>'en'),
            array('name' => 'Arabic', 'iso_code'=>'ar'),
            array('name' => 'German', 'iso_code'=>'de'),
            array('name' => 'Spanish', 'iso_code'=>'es'),
            array('name' => 'French', 'iso_code'=>'fr'),
            array('name' => 'Hindi', 'iso_code'=>'hi'),
        );
        DB::table('languages')->insert($languages);
    }
}
