<?php

namespace Database\Seeders;

use App\Models\Branding;
use App\Models\Industry;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BrandingAndIndustrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample Brandings
        $brandings = [
            'Minimalist' => 'Clean, simple designs with minimal elements and neutral colors.',
            'Corporate' => 'Professional designs that convey trust and authority.',
            'Playful' => 'Fun, colorful designs with creative elements.',
            'Luxury' => 'Elegant, high-end designs with premium aesthetics.',
            'Vintage' => 'Retro-inspired designs with nostalgic elements.',
            'Modern' => 'Contemporary designs with cutting-edge aesthetics.',
            'Eco-friendly' => 'Sustainable designs with natural elements and colors.',
            'Tech-focused' => 'Innovative designs with futuristic elements.',
            'Handcrafted' => 'Artisanal designs with personal touches.',
            'Bold' => 'Strong, impactful designs with high contrast.',
        ];

        foreach ($brandings as $name => $description) {
            Branding::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'description' => $description,
            ]);
        }

        // Sample Industries
        $industries = [
            'Technology' => 'Software, hardware, IT services, and digital solutions.',
            'Healthcare' => 'Medical services, pharmaceuticals, and wellness products.',
            'Finance' => 'Banking, insurance, investments, and financial services.',
            'Education' => 'Schools, universities, e-learning, and educational resources.',
            'Retail' => 'E-commerce, brick-and-mortar stores, and consumer goods.',
            'Food & Beverage' => 'Restaurants, cafes, food products, and catering services.',
            'Real Estate' => 'Property development, sales, rentals, and management.',
            'Entertainment' => 'Media, gaming, events, and recreational activities.',
            'Travel & Hospitality' => 'Hotels, tourism, transportation, and travel services.',
            'Manufacturing' => 'Production of goods, industrial equipment, and materials.',
            'Non-profit' => 'Charitable organizations, foundations, and social causes.',
            'Professional Services' => 'Consulting, legal, accounting, and business services.',
        ];

        foreach ($industries as $name => $description) {
            Industry::create([
                'name' => $name,
                'slug' => Str::slug($name),
                'description' => $description,
            ]);
        }
    }
}
