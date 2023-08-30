<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStage extends Model
{
    use HasFactory;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function courtCaseType(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
      return $this->hasOne(CaseType::class, 'id', 'case_type_id');
    }

    public function courtCaseStage(): \Illuminate\Database\Eloquent\Relations\hasOne
    {
      return $this->hasOne(CourtCaseStage::class, 'case_stage_id', 'id');
    }

  public function courtCaseFiles(): \Illuminate\Database\Eloquent\Relations\hasMany
  {
    return $this->hasMany(CourtCaseFile::class, 'case_stage_id', 'id');
  }
}
