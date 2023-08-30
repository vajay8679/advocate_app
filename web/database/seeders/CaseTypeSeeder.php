<?php

namespace Database\Seeders;

use App\Models\CaseType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CaseTypeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    CaseType::insert([
      ['id' => 1, 'case_type' => 'Bank Recovery'],
      ['id' => 2, 'case_type' => 'Motor Insurance']
    ]);
  }
}
