<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class IndustryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $industries = Industry::orderBy('name')
            ->withCount('portfolioProjects')
            ->paginate(10);

        return Inertia::render('Admin/Industries/Index', [
            'industries' => $industries,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Industries/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Create industry
        Industry::create($validated);

        return redirect()->route('admin.industries.index')
            ->with('success', 'Industry created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $industry = Industry::withCount('portfolioProjects')
            ->findOrFail($id);

        return Inertia::render('Admin/Industries/Show', [
            'industry' => $industry,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $industry = Industry::findOrFail($id);

        return Inertia::render('Admin/Industries/Edit', [
            'industry' => $industry,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $industry = Industry::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Update industry
        $industry->update($validated);

        return redirect()->route('admin.industries.index')
            ->with('success', 'Industry updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $industry = Industry::findOrFail($id);

        // Check if industry has portfolio projects
        if ($industry->portfolioProjects()->count() > 0) {
            return redirect()->route('admin.industries.index')
                ->with('error', 'Cannot delete industry because it has associated portfolio projects.');
        }

        // Delete industry
        $industry->delete();

        return redirect()->route('admin.industries.index')
            ->with('success', 'Industry deleted successfully.');
    }
}
