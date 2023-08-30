<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourtCaseAttributes extends Model
{
    use HasFactory, SoftDeletes;

  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function courtCaseType()
  {
    return $this->hasOne(CourtCase::class, 'id', 'case_type_id');
  }
}
