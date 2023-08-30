<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = Role::create(['name' => 'admin', 'id' => 1]);
        $admin = Role::create(['name' => 'editor', 'id' => 2]);
        $user = Role::create(['name' => 'user', 'id' => 3]);
    }
}
