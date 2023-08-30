<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use App\Models\Language;
use App\Models\TranslationKey;
use App\Models\Translation;
use DB;
class TranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = Language::all();
        $translationKeys = TranslationKey::all();
        $date = Carbon::now()->toDateTimeString();
        foreach ($languages as $language){
            $translations = array();
            foreach ($translationKeys as $translationKey){
                $translations[] = array(
                    'language_code' => $language->iso_code,
                    'translation_key_id' => $translationKey->id,
                    'text' => $translationKey->name,
                    'created_at' => $date,
                    'updated_at' => $date
                );
            }
            DB::table('translations')->insert($translations);
        }
    }
}
