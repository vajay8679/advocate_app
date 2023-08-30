<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    public $timestamps = false;

    public function translationKeys()
    {
        return $this->hasMany(TranslationKey::class, 'language_code', 'iso_code');
    }
}
