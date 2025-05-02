<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Privacy Policy page
        Page::create([
            'title' => 'Privacy Policy',
            'slug' => 'privacy-policy',
            'content' => '<p>
                At Hexters, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">1. Information We Collect</h2>
            <p>
                We may collect personal information such as your name, email address, phone number, and company name when you contact us or use our services.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">2. How We Use Your Information</h2>
            <p>
                We use your information to provide and improve our services, communicate with you, and comply with legal obligations.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">3. Information Sharing</h2>
            <p>
                We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to provide our services.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">4. Data Security</h2>
            <p>
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">5. Cookies</h2>
            <p>
                We use cookies to enhance your experience on our website. You can choose to disable cookies in your browser settings.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">6. Third-Party Links</h2>
            <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">7. Changes to This Privacy Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">8. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at hexters2010@gmail.com.
            </p>',
            'meta_title' => 'Privacy Policy | Hexters',
            'meta_description' => 'Learn about how Hexters collects, uses, and protects your personal information.',
            'is_published' => true,
        ]);

        // Create Terms of Service page
        Page::create([
            'title' => 'Terms of Service',
            'slug' => 'terms-of-service',
            'content' => '<p>
                Welcome to Hexters. By accessing our website, you agree to be bound by these Terms of Service.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">2. Use License</h2>
            <p>
                Permission is granted to temporarily download one copy of the materials on Hexters\'s website for personal, non-commercial transitory viewing only.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">3. Disclaimer</h2>
            <p>
                The materials on Hexters\'s website are provided on an \'as is\' basis. Hexters makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">4. Limitations</h2>
            <p>
                In no event shall Hexters or its suppliers be liable for any damages arising out of the use or inability to use the materials on Hexters\'s website.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">5. Revisions</h2>
            <p>
                The materials appearing on Hexters\'s website could include technical, typographical, or photographic errors. Hexters does not warrant that any of the materials on its website are accurate, complete or current.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">6. Links</h2>
            <p>
                Hexters has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.
            </p>

            <h2 class="text-2xl font-semibold text-primary mt-8 mb-4">7. Governing Law</h2>
            <p>
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>',
            'meta_title' => 'Terms of Service | Hexters',
            'meta_description' => 'Read the terms and conditions for using Hexters services and website.',
            'is_published' => true,
        ]);
    }
}
