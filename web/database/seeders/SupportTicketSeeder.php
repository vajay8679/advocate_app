<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\SupportTicket;
use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Ramsey\Uuid\Uuid;

class SupportTicketSeeder extends Seeder
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
        $data = [];
        for ($count = 0; $count < 50; $count++){
            $data[] = [
                'uuid' => Uuid::uuid4(),
                'subject' => $this->faker->text(50),
                'description' => $this->faker->text(300),
                'type' => 'support',
                'status_id'=>$this->faker->randomElement([Status::NEW,Status::PENDING,Status::COMPLETED]),
                //'type'=>$this->faker->randomElement(['contact', 'support']),
                'priority'=>$this->faker->randomElement(['medium', 'low', 'high']),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        SupportTicket::insert($data);
    }
}
