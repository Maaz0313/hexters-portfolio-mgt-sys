<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\Category;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blogPosts = BlogPost::with(['user', 'category', 'tags'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/BlogPosts/Index', [
            'blogPosts' => $blogPosts,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::where('type', 'blog')->get();
        $tags = Tag::all();

        return Inertia::render('Admin/BlogPosts/Create', [
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:5120', // Increased from 2MB to 5MB
            'thumbnail_image' => 'nullable|image|max:5120', // Thumbnail image for blog cards
            'is_published' => 'boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Generate slug from title
        $slug = Str::slug($validated['title']);

        // Check if the slug already exists
        $slugExists = BlogPost::where('slug', $slug)->exists();

        // If the slug exists, append a random string
        if ($slugExists) {
            $slug = $slug . '-' . Str::random(5);
        }

        $validated['slug'] = $slug;

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('blog', 'public');
            $validated['featured_image'] = $path;
        }

        // Handle thumbnail image upload
        if ($request->hasFile('thumbnail_image')) {
            $path = $request->file('thumbnail_image')->store('blog/thumbnails', 'public');
            $validated['thumbnail_image'] = $path;
        } elseif ($request->hasFile('featured_image')) {
            // If no thumbnail is uploaded but a featured image is, use the featured image as thumbnail
            $validated['thumbnail_image'] = $validated['featured_image'];
        }

        // Set user_id and published_at
        $validated['user_id'] = $request->user()->id;
        if ($validated['is_published']) {
            $validated['published_at'] = now();
        }

        // Create blog post
        $blogPost = BlogPost::create($validated);

        // Attach tags
        if (isset($validated['tags'])) {
            $blogPost->tags()->attach($validated['tags']);
        }

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Blog post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $blogPost = BlogPost::with(['user', 'category', 'tags'])
            ->findOrFail($id);

        return Inertia::render('Admin/BlogPosts/Show', [
            'blogPost' => $blogPost,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $blogPost = BlogPost::with('tags')->findOrFail($id);
        $categories = Category::where('type', 'blog')->get();
        $tags = Tag::all();

        return Inertia::render('Admin/BlogPosts/Edit', [
            'blogPost' => $blogPost,
            'categories' => $categories,
            'tags' => $tags,
            'selectedTags' => $blogPost->tags->pluck('id'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $blogPost = BlogPost::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'featured_image' => 'nullable|image|max:5120', // Increased from 2MB to 5MB
            'thumbnail_image' => 'nullable|image|max:5120', // Thumbnail image for blog cards
            'is_published' => 'boolean',
            'tags' => 'nullable|array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Handle featured image upload
        if ($request->hasFile('featured_image')) {
            // Delete old image if exists
            if ($blogPost->featured_image) {
                Storage::disk('public')->delete($blogPost->featured_image);
            }

            $path = $request->file('featured_image')->store('blog', 'public');
            $validated['featured_image'] = $path;

            // If no thumbnail is uploaded but a new featured image is, use the new featured image as thumbnail
            if (!$request->hasFile('thumbnail_image')) {
                $validated['thumbnail_image'] = $path;
            }
        } else {
            // If no new image is uploaded, remove featured_image from validated data
            // to prevent overwriting the existing image path with null
            unset($validated['featured_image']);
        }

        // Handle thumbnail image upload
        if ($request->hasFile('thumbnail_image')) {
            // Delete old thumbnail image if exists
            if ($blogPost->thumbnail_image && $blogPost->thumbnail_image !== $blogPost->featured_image) {
                Storage::disk('public')->delete($blogPost->thumbnail_image);
            }

            $path = $request->file('thumbnail_image')->store('blog/thumbnails', 'public');
            $validated['thumbnail_image'] = $path;
        } else {
            // If no new thumbnail is uploaded, remove thumbnail_image from validated data
            // to prevent overwriting the existing thumbnail image path with null
            unset($validated['thumbnail_image']);
        }

        // Update published_at if publishing status changed
        if (!$blogPost->is_published && $validated['is_published']) {
            $validated['published_at'] = now();
        }

        // Update slug if title has changed
        if ($blogPost->title !== $validated['title']) {
            $slug = Str::slug($validated['title']);

            // Check if the slug already exists (excluding the current blog post)
            $slugExists = BlogPost::where('slug', $slug)
                ->where('id', '!=', $blogPost->id)
                ->exists();

            // If the slug exists, append a random string
            if ($slugExists) {
                $slug = $slug . '-' . Str::random(5);
            }

            $validated['slug'] = $slug;
        }

        // Update blog post
        $blogPost->update($validated);

        // Sync tags
        if (isset($validated['tags'])) {
            $blogPost->tags()->sync($validated['tags']);
        } else {
            $blogPost->tags()->detach();
        }

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Blog post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $blogPost = BlogPost::findOrFail($id);

        // Delete featured image if exists
        if ($blogPost->featured_image) {
            Storage::disk('public')->delete($blogPost->featured_image);
        }

        // Delete thumbnail image if exists and is different from featured image
        if ($blogPost->thumbnail_image && $blogPost->thumbnail_image !== $blogPost->featured_image) {
            Storage::disk('public')->delete($blogPost->thumbnail_image);
        }

        // Delete blog post
        $blogPost->delete();

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Blog post deleted successfully.');
    }
}
