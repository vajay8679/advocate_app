<?php

namespace Database\Seeders;

use App\Models\FileExtension;
use App\Models\FileType;
use Illuminate\Database\Seeder;

class FileExtensionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //seed for image extenstion
        $mediaType = FileType::where('file_type_name', 'image')->first();
        FileExtension::create([
            'file_ext_name' => 'bmp',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'gif',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'jpeg',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'jpg',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'png',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'svg',
            'file_type_id' => $mediaType->id,
        ]);

        //seed for video extenstion
        $mediaType = FileType::where('file_type_name', 'video')->first();
        FileExtension::create([
            'file_ext_name' => '3gp',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'asf',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'avi',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'flv',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'mov',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'mp4',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'mpeg',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'mpg',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'swf',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'webm',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'wmv',
            'file_type_id' => $mediaType->id,
        ]);

        //seed for document extenstion
        $mediaType = FileType::where('file_type_name', 'document')->first();
        FileExtension::create([
            'file_ext_name' => 'csv',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'doc',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'docm',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'docx',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'm4a',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'm4p',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'mmf',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'mp3',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'odp',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'ods',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'odt',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'pdf',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'pps',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'ppsx',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'ppt',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'pptx',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'rtf',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'txt',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'wav',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'wma',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'xls',
            'file_type_id' => $mediaType->id,
        ]);
        FileExtension::create([
            'file_ext_name' => 'xlsx',
            'file_type_id' => $mediaType->id,
        ]);

        //seed for youtube extenstion
        $mediaType = FileType::where('file_type_name', 'youtube')->first();
        FileExtension::create([
            'file_ext_name' => 'youtube',
            'file_type_id' => $mediaType->id,
        ]);

        //seed for vimeo extenstion
        $mediaType = FileType::where('file_type_name', 'vimeo')->first();
        FileExtension::create([
            'file_ext_name' => 'vimeo',
            'file_type_id' => $mediaType->id,
        ]);
    }
}
