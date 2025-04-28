<?php

namespace Database\Seeders;

use App\Models\PortfolioProject;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PortfolioProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::where('is_admin', true)->first();

        if (!$admin) {
            $admin = User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
                'is_admin' => true,
            ]);
        }

        $projects = [
            [
                'title' => 'E-commerce Website Redesign',
                'description' => 'A complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
                'branding' => 'Modern Minimalist',
                'industry' => 'Retail',
                'is_featured' => true,
            ],
            [
                'title' => 'Corporate Identity Package',
                'description' => 'Development of a comprehensive brand identity including logo, business cards, letterhead, and digital assets.',
                'branding' => 'Corporate Professional',
                'industry' => 'Finance',
                'is_featured' => true,
            ],
            [
                'title' => 'Mobile App UI/UX Design',
                'description' => 'Design of a user-friendly mobile application interface with focus on accessibility and intuitive navigation.',
                'branding' => 'Tech Forward',
                'industry' => 'Technology',
                'is_featured' => false,
            ],
            [
                'title' => 'Restaurant Branding',
                'description' => 'Complete branding package for a new upscale restaurant, including logo, menu design, and interior signage.',
                'branding' => 'Elegant Luxury',
                'industry' => 'Food & Beverage',
                'is_featured' => true,
            ],
            [
                'title' => 'Healthcare Provider Website',
                'description' => 'Development of a responsive website for a healthcare provider with patient portal integration.',
                'branding' => 'Clean Professional',
                'industry' => 'Healthcare',
                'is_featured' => false,
            ],
            [
                'title' => 'Product Packaging Design',
                'description' => 'Design of eye-catching packaging for a consumer product line with focus on shelf appeal and brand recognition.',
                'branding' => 'Bold Colorful',
                'industry' => 'Consumer Goods',
                'is_featured' => false,
            ],
            [
                'title' => 'Real Estate Marketing Campaign',
                'description' => 'Development of a comprehensive marketing campaign for a luxury real estate development.',
                'branding' => 'Luxury Upscale',
                'industry' => 'Real Estate',
                'is_featured' => true,
            ],
            [
                'title' => 'Educational Platform UI Design',
                'description' => 'User interface design for an online learning platform with focus on engagement and ease of use.',
                'branding' => 'Friendly Accessible',
                'industry' => 'Education',
                'is_featured' => false,
            ],
        ];

        foreach ($projects as $project) {
            PortfolioProject::create([
                'user_id' => $admin->id,
                'title' => $project['title'],
                'slug' => Str::slug($project['title']),
                'description' => $project['description'],
                'image' => null, // No image for now
                'image_alt' => $project['title'],
                'branding' => $project['branding'],
                'industry' => $project['industry'],
                'completion_date' => now()->subDays(rand(1, 365)),
                'is_featured' => $project['is_featured'],
                'is_published' => true,
            ]);
        }
    }
}
