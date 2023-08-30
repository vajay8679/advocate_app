<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('activities', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('activity_type_id');
            $table->foreign('activity_type_id')->references('id')->on('activity_types')->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');

            $table->ipAddress('ip_address')->default(null);
            $table->string('user_agent')->default(null);
            $table->string('browser_name')->default(null);
            $table->string('browser_family')->default(null);
            $table->string('browser_version')->default(null);
            $table->string('os_name')->default(null);
            $table->string('os_family')->default(null);
            $table->string('os_version')->default(null);
            $table->double('latitude')->nullable()->default(null);
            $table->double('longitude')->nullable()->default(null);
            $table->double('points')->default(null);
            $table->longText('activity_data')->default(null)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('activities');
    }
}
