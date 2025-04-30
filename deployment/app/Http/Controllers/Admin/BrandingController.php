<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branding;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BrandingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brandings = Branding::orderBy('name')
            ->withCount('portfolioProjects')
            ->paginate(10);

        return Inertia::render('Admin/Brandings/Index', [
            'brandings' => $brandings,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Brandings/Create');
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

        // Create branding
        Branding::create($validated);

        return redirect()->route('admin.brandings.index')
            ->with('success', 'Branding created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $branding = Branding::withCount('portfolioProjects')
            ->findOrFail($id);

        return Inertia::render('Admin/Brandings/Show', [
            'branding' => $branding,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $branding = Branding::findOrFail($id);

        return Inertia::render('Admin/Brandings/Edit', [
            'branding' => $branding,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $branding = Branding::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Generate slug from name
        $validated['slug'] = Str::slug($validated['name']);

        // Update branding
        $branding->update($validated);

        return redirect()->route('admin.brandings.index')
            ->with('success', 'Branding updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $branding = Branding::findOrFail($id);

        // Check if branding has portfolio projects
        if ($branding->portfolioProjects()->count() > 0) {
            return redirect()->route('admin.brandings.index')
                ->with('error', 'Cannot delete branding because it has associated portfolio projects.');
        }

        // Delete branding
        $branding->delete();

        return redirect()->route('admin.brandings.index')
            ->with('success', 'Branding deleted successfully.');
    }
}
