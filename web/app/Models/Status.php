<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    public const ACTIVE = 1;
    public const IN_ACTIVE = 2;
    public const BLOCKED = 3;
    public const PENDING = 4;
    public const COMPLETED = 5;
    public const IN_PROGRESS = 6;
    public const PUBLISH = 7;
    public const UN_PUBLISH = 8;
    public const NEW = 9;

    public static $statusList = [
        1 => 'active',
        2 => 'inactive',
        3 => 'blocked',
        4 => 'pending',
        5 => 'completed',
        6 => 'in-progress',
        7 => 'published',
        8 => 'un-published',
        9 => 'new',
    ];

    public static $statusValList = [
        'active' => 1,
        'inactive'=>  2 ,
        'blocked'=> 3,
        'pending' => 4,
        'completed' => 5,
        'in-progress' => 6,
        'published' => 7,
        'un-published' => 8,
        'new' => 9,
    ];
}
