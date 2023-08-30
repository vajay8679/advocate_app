<?php

namespace Database\Seeders;

use App\Models\FileType;
use Illuminate\Database\Seeder;

class FileTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'file_type_name' => 'image'
            ],
            [
                'id' => 2,
                'file_type_name' => 'video'
            ],
            [
                'id' => 3,
                'file_type_name' => 'document'
            ],
            [
                'id' => 4,
                'file_type_name' => 'youtube'
            ],
            [
                'id' => 5,
                'file_type_name' => 'vimeo'
            ]
        ];
        FileType::insert($data);
    }
}
