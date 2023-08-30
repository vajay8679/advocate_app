<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\Status;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class AnnounceMentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->faker = Faker::create();
        $data = [];
        for ($count = 0; $count < 5; $count++){
            $data[] = [
                'uuid' => Uuid::uuid4(),
                'title' => $this->faker->text(50),
                //'description' => $this->faker->text(300),
                'description' => $this->faker->randomHtml(),
                'status_id'=>$this->faker->randomElement([Status::ACTIVE,Status::IN_ACTIVE]),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        Announcement::insert($data);
    }
}
