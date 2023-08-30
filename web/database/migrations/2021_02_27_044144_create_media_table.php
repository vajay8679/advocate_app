<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');

            $table->unsignedBigInteger('file_extension_id');
            $table->foreign('file_extension_id')->references('id')->on('file_extensions')->onUpdate('cascade');

            $table->unsignedBigInteger('media_section_id');
            $table->foreign('media_section_id')->references('id')->on('media_sections')->onUpdate('cascade');

            $table->unsignedBigInteger('album_id')->nullable()->unsigned();
            $table->foreign('album_id')->references('id')->on('albums');

            $table->unsignedBigInteger('status_id');
            $table->foreign('status_id')->references('id')->on('statuses');

            $table->string('original_name')->default(null);
            $table->string('mime_type', 100)->nullable()->default(null);
            $table->string('file_name')->default(null);
            $table->string('file_path')->default(null);
            $table->double('file_size')->default(null);

            $table->string('title')->nullable();
            $table->text('description')->default(null)->nullable();
            $table->text('hash_tags')->default(null)->nullable();

            $table->bigInteger('like_count')->default(0);
            $table->bigInteger('comment_count')->default(0);
            $table->bigInteger('favourite_count')->default(0);
            $table->bigInteger('views_count')->default(0);
            $table->bigInteger('share_count')->default(0);
            $table->unsignedTinyInteger('allow_comment')->default(1);
            $table->unsignedTinyInteger('allow_like')->default(1);

            $table->nullableMorphs('entity');

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
        Schema::dropIfExists('media');
    }
}
