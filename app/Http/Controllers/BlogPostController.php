<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = BlogPost::with(['user', 'category', 'tags'])
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc');

        // Search functionality
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        // Filter by category
        if ($request->has('category') && !empty($request->input('category'))) {
            $categorySlugs = explode(',', $request->input('category'));
            // Filter out empty values
            $categorySlugs = array_filter($categorySlugs, function($slug) {
                return !empty(trim($slug));
            });

            if (count($categorySlugs) > 0) {
                // Log the category slugs for debugging
                \Log::info('Category slugs: ' . implode(', ', $categorySlugs));

                // Try to find categories by name or slug
                $categoryIds = [];
                foreach ($categorySlugs as $categorySlug) {
                    // Try to find by slug first
                    $category = Category::where('slug', trim($categorySlug))->first();

                    // If not found by slug, try by name (case-insensitive)
                    if (!$category) {
                        $category = Category::where('name', trim($categorySlug))->first();
                    }

                    if ($category) {
                        $categoryIds[] = $category->id;
                    }
                }

                // Log the category IDs for debugging
                \Log::info('Category IDs: ' . implode(', ', $categoryIds));

                if (!empty($categoryIds)) {
                    $query->whereIn('category_id', $categoryIds);
                }
            }
        }

        // Filter by tag
        if ($request->has('tag') && !empty($request->input('tag'))) {
            $tagSlugs = explode(',', $request->input('tag'));
            // Filter out empty values
            $tagSlugs = array_filter($tagSlugs, function($slug) {
                return !empty(trim($slug));
            });

            if (count($tagSlugs) > 0) {
                // Log the tag slugs for debugging
                \Log::info('Tag slugs: ' . implode(', ', $tagSlugs));

                // Try to find tags by name or slug
                $tagIds = [];
                foreach ($tagSlugs as $tagSlug) {
                    // Try to find by slug first
                    $tag = Tag::where('slug', trim($tagSlug))->first();

                    // If not found by slug, try by name
                    if (!$tag) {
                        $tag = Tag::where('name', trim($tagSlug))->first();
                    }

                    if ($tag) {
                        $tagIds[] = $tag->id;
                    }
                }

                // Log the tag IDs for debugging
                \Log::info('Tag IDs: ' . implode(', ', $tagIds));

                if (!empty($tagIds)) {
                    $query->whereHas('tags', function ($q) use ($tagIds) {
                        $q->whereIn('tags.id', $tagIds);
                    });
                }
            }
        }

        // Filter by author
        if ($request->has('author')) {
            $authorId = $request->input('author');
            $query->where('user_id', $authorId);
        }

        $blogPosts = $query->paginate(12);

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
                'tag' => $request->input('tag', ''),
                'author' => $request->input('author', ''),
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $blogPost = BlogPost::with(['user', 'category', 'tags'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->whereNotNull('published_at')
            ->firstOrFail();

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

        return Inertia::render('BlogSingle', [
            'slug' => $slug,
            'blogPost' => $blogPost,
            'relatedPosts' => $relatedPosts,
            'popularPosts' => $popularPosts,
        ]);
    }
}
