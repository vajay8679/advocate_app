<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;
use Hash;
use Illuminate\Support\Str;

class AdminSeeder extends Seeder
{
    private $faker;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker::create();
//        dd(get_class_vars(get_class($this->faker)));
        //create user
        $admin = new User();
        $admin->id = 1;
        $admin->uuid = \Ramsey\Uuid\Uuid::uuid4();
        $admin->first_name = $this->faker->firstName;
        $admin->last_name = $this->faker->lastName;
        $admin->email = 'admin@admin.com';
        $admin->username = 'admin';
        $admin->gender = 'male';
        $admin->phone = $this->faker->unique()->phoneNumber;
        $admin->password = Hash::make('admin');
        $admin->status_id = \App\Models\Status::ACTIVE;
        $admin->email_verified_at = now();
        $admin->registered_from_ip = $this->faker->ipv4;
        $admin->referral_code = Str::random(10);
        $admin->save();
        //assign role
        $admin->assignRole('admin');

    }
}
