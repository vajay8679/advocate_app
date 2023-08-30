<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Permission as MasterPermission;

class Permission extends MasterPermission
{
    use HasFactory;
}
