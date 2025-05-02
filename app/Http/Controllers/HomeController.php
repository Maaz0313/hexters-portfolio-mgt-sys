<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\PortfolioProject;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page.
     */
    public function index()
    {
        // Get latest published blog posts from the database
        $blogPosts = BlogPost::with(['user', 'category'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        // Format blog posts for the frontend
        $latestPosts = $blogPosts->map(function ($post) {
            return [
                'href' => route('blog.show', ['slug' => $post->slug]),
                'imageSrc' => $post->featured_image ? "/storage/{$post->featured_image}" : "/images/logos/logo.png",
                'imageAlt' => $post->title,
                'readTime' => ceil(strlen($post->content) / 1000), // Rough estimate: 1000 chars = 1 min read
                'title' => $post->title,
                'excerpt' => $post->excerpt ?? substr(strip_tags($post->content), 0, 150) . '...',
                'authorImage' => "/images/logos/logo.png", // Default author image
                'authorName' => $post->user->name ?? 'Admin',
                'date' => $post->published_at->format('d F Y'),
            ];
        });

        // Get featured portfolio projects
        $portfolioProjects = PortfolioProject::with(['branding', 'industry'])
            ->where('is_published', true)
            ->where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get();

        // Format portfolio projects for the frontend
        $featuredProjects = $portfolioProjects->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
                'description' => $project->description ?? '',
                'image' => $project->image ? "/storage/{$project->image}" : "/images/placeholder.jpg",
                'imageAlt' => $project->image_alt ?? $project->title,
                'branding' => $project->branding ? $project->branding->name : null,
                'industry' => $project->industry ? $project->industry->name : null,
                'href' => route('portfolio.show', ['slug' => $project->slug]),
            ];
        });

        return Inertia::render('Home', [
            'latestPosts' => $latestPosts,
            'featuredProjects' => $featuredProjects
        ]);
    }
}
