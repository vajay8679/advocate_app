<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Language;
use App\Models\Translation;

class TranslationKey extends Model
{
    public $timestamps = false;

    function translations()
    {
        return $this->hasMany(Translation::class);
    }
}
