<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSupportTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('support_tickets', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->string('subject')->nullable()->default(null);
            $table->longText('description')->nullable()->default(null);
            $table->text('tags')->nullable()->default(null);
            //$table->string('priority')->nullable()->default(null);
            $table->unsignedBigInteger('assigned_to')->nullable()->default(null);
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('status_id')->default(\App\Models\Status::NEW);
            $table->foreign('status_id')->references('id')->on('statuses');
            $table->dateTime('due_date')->nullable()->default(null);
            $table->enum('type', ['contact', 'support'])->default('support');
            $table->enum('priority', ['medium', 'low', 'high'])->default('medium');
            $table->text('contact_attributes')->nullable()->default(null);
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
        Schema::dropIfExists('support_tickets');
    }
}
