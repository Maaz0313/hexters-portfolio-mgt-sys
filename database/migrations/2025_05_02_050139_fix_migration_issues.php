<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Mark problematic migrations as completed
        DB::table('migrations')->insert([
            ['migration' => '2025_04_27_185920_update_portfolio_projects_table_for_branding_and_industry', 'batch' => 9],
            ['migration' => '2025_04_27_add_branding_and_industry_to_portfolio_projects', 'batch' => 9],
            ['migration' => '2025_04_28_remove_fields_from_portfolio_projects', 'batch' => 9],
            ['migration' => '2025_04_28_remove_portfolio_project_tags', 'batch' => 9],
            ['migration' => '2025_05_01_152350_create_portfolio_images_table', 'batch' => 9],
            ['migration' => '2025_05_02_041514_create_role_user_table', 'batch' => 9]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove the entries for the problematic migrations
        DB::table('migrations')
            ->whereIn('migration', [
                '2025_04_27_185920_update_portfolio_projects_table_for_branding_and_industry',
                '2025_04_27_add_branding_and_industry_to_portfolio_projects',
                '2025_04_28_remove_fields_from_portfolio_projects',
                '2025_04_28_remove_portfolio_project_tags',
                '2025_05_01_152350_create_portfolio_images_table',
                '2025_05_02_041514_create_role_user_table'
            ])
            ->delete();
    }
};
