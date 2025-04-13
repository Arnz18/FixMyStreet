<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            // For PostGIS support, you'll need to add the extension
            // If you're using MySQL, you can use:
            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);
            // Or if you have PostGIS configured:
            // $table->point('location')->spatialIndex();
            $table->enum('issue_type', ['pothole', 'road_damage', 'drainage', 'other']);
            $table->text('details');
            $table->enum('status', ['reported', 'in_progress', 'resolved'])->default('reported');
            $table->enum('severity', ['low', 'medium', 'high'])->nullable();
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};
