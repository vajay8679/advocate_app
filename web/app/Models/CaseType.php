<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseType extends Model
{
    use HasFactory;

    public function stages() {
      return $this->hasMany(CaseStage::class, 'case_type_id', 'id');
    }
}
