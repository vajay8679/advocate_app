<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MediaSection;
class MediaSectionSeeder extends Seeder
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
                'alias' => 'album',
                'name' => 'Album Images',
            ],
            [
                'alias' => 'profile',
                'name' => 'Profile Images',
            ],
            [
                'alias' => 'ckeditor',
                'name' => 'CkEditor',
            ],
            [
                'alias' => 'pages',
                'name' => 'Pages',
            ],
            [
              'alias' => 'blog',
              'name' => 'Blog',
            ],
            [
              'alias' => 'document',
              'name' => 'Document',
            ],
        ];
        MediaSection::insert($data);
    }
}
