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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->string('machine_name', '200')->unique()->nullable();
            $table->string('name', '200');
            $table->text('description')->nullable();
            $table->string('entity_type')->nullable();
            $table->foreign('entity_type')->references('entity_type')->on('entity_types');

            $table->unsignedBigInteger('parent_id')->default(null)->nullable();
            $table->foreign('parent_id')->references('id')->on('categories');

            $table->unsignedBigInteger('status_id')->nullable();
            $table->foreign('status_id')->references('id')->on('statuses');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
