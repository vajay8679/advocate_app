<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileExtension extends Model
{
    public $timestamps = false;

    /**
     * Get the post that owns the comment.
     */
    public function mediaType()
    {
        return $this->belongsTo(FileType::class, 'file_type_id', 'id');
    }
}
