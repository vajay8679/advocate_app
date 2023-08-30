<?php

namespace Database\Seeders;

use App\Models\CaseStage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CaseStageSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $stages = [
      array(
        'case_type_id' => 1,
        // 'stage_name' => 'Stage 13(A)',
        'stage_name' => 'Stage 13 - 2',
        // 'stage_description' => 'Copy to serve to borrower and get ',
        'stage_description' => 'Copy to serve to borrower and acknowledgment',
        // 'stage_data_type' => 'files',
        'stage_data_type' => 'file1',
      ),
      array(
        'case_type_id' => 1,
        // 'stage_name' => 'Stage 13(B)',
        'stage_name' => 'Stage 13 - 4',
        // 'stage_description' => 'To past at borrower address and take photograph of pasting notice.',
        'stage_description' => 'Symbolic Possession',
        // 'stage_data_type' => 'files',
        'stage_data_type' => 'file2',
      ),
      array(
        'case_type_id' => 1,
        // 'stage_name' => 'DM Application',
        'stage_name' => 'DM Application Under Section 14',
        // 'stage_description' => 'After 13(B) within 1- days DM application file.',
        'stage_description' => 'After 13 - 4 within 1- days DM application file.',
        // 'stage_data_type' => 'files',
        'stage_data_type' => 'file3',
      ),
      array(
        'case_type_id' => 1,
        'stage_name' => 'DM Order',
        'stage_description' => 'After putting DM application DM order will be issues by District Magistrate',
        // 'stage_data_type' => 'date-amount',
        'stage_data_type' => 'file4',

      ),
      array(
        'case_type_id' => 1,
        // 'stage_name' => 'Possesion',
        'stage_name' => 'Physical Possesion',
        'stage_description' => 'After DM order will need to take availability date from Tahsildar for taking physical possession of property.',
        // 'stage_data_type' => 'date-amount',
        'stage_data_type' => 'file5',
      ),
      array(
        'case_type_id' => 2,
        'stage_name' => 'Dawa',
        'stage_description' => 'Description for Dawa Stage',
        'stage_data_type' => 'file6',
      ),
      array(
        'case_type_id' => 2,
        'stage_name' => 'Kathan',
        'stage_description' => 'Description for Kathan Stage',
        'stage_data_type' => 'file7',
      ),
      array(
        'case_type_id' => 2,
        'stage_name' => 'Notice',
        'stage_description' => 'Description for Notice Stage',
        'stage_data_type' => 'file8',
      ),
      array(
        'case_type_id' => 2,
        'stage_name' => 'WS',
        'stage_description' => 'Description for WS Stage',
        'stage_data_type' => 'file9',

      ),
      array(
        'case_type_id' => 2,
        'stage_name' => 'Evidence',
        'stage_description' => 'Description for Evidence Stage',
        'stage_data_type' => 'file10',
      ),
      array(
        'case_type_id' => 2,
        'stage_name' => '6-17',
        'stage_description' => 'Description for 6-17 Stage',
        'stage_data_type' => 'file11',
      ),
      array(
        'case_type_id' => 2,
        'stage_name' => 'Questions',
        'stage_description' => 'Description for Questions Stage',
        'stage_data_type' => 'file12',
      ),
      array(
        'case_type_id' => 2,
        'stage_name' => 'Dispose',
        'stage_description' => 'Description for Dispose Stage',
        'stage_data_type' => 'file13',
      )
    ];
    CaseStage::insert($stages);
  }
}