<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable()->unique();
            $table->string('username')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable()->default(null);
            $table->date('dob')->nullable();
            $table->enum('gender', ['male', 'female', 'others'])->nullable()->default(null);
            $table->string('profile_image')->nullable();
            $table->string('profile_cover')->nullable();
            $table->longText('bio')->nullable();
            $table->ipAddress('registered_from_ip')->nullable();

            $table->unsignedBigInteger('status_id');
            $table->foreign('status_id')->references('id')->on('statuses');
            $table->string('status_reason')->nullable();

            //$table->string('fb_username')->nullable();
            //$table->string('twitter_username')->nullable();
            //$table->string('instagram_username')->nullable();
            //$table->string('linkedin_username')->nullable();
            // $table->string('skype_username')->nullable();
            // $table->string('github_username')->nullable();

            $table->string('referral_code')->nullable()->unique();
            $table->unsignedBigInteger('referred_by')->nullable()->default(null);
            $table->foreign('referred_by')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');

            $table->integer('referral_count')->default(0);
            $table->string('device_type')->default(null)->nullable();
            $table->text('device_token')->default(null)->nullable();

            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();



            $table->index('first_name');
            $table->index('last_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
