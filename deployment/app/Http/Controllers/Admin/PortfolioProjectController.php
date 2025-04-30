<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branding;
use App\Models\Category;
use App\Models\Industry;
use App\Models\PortfolioProject;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PortfolioProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $portfolioProjects = PortfolioProject::with(['user'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/PortfolioProjects/Index', [
            'portfolioProjects' => $portfolioProjects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $brandings = Branding::orderBy('name')->get();
        $industries = Industry::orderBy('name')->get();

        return Inertia::render('Admin/PortfolioProjects/Create', [
            'brandings' => $brandings,
            'industries' => $industries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'image_alt' => 'nullable|string|max:255',
            'branding_id' => 'nullable|exists:brandings,id',
            'industry_id' => 'nullable|exists:industries,id',
            'completion_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        // Generate slug from title
        $validated['slug'] = Str::slug($validated['title']);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('portfolio', 'public');
            $validated['image'] = $path;
        }

        // Set user_id
        $validated['user_id'] = auth()->id();

        // Create portfolio project
        $portfolioProject = PortfolioProject::create($validated);

        return redirect()->route('admin.portfolio-projects.index')
            ->with('success', 'Portfolio project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $portfolioProject = PortfolioProject::with(['user', 'branding', 'industry'])
            ->findOrFail($id);

        return Inertia::render('Admin/PortfolioProjects/Show', [
            'portfolioProject' => $portfolioProject,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $portfolioProject = PortfolioProject::with(['branding', 'industry'])->findOrFail($id);
        $brandings = Branding::orderBy('name')->get();
        $industries = Industry::orderBy('name')->get();

        return Inertia::render('Admin/PortfolioProjects/Edit', [
            'portfolioProject' => $portfolioProject,
            'brandings' => $brandings,
            'industries' => $industries,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $portfolioProject = PortfolioProject::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'image_alt' => 'nullable|string|max:255',
            'branding_id' => 'nullable|exists:brandings,id',
            'industry_id' => 'nullable|exists:industries,id',
            'completion_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($portfolioProject->image) {
                Storage::disk('public')->delete($portfolioProject->image);
            }

            $path = $request->file('image')->store('portfolio', 'public');
            $validated['image'] = $path;
        }

        // Update portfolio project
        $portfolioProject->update($validated);

        return redirect()->route('admin.portfolio-projects.index')
            ->with('success', 'Portfolio project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $portfolioProject = PortfolioProject::findOrFail($id);

        // Delete image if exists
        if ($portfolioProject->image) {
            Storage::disk('public')->delete($portfolioProject->image);
        }

        // Delete portfolio project
        $portfolioProject->delete();

        return redirect()->route('admin.portfolio-projects.index')
            ->with('success', 'Portfolio project deleted successfully.');
    }
}
