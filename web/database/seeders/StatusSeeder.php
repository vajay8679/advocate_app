<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statusList = Status::$statusList;
        $data = [];
        foreach ($statusList as $key => $status){
            $data[] = [
                'id' => $key,
                'name' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        /*$data = [
            [
                'id' => Status::ACTIVE,
                'name' => 'active',
            ],
            [
                'id' => Status::IN_ACTIVE,
                'name' => 'inactive',
            ],
            [
                'id' => Status::PENDING,
                'name' => 'pending',
            ],
            [
                'id' => Status::BLOCKED,
                'name' => 'blocked',
            ],
            [
                'id' => Status::PUBLISH,
                'name' => 'published',
            ],
            [
                'id' => Status::UN_PUBLISH,
                'name' => 'un-published',
            ],
            [
                'id' => Status::COMPLETED,
                'name' => 'completed',
            ],
            [
                'id' => Status::IN_PROGRESS,
                'name' => 'in-progress',
            ],
            [
                'id' => Status::NEW,
                'name' => 'new',
            ],
        ];*/
        Status::insert($data);
    }
}
