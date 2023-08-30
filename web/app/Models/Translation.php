<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    function translation_key()
    {
        return $this->belongsTo(TranslationKey::class);
    }

    function language()
    {
        //$this->belongsTo(Language::class, 'iso_code', 'language_code');
        return  $this->belongsTo(Language::class, 'language_code', 'iso_code');
    }
}
