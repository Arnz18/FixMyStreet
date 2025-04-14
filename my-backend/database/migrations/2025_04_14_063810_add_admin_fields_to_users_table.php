<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
            $table->string('employee_id')->nullable();
            $table->string('department_code')->nullable();
            $table->string('government_id')->nullable();
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'is_admin', 
                'employee_id', 
                'department_code', 
                'government_id',
                'phone',
                'date_of_birth'
            ]);
        });
    }
};
