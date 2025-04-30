<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
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

        // Create blog categories if they don't exist
        $categories = [
            ['name' => 'Technology', 'type' => 'blog'],
            ['name' => 'Design', 'type' => 'blog'],
            ['name' => 'Business', 'type' => 'blog'],
            ['name' => 'Marketing', 'type' => 'blog'],
            ['name' => 'Development', 'type' => 'blog'],
        ];

        $categoryIds = [];
        foreach ($categories as $categoryData) {
            $category = Category::firstOrCreate(
                ['name' => $categoryData['name'], 'type' => $categoryData['type']],
                ['slug' => Str::slug($categoryData['name'])]
            );
            $categoryIds[] = $category->id;
        }

        // Create tags if they don't exist
        $tags = [
            'Laravel', 'React', 'PHP', 'JavaScript', 'CSS', 'HTML', 
            'UX', 'UI', 'Design', 'Web Development', 'Mobile', 'API',
            'Database', 'SEO', 'Performance', 'Security', 'Testing'
        ];

        $tagIds = [];
        foreach ($tags as $tagName) {
            $tag = Tag::firstOrCreate(
                ['name' => $tagName],
                ['slug' => Str::slug($tagName)]
            );
            $tagIds[] = $tag->id;
        }

        // Create blog posts
        $posts = [
            [
                'title' => 'Getting Started with Laravel and React',
                'excerpt' => 'Learn how to set up a new project with Laravel and React using Inertia.js for a seamless single-page application experience.',
                'content' => '<p>Laravel and React are two powerful technologies that, when combined, can create amazing web applications. In this tutorial, we\'ll walk through setting up a new project with Laravel as the backend and React as the frontend, using Inertia.js to bridge the gap.</p>
                <h2>Prerequisites</h2>
                <ul>
                    <li>PHP 8.1 or higher</li>
                    <li>Composer</li>
                    <li>Node.js and npm</li>
                </ul>
                <h2>Step 1: Create a new Laravel project</h2>
                <p>First, let\'s create a new Laravel project using Composer:</p>
                <pre><code>composer create-project laravel/laravel laravel-react-app</code></pre>
                <p>This will create a new Laravel project in the laravel-react-app directory.</p>
                <h2>Step 2: Install Inertia.js</h2>
                <p>Next, let\'s install Inertia.js, which will allow us to build a single-page application without the complexity of a traditional SPA:</p>
                <pre><code>composer require inertiajs/inertia-laravel</code></pre>
                <p>Then, we need to install the frontend dependencies:</p>
                <pre><code>npm install @inertiajs/react @inertiajs/inertia-react</code></pre>
                <h2>Step 3: Set up React</h2>
                <p>Now, let\'s set up React as our frontend framework:</p>
                <pre><code>npm install react react-dom</code></pre>
                <p>And that\'s it! You now have a basic Laravel and React application set up with Inertia.js. You can start building your application by creating routes, controllers, and React components.</p>',
                'category_id' => $categoryIds[4], // Development
                'tags' => [0, 1, 2, 3], // Laravel, React, PHP, JavaScript
            ],
            [
                'title' => 'Designing User-Friendly Interfaces',
                'excerpt' => 'Explore the principles of user interface design that lead to better user experiences and more successful products.',
                'content' => '<p>Good user interface design is crucial for creating successful digital products. In this article, we\'ll explore some key principles that can help you design more user-friendly interfaces.</p>
                <h2>1. Clarity is Key</h2>
                <p>Your interface should clearly communicate its purpose and how users can interact with it. Avoid ambiguity and make sure users can easily understand what each element does.</p>
                <h2>2. Consistency Matters</h2>
                <p>Consistent interfaces are easier to learn and use. Use consistent patterns, colors, and terminology throughout your application to reduce cognitive load on users.</p>
                <h2>3. Provide Feedback</h2>
                <p>Users should always know what\'s happening in your application. Provide clear feedback for all actions, whether they\'re successful or not.</p>
                <h2>4. Respect User Control</h2>
                <p>Users should feel in control of the interface. Avoid forcing users down specific paths and provide clear ways to undo actions.</p>
                <h2>5. Accessibility is Not Optional</h2>
                <p>Design your interfaces to be accessible to all users, including those with disabilities. This includes proper contrast, keyboard navigation, and screen reader support.</p>
                <p>By following these principles, you can create interfaces that are not only visually appealing but also functional and user-friendly.</p>',
                'category_id' => $categoryIds[1], // Design
                'tags' => [8, 6, 7], // Design, UX, UI
            ],
            [
                'title' => 'Optimizing Website Performance',
                'excerpt' => 'Learn practical techniques to improve your website\'s loading speed and overall performance for better user experience and SEO rankings.',
                'content' => '<p>Website performance is a critical factor in user experience and search engine rankings. In this guide, we\'ll cover practical techniques to optimize your website\'s performance.</p>
                <h2>Image Optimization</h2>
                <p>Images often account for most of the downloaded bytes on a webpage. Optimize your images by:</p>
                <ul>
                    <li>Using appropriate formats (JPEG for photographs, PNG for graphics with transparency, WebP for modern browsers)</li>
                    <li>Compressing images without significant quality loss</li>
                    <li>Implementing lazy loading for images below the fold</li>
                </ul>
                <h2>Minimize HTTP Requests</h2>
                <p>Each file on your website requires an HTTP request. Reduce these by:</p>
                <ul>
                    <li>Combining multiple CSS files into one</li>
                    <li>Combining multiple JavaScript files into one</li>
                    <li>Using CSS sprites for small, recurring images</li>
                </ul>
                <h2>Enable Caching</h2>
                <p>Leverage browser caching to store commonly used files on the user\'s device:</p>
                <ul>
                    <li>Set appropriate cache headers for static resources</li>
                    <li>Use a content delivery network (CDN) for globally distributed caching</li>
                </ul>
                <h2>Optimize Code</h2>
                <p>Clean, efficient code leads to faster websites:</p>
                <ul>
                    <li>Minify CSS, JavaScript, and HTML</li>
                    <li>Remove unused code and unnecessary comments</li>
                    <li>Use asynchronous loading for non-critical JavaScript</li>
                </ul>
                <p>Implementing these optimizations can significantly improve your website\'s loading speed, providing a better user experience and potentially improving your search engine rankings.</p>',
                'category_id' => $categoryIds[4], // Development
                'tags' => [14, 13], // Performance, SEO
            ],
            [
                'title' => 'The Future of Web Development: Trends to Watch',
                'excerpt' => 'Explore emerging technologies and methodologies that are shaping the future of web development and how you can prepare for them.',
                'content' => '<p>The web development landscape is constantly evolving. Staying ahead of trends is crucial for developers who want to remain competitive. Here are some key trends that are shaping the future of web development.</p>
                <h2>Progressive Web Apps (PWAs)</h2>
                <p>PWAs combine the best of web and mobile apps, offering offline capabilities, push notifications, and app-like interfaces. As mobile usage continues to grow, PWAs will become increasingly important for delivering great user experiences across devices.</p>
                <h2>Serverless Architecture</h2>
                <p>Serverless computing allows developers to build and run applications without thinking about servers. This approach can reduce operational costs and complexity while improving scalability.</p>
                <h2>AI and Machine Learning Integration</h2>
                <p>AI-powered features are becoming more accessible to web developers. From chatbots to personalized content recommendations, AI integration will continue to enhance web applications.</p>
                <h2>WebAssembly</h2>
                <p>WebAssembly (Wasm) allows code written in languages like C, C++, and Rust to run in the browser at near-native speed. This opens up new possibilities for web applications, particularly for performance-intensive tasks like gaming and video editing.</p>
                <h2>API-First Development</h2>
                <p>With the proliferation of devices and platforms, API-first development is becoming the standard approach. This methodology prioritizes building robust APIs that can serve multiple clients, from web to mobile to IoT devices.</p>
                <p>By keeping an eye on these trends and continuously learning, web developers can position themselves for success in an ever-changing technological landscape.</p>',
                'category_id' => $categoryIds[0], // Technology
                'tags' => [9, 11], // Web Development, API
            ],
            [
                'title' => 'Effective Content Marketing Strategies',
                'excerpt' => 'Discover proven content marketing strategies that can help your business attract and engage your target audience.',
                'content' => '<p>Content marketing is a powerful way to build brand awareness, establish authority, and drive conversions. Here are some effective strategies to enhance your content marketing efforts.</p>
                <h2>Know Your Audience</h2>
                <p>Understanding your target audience is the foundation of effective content marketing. Develop detailed buyer personas that include:</p>
                <ul>
                    <li>Demographics (age, location, job title)</li>
                    <li>Pain points and challenges</li>
                    <li>Goals and motivations</li>
                    <li>Preferred content formats and channels</li>
                </ul>
                <h2>Create a Content Calendar</h2>
                <p>A content calendar helps you plan and organize your content production. It should include:</p>
                <ul>
                    <li>Publication dates</li>
                    <li>Content topics and formats</li>
                    <li>Target keywords</li>
                    <li>Distribution channels</li>
                </ul>
                <h2>Focus on Quality Over Quantity</h2>
                <p>It\'s better to publish fewer pieces of high-quality content than to flood your channels with mediocre material. High-quality content:</p>
                <ul>
                    <li>Provides genuine value to your audience</li>
                    <li>Is well-researched and accurate</li>
                    <li>Is well-written and free of errors</li>
                    <li>Includes relevant visuals and examples</li>
                </ul>
                <h2>Repurpose Your Content</h2>
                <p>Get more mileage out of your content by repurposing it into different formats:</p>
                <ul>
                    <li>Turn blog posts into infographics or videos</li>
                    <li>Compile related blog posts into an ebook</li>
                    <li>Extract quotes for social media posts</li>
                    <li>Transform webinars into blog posts or podcasts</li>
                </ul>
                <p>By implementing these strategies consistently, you can create a content marketing program that effectively attracts, engages, and converts your target audience.</p>',
                'category_id' => $categoryIds[3], // Marketing
                'tags' => [13], // SEO
            ],
            [
                'title' => 'Building Secure Web Applications',
                'excerpt' => 'Learn essential security practices to protect your web applications from common vulnerabilities and threats.',
                'content' => '<p>Security is a critical aspect of web application development. In this article, we\'ll cover essential practices to help you build more secure web applications.</p>
                <h2>Input Validation and Sanitization</h2>
                <p>Never trust user input. Always validate and sanitize all data coming from users:</p>
                <ul>
                    <li>Validate input against expected formats and ranges</li>
                    <li>Sanitize input to remove potentially malicious content</li>
                    <li>Use parameterized queries to prevent SQL injection</li>
                </ul>
                <h2>Authentication and Authorization</h2>
                <p>Implement robust authentication and authorization mechanisms:</p>
                <ul>
                    <li>Use strong password policies</li>
                    <li>Implement multi-factor authentication when possible</li>
                    <li>Apply the principle of least privilege for user permissions</li>
                    <li>Use secure session management techniques</li>
                </ul>
                <h2>HTTPS Everywhere</h2>
                <p>Always use HTTPS to encrypt data in transit:</p>
                <ul>
                    <li>Obtain and properly configure SSL/TLS certificates</li>
                    <li>Redirect HTTP requests to HTTPS</li>
                    <li>Use HTTP Strict Transport Security (HSTS)</li>
                </ul>
                <h2>Security Headers</h2>
                <p>Implement security headers to protect against various attacks:</p>
                <ul>
                    <li>Content Security Policy (CSP) to prevent XSS attacks</li>
                    <li>X-Content-Type-Options to prevent MIME type sniffing</li>
                    <li>X-Frame-Options to prevent clickjacking</li>
                </ul>
                <h2>Regular Updates and Patching</h2>
                <p>Keep all components of your application up to date:</p>
                <ul>
                    <li>Update frameworks and libraries regularly</li>
                    <li>Apply security patches promptly</li>
                    <li>Remove unused dependencies to reduce attack surface</li>
                </ul>
                <p>By incorporating these security practices into your development process, you can significantly reduce the risk of security breaches and protect your users\' data.</p>',
                'category_id' => $categoryIds[4], // Development
                'tags' => [15, 16], // Security, Testing
            ],
            [
                'title' => 'Effective Database Design for Web Applications',
                'excerpt' => 'Learn the principles of good database design that can improve performance, scalability, and maintainability of your web applications.',
                'content' => '<p>A well-designed database is the foundation of a robust web application. In this article, we\'ll explore key principles of effective database design.</p>
                <h2>Normalization</h2>
                <p>Normalization is the process of organizing data to reduce redundancy and improve data integrity:</p>
                <ul>
                    <li>First Normal Form (1NF): Eliminate repeating groups and create separate tables for related data</li>
                    <li>Second Normal Form (2NF): Remove partial dependencies</li>
                    <li>Third Normal Form (3NF): Remove transitive dependencies</li>
                </ul>
                <p>While full normalization is theoretically ideal, sometimes denormalization is necessary for performance reasons.</p>
                <h2>Indexing Strategy</h2>
                <p>Proper indexing can dramatically improve query performance:</p>
                <ul>
                    <li>Index columns that are frequently used in WHERE clauses</li>
                    <li>Index columns used for joining tables</li>
                    <li>Avoid over-indexing, as it can slow down write operations</li>
                </ul>
                <h2>Relationships and Constraints</h2>
                <p>Define clear relationships between tables and enforce constraints:</p>
                <ul>
                    <li>Use foreign keys to maintain referential integrity</li>
                    <li>Implement check constraints to enforce business rules</li>
                    <li>Use unique constraints where appropriate</li>
                </ul>
                <h2>Naming Conventions</h2>
                <p>Consistent naming conventions make databases more maintainable:</p>
                <ul>
                    <li>Use clear, descriptive names for tables and columns</li>
                    <li>Be consistent with singular or plural table names</li>
                    <li>Use prefixes or suffixes to group related tables</li>
                </ul>
                <h2>Consider Scalability</h2>
                <p>Design your database with future growth in mind:</p>
                <ul>
                    <li>Choose appropriate data types and sizes</li>
                    <li>Plan for horizontal or vertical scaling</li>
                    <li>Consider sharding strategies for very large datasets</li>
                </ul>
                <p>By following these principles, you can create database designs that not only meet your current needs but can also adapt to future requirements and scale with your application.</p>',
                'category_id' => $categoryIds[4], // Development
                'tags' => [12, 14], // Database, Performance
            ],
            [
                'title' => 'The Business Value of Good UX Design',
                'excerpt' => 'Understand how investing in user experience design can drive business growth, increase customer satisfaction, and provide competitive advantage.',
                'content' => '<p>User Experience (UX) design is often viewed as a creative or aesthetic concern, but its impact on business outcomes is substantial. This article explores the tangible business value of investing in good UX design.</p>
                <h2>Increased Conversion Rates</h2>
                <p>Well-designed user experiences remove friction from the customer journey, leading to higher conversion rates:</p>
                <ul>
                    <li>Streamlined checkout processes can reduce cart abandonment</li>
                    <li>Clear calls-to-action improve sign-up and subscription rates</li>
                    <li>Intuitive navigation helps users find what they\'re looking for quickly</li>
                </ul>
                <h2>Customer Retention and Loyalty</h2>
                <p>Good UX builds trust and encourages repeat business:</p>
                <ul>
                    <li>Positive experiences lead to higher customer satisfaction</li>
                    <li>Satisfied customers are more likely to become loyal users</li>
                    <li>Loyal customers have higher lifetime value and are more likely to recommend your product</li>
                </ul>
                <h2>Reduced Support Costs</h2>
                <p>Intuitive interfaces require less explanation and support:</p>
                <ul>
                    <li>Fewer support tickets and customer service calls</li>
                    <li>Lower training costs for both customers and employees</li>
                    <li>Reduced need for extensive documentation</li>
                </ul>
                <h2>Competitive Advantage</h2>
                <p>In crowded markets, UX can be a key differentiator:</p>
                <ul>
                    <li>Superior experiences can command premium pricing</li>
                    <li>Good UX can compensate for feature parity with competitors</li>
                    <li>Positive word-of-mouth from delighted users can reduce marketing costs</li>
                </ul>
                <h2>Reduced Development Waste</h2>
                <p>User-centered design processes help focus development efforts:</p>
                <ul>
                    <li>Early user testing identifies issues before expensive development</li>
                    <li>Clear understanding of user needs prevents building unwanted features</li>
                    <li>Iterative design reduces the need for major redesigns later</li>
                </ul>
                <p>By viewing UX design as a strategic business investment rather than just a design concern, organizations can realize significant returns in terms of customer acquisition, retention, and operational efficiency.</p>',
                'category_id' => $categoryIds[2], // Business
                'tags' => [6, 7], // UX, UI
            ],
        ];

        foreach ($posts as $index => $postData) {
            $post = BlogPost::create([
                'user_id' => $admin->id,
                'category_id' => $postData['category_id'],
                'title' => $postData['title'],
                'slug' => Str::slug($postData['title']),
                'excerpt' => $postData['excerpt'],
                'content' => $postData['content'],
                'is_published' => true,
                'published_at' => now()->subDays(rand(1, 365)),
            ]);

            // Attach random tags
            $selectedTags = array_map(function($tagIndex) use ($tagIds) {
                return $tagIds[$tagIndex];
            }, $postData['tags']);
            
            $post->tags()->attach($selectedTags);
        }
    }
}
