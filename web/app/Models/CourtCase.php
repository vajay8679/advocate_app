<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
class CourtCase extends Model
{
    use HasFactory, SoftDeletes;

  /**
   * @return \Illuminate\Database\Eloquent\Relations\HasOne
   */
  public function courtCaseType(): \Illuminate\Database\Eloquent\Relations\HasOne
  {
    return $this->hasOne(CaseType::class, 'id', 'case_type_id');
  }

  public function courtCaseStage(): \Illuminate\Database\Eloquent\Relations\hasMany
  {
    return $this->hasMany(CourtCaseStage::class, 'case_id', 'id');
  }

  public function courtCaseFiles(): \Illuminate\Database\Eloquent\Relations\hasMany
  {
    return $this->hasMany(CourtCaseFile::class, 'case_id', 'id');
  }

  public function bank()
  {
    return $this->hasOne(Bank::class, 'id', 'bank_id');
  }

  public function status()
  {
    return $this->hasOne(Status::class, 'id', 'status_id');
  }

  public function users()
  {
    return $this->hasOne(User::class, 'id', 'assignee_id');
  }

  public function bankBranch()
  {
    return $this->hasOne(BankBranch::class, 'id', 'bank_branch_id');
  }

  public function getRouteKey()
  {
    return 'uuid';
  }

  /**
   * Interact with the user's first name.
   */
  // protected function allottedDate(): Attribute
  // {
  //   return Attribute::make(
  //     get: fn (string $value) => date('Y-m-d', strtotime($value)),
  //     set: fn (string $value) => date('Y-m-d', strtotime($value)),
  //   );
  // }

  protected function allottedDate(): Attribute
  {
      return Attribute::make(
          get: fn (?string $value) => $value ? date('Y-m-d', strtotime($value)) : null,
          set: fn (?string $value) => $value ? date('Y-m-d', strtotime($value)) : null,
      );
  }
}
