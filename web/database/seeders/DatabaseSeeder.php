<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(EntityTypes::class);
        $this->call(StatusSeeder::class);
        $this->call(ActivityTypeSeeder::class);
        $this->call(ReserverUsernameSeeder::class);
        $this->call(CountriesTableSeeder::class);
        $this->call(StatesTableSeeder::class);
        $this->call(CitiesTableSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(FileTypeSeeder::class);
        $this->call(FileExtensionSeeder::class);
        $this->call(MediaSectionSeeder::class);

        $this->call(CaseTypeSeeder::class);
        $this->call(CaseStageSeeder::class);

        $this->call(LanguageSeeder::class);
        $this->call(TranslationKeySeeder::class);
        $this->call(TranslationSeeder::class);
        $this->call(SettingSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(UserSeeder::class);
        // User::factory(50)->create();

        $this->call(SupportTicketSeeder::class);
    }
}
