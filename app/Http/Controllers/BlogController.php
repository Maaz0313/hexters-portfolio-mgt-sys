<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the blog posts.
     */
    public function index(Request $request, $slug = null)
    {
        $query = BlogPost::with(['category', 'tags', 'user'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc');

        // Filter by category
        if ($request->has('category')) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        // Filter by tag from route parameter (for blog.tag route)
        if ($slug) {
            $tag = Tag::where('slug', $slug)->first();
            if ($tag) {
                $query->whereHas('tags', function ($q) use ($tag) {
                    $q->where('tags.id', $tag->id);
                });
            }
        }
        // Filter by tag from request parameter
        elseif ($request->has('tag')) {
            $tag = Tag::where('slug', $request->tag)->first();
            if ($tag) {
                $query->whereHas('tags', function ($q) use ($tag) {
                    $q->where('tags.id', $tag->id);
                });
            }
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $blogPosts = $query->paginate(10);

        // Only return JSON for explicit AJAX requests that are not Inertia requests
        if (($request->ajax() || $request->wantsJson() || $request->expectsJson()) && !$request->header('X-Inertia')) {
            return response()->json($blogPosts);
        }

        // Get categories and tags for filters
        $categories = Category::where('type', 'blog')->get();
        $tags = Tag::whereHas('blogPosts')->get();
        $authors = $blogPosts->pluck('user')->unique('id')->values();

        // Get latest posts
        $latestPosts = BlogPost::with(['user', 'category'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        // Get popular categories with post counts
        $popularCategories = Category::where('type', 'blog')
            ->withCount('blogPosts')
            ->orderBy('blog_posts_count', 'desc')
            ->limit(5)
            ->get();

        // Otherwise, render the Inertia view
        return Inertia::render('Blog', [
            'blogPosts' => $blogPosts,
            'latestPosts' => $latestPosts,
            'categories' => $categories,
            'tags' => $tags,
            'authors' => $authors,
            'popularCategories' => $popularCategories,
            'filters' => [
                'search' => $request->input('search', ''),
                'category' => $request->input('category', ''),
                'tag' => $slug ?? $request->input('tag', ''),
            ],
        ]);
    }

    /**
     * Display the specified blog post.
     */
    public function show($slug, Request $request)
    {
        $blogPost = BlogPost::with(['category', 'tags', 'user'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->firstOrFail();

        // Only return JSON for explicit AJAX requests that are not Inertia requests
        if (($request->ajax() || $request->wantsJson()) && !$request->header('X-Inertia')) {
            return response()->json($blogPost);
        }

        // Get related posts based on category and tags
        $relatedQuery = BlogPost::with(['user'])
            ->where('id', '!=', $blogPost->id)
            ->where('is_published', true)
            ->whereNotNull('published_at');

        // If the post has a category, include posts from the same category
        if ($blogPost->category_id) {
            $relatedQuery->where(function ($query) use ($blogPost) {
                $query->where('category_id', $blogPost->category_id);
            });
        }

        // If the post has tags, include posts with the same tags
        if ($blogPost->tags->isNotEmpty()) {
            $tagIds = $blogPost->tags->pluck('id')->toArray();
            $relatedQuery->orWhereHas('tags', function ($query) use ($tagIds) {
                $query->whereIn('tags.id', $tagIds);
            });
        }

        $relatedPosts = $relatedQuery->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        // Get popular posts
        $popularPosts = BlogPost::with(['user'])
            ->where('id', '!=', $blogPost->id)
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        // Otherwise, render the Inertia view
        return Inertia::render('BlogSingle', [
            'slug' => $slug,
            'blogPost' => $blogPost,
            'relatedPosts' => $relatedPosts,
            'popularPosts' => $popularPosts,
        ]);
    }

    /**
     * Get related blog posts.
     */
    public function related($slug, Request $request)
    {
        $blogPost = BlogPost::where('slug', $slug)->firstOrFail();

        $relatedPosts = BlogPost::with(['category', 'tags'])
            ->where('id', '!=', $blogPost->id)
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->where(function ($query) use ($blogPost) {
                // Same category
                $query->where('category_id', $blogPost->category_id);

                // Or has same tags
                if ($blogPost->tags->count() > 0) {
                    $query->orWhereHas('tags', function ($q) use ($blogPost) {
                        $q->whereIn('tags.id', $blogPost->tags->pluck('id'));
                    });
                }
            })
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        // Only return JSON for explicit AJAX requests that are not Inertia requests
        if (($request->ajax() || $request->wantsJson()) && !$request->header('X-Inertia')) {
            return response()->json($relatedPosts);
        }

        // Otherwise, render the Inertia view
        return Inertia::render('BlogRelated', [
            'blogPost' => $blogPost,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
