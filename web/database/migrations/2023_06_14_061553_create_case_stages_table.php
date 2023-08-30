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
        Schema::create('case_stages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('case_type_id')->references('id')->on('case_types');
            $table->string('stage_name');
            $table->text('stage_description')->nullable();
            // $table->enum('stage_data_type', ['files', 'dates', 'text', 'date-amount'])->nullable();
            $table->enum('stage_data_type', ['file1', 'file2', 'file3', 'file4', 'file5','file6', 'file7', 'file8', 'file9', 'file10','file11', 'file12', 'file13'])->nullable();


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
