<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Status;
use App\Models\User;
use Carbon\Carbon;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Ramsey\Uuid\Uuid;
use DB;
use function GuzzleHttp\Promise\inspect;

class UserSeeder extends Seeder
{
    private $faker;

    private $mId = 3;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker::create();
        $this->createUsers();
    }

    private function createUsers(){
        $date = Carbon::now();

        $roleTable = 'model_has_roles';
        for ($c=1; $c <= 1; $c++) {
          $roleData = [];
          $userList = array();
          for ($i = 1; $i <= 10; $i++) {
            $this->mId = $this->mId + 1;
            echo 'Inserting batch '. $c . 'user '. $this->mId . PHP_EOL;
            $userList[] = array(
              'id' => $this->mId,
              'uuid' => Uuid::uuid4(),
              'first_name' => $this->faker->firstName,
              'last_name' => $this->faker->lastName,
              'email' => $this->faker->unique()->safeEmail,
              'username' => $this->faker->unique()->userName,
              'dob' => $this->faker->date('Y-m-d'),
              'registered_from_ip' => $this->faker->ipv4,
              'referral_code' => Str::random(10),
              'status_id' => Status::ACTIVE,
              'email_verified_at' => now(),
              'password' => Hash::make('password'), // password
              'remember_token' => Str::random(10),
              'gender' => $this->faker->randomElement(User::GENDERS),
              //'referral_count' => 0,
              //'referred_by' => $i-1,
              'created_at' => $date,
              'updated_at' => $date,
            );
            $roleData[] = [
              'role_id' => 3,
              'model_type' => 'App\Models\User',
              'model_id' => $this->mId,
            ];
          }
          User::insert($userList);
          DB::table($roleTable)->insert(
            $roleData
          );
        }
    }
}
