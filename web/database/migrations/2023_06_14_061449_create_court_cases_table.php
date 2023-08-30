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
        Schema::create('court_cases', function (Blueprint $table) {
            $table->id();
            $table->uuid()->unique();
            $table->string('title');
            $table->foreignId('case_type_id')->references('id')->on('case_types');
            $table->string('case_stage')->nullable();

            #fields for Motor Insurance
            $table->string('death')->nullable();
            $table->string('injury')->nullable();
            $table->string('insurance_company')->nullable();
            $table->string('vehicle_number')->nullable();
            $table->string('vehicle_owner')->nullable();
            $table->string('vehicle_driver')->nullable();
            $table->string('fir_number')->nullable();
            $table->string('thana')->nullable();
            $table->string('fir_delay')->nullable();
            $table->foreignId('status_id')->nullable()->references('id')->on('statuses');
            $table->string('cnr')->nullable();
            $table->string('filling_number')->nullable();
            $table->string('macc_number')->nullable();
            $table->string('court_name')->nullable();
            $table->string('date_of_filling')->nullable();
            $table->string('next_date')->nullable();
            $table->string('company_advocate')->nullable();
            $table->string('challan')->nullable();
            $table->string('remark')->nullable();
            $table->string('company_file_number')->nullable();
            $table->string('investigation')->nullable();
            $table->string('office_file_number')->nullable();
            $table->string('date_of_disposal')->nullable();

            #fields for Bank Recovery
            $table->date('allotted_date')->nullable();
            $table->foreignId('bank_id')->nullable()->references('id')->on('banks');
            $table->foreignId('bank_branch_id')->nullable()->references('id')->on('bank_branches');
            $table->string('loan_account_number')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('customer_address')->nullable();
            $table->string('symbolic_account')->nullable();
            $table->foreignId('assignee_id')->nullable()->references('id')->on('users');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('court_cases');
    }
};
