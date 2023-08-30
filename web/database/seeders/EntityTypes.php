<?php

namespace Database\Seeders;

use App\Models\EntityType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EntityTypes extends Seeder
{

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      EntityType::insert(EntityType::$entityTypeList);
    }
}
