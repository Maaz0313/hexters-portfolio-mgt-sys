<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::withCount(['blogPosts', 'portfolioProjects'])
            ->orderBy('name')
            ->paginate(10);

        return Inertia::render('Admin/Tags/Index', [
            'tags' => $tags,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Tags/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Create tag
        Tag::create($validated);

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tag = Tag::withCount(['blogPosts', 'portfolioProjects'])
            ->findOrFail($id);

        return Inertia::render('Admin/Tags/Show', [
            'tag' => $tag,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $tag = Tag::findOrFail($id);

        return Inertia::render('Admin/Tags/Edit', [
            'tag' => $tag,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tag = Tag::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Update tag
        $tag->update($validated);

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tag = Tag::withCount(['blogPosts', 'portfolioProjects'])->findOrFail($id);

        // Check if tag has blog posts or portfolio projects
        if ($tag->blog_posts_count > 0 || $tag->portfolio_projects_count > 0) {
            return redirect()->route('admin.tags.index')
                ->with('error', 'Cannot delete tag because it is used by blog posts or portfolio projects.');
        }

        // Delete tag
        $tag->delete();

        return redirect()->route('admin.tags.index')
            ->with('success', 'Tag deleted successfully.');
    }
}
