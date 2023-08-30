<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role as MasterRole;

class Role extends MasterRole
{
    use HasFactory;

    protected $hidden = ['pivot'];
}
