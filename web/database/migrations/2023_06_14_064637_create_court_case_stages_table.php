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
    Schema::create('court_case_stages', function (Blueprint $table) {
      $table->id();
      $table->uuid()->unique();
      $table->foreignId('case_id')->references('id')->on('court_cases');
      $table->foreignId('case_stage_id')->references('id')->on('case_stages');
      $table->foreignId('user_login_id')->references('id')->on('users');
      $table->date('order_date')->nullable();
      $table->date('start_date')->nullable();
      $table->date('end_date')->nullable();
      $table->unsignedDouble('amount')->nullable();
      $table->softDeletes();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('court_case_stages');
  }
};
