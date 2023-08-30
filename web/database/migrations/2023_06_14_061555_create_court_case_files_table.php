<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('court_case_files', function (Blueprint $table) {
      $table->id();
      $table->uuid()->unique();
      $table->foreignId('case_id')->references('id')->on('court_cases');
      $table->foreignId('case_stage_id')->references('id')->on('case_stages');
      $table->foreignId('media_id')->nullable()->references('id')->on('media');
      $table->string('media_url')->nullable();
      $table->string('media_title')->nullable();
      $table->enum('paper_publication', ['yes', 'no'])->nullable()->default(null);
      $table->string('date_of_acknowledgment')->nullable();
      $table->string('due_date')->nullable();
      $table->string('date_of_filling')->nullable();
      $table->string('date_of_dm_order')->nullable();
      $table->string('date_of_physical_possession')->nullable();
      $table->string('date_of_dawa')->nullable();
      $table->string('date_of_kathan')->nullable();
      $table->string('date_of_notice')->nullable();
      $table->string('date_of_ws')->nullable();
      $table->string('date_of_evidence')->nullable();
      $table->string('date_of_six_seventeen')->nullable();
      $table->string('date_of_question')->nullable();
      $table->string('date_of_dispose')->nullable();

      $table->string('case_number')->nullable();
      $table->string('court_name')->nullable();

      $table->softDeletes();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('court_case_files');
  }
};