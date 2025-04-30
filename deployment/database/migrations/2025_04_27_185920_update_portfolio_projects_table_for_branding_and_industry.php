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
        Schema::table('portfolio_projects', function (Blueprint $table) {
            // Add new foreign key columns
            $table->foreignId('branding_id')->nullable()->after('image_alt')->constrained()->nullOnDelete();
            $table->foreignId('industry_id')->nullable()->after('branding_id')->constrained()->nullOnDelete();

            // Keep the old columns for now to migrate data
            $table->renameColumn('branding', 'old_branding');
            $table->renameColumn('industry', 'old_industry');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('portfolio_projects', function (Blueprint $table) {
            // Drop the foreign key constraints
            $table->dropConstrainedForeignId('branding_id');
            $table->dropConstrainedForeignId('industry_id');

            // Restore the original columns
            $table->renameColumn('old_branding', 'branding');
            $table->renameColumn('old_industry', 'industry');
        });
    }
};
