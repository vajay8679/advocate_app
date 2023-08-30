<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use DB;

class TranslationKeySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = resource_path('lang/data.json');
        if (file_exists($file)) {
            $data = file_get_contents($file);
            $data = json_decode($data, true);

            $dataToFeed = array();
            $date = Carbon::now()->toDateTimeString();
            foreach ($data as $key => $nake) {
                $dataToFeed[] = array('name' => $nake, 'key' => $key, 'created_at' => $date, 'updated_at' => $date);
            }
            DB::table('translation_keys')->insert($dataToFeed);
        }
    }
}
