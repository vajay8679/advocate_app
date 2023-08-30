<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('court_case_attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_type_id')->references('id')->on('court_cases');
            $table->string('attribute_name');
            $table->string('attribute_value');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('court_case_attributes');
    }
};
