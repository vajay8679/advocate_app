<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MediaSection extends Model
{
    public $timestamps = false;
    public static $sectionList = array(
        1 => 'album',
        2 => 'profile',
        3 => 'profile-banner',
        4 => 'wall',
        5 => 'category',
    );
}
