<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FileType extends Model
{
    /**
     * Get the extensions for the media
     */
    public function extensions()
    {
        return $this->hasMany('App\Models\FileExtension');
    }
}
