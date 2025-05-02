<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branding;
use App\Models\Industry;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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
        $portfolioProjects = PortfolioProject::with(['user', 'branding', 'industry'])
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
            'image' => 'nullable|image|max:5120', // Increased from 2MB to 5MB
            'image_alt' => 'nullable|string|max:255',
            'branding_id' => 'nullable|exists:brandings,id',
            'industry_id' => 'nullable|exists:industries,id',
            'completion_date' => 'nullable|date',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
            'images' => 'nullable|array',
            'images.*' => 'nullable|image|max:5120',
        ]);

        // Generate slug from title
        $validated['slug'] = Str::slug($validated['title']);

        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('portfolio', 'public');
            $validated['image'] = $path;
        }

        // Set user_id
        $validated['user_id'] = $request->user()->id;

        // Create portfolio project
        $portfolioProject = PortfolioProject::create($validated);

        // Handle additional images upload
        if ($request->hasFile('images')) {
            $displayOrder = 0;
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('portfolio', 'public');

                // Create a new portfolio image
                $portfolioProject->images()->create([
                    'image_path' => $path,
                    'alt_text' => $validated['image_alt'] ?? $validated['title'],
                    'display_order' => $displayOrder++,
                    'is_featured' => $index === 0 && !$request->hasFile('image'), // First additional image is featured if no main image
                ]);
            }
        }

        return redirect()->route('admin.portfolio-projects.index')
            ->with('success', 'Portfolio project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $portfolioProject = PortfolioProject::with(['user', 'branding', 'industry', 'images'])
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
        $portfolioProject = PortfolioProject::with(['branding', 'industry', 'images'])
            ->findOrFail($id);
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
            'image' => 'nullable|image|max:5120', // Increased from 2MB to 5MB
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
                try {
                    // Log the image path for debugging
                    Log::info('Deleting old main image during update: ' . $portfolioProject->image);

                    // Ensure the path doesn't have a leading slash
                    $imagePath = ltrim($portfolioProject->image, '/');

                    // Delete the image
                    if (Storage::disk('public')->exists($imagePath)) {
                        Storage::disk('public')->delete($imagePath);
                        Log::info('Old main image deleted successfully during update');
                    } else {
                        Log::warning('Old main image file not found during update: ' . $imagePath);
                    }
                } catch (\Exception $e) {
                    Log::error('Error deleting old main image during update: ' . $e->getMessage());
                }
            }

            $path = $request->file('image')->store('portfolio', 'public');
            $validated['image'] = $path;
            Log::info('New main image uploaded: ' . $path);
        }

        // Update portfolio project
        $portfolioProject->update($validated);

        // For Inertia form submissions from the Edit page
        if ($request->wantsJson() && $request->header('X-Inertia') && $request->has('_method') && $request->input('_method') === 'PUT') {
            // Get the updated portfolio project with all relations for the response
            $updatedProject = PortfolioProject::with(['branding', 'industry', 'images'])
                ->findOrFail($portfolioProject->id);

            // Log the updated project for debugging
            Log::info('Updated portfolio project', [
                'id' => $updatedProject->id,
                'title' => $updatedProject->title,
                'image' => $updatedProject->image,
                'image_count' => $updatedProject->images->count()
            ]);

            // If redirect_to is specified, use that for redirection
            if ($request->has('redirect_to')) {
                $redirectTo = $request->input('redirect_to');
                if ($redirectTo === 'index') {
                    return redirect()->route('admin.portfolio-projects.index')
                        ->with('success', 'Portfolio project updated successfully.');
                }
            }

            // Otherwise, return to the edit page with fresh data
            return redirect()->route('admin.portfolio-projects.edit', $portfolioProject->id)
                ->with('success', 'Portfolio project updated successfully.');
        }

        // Check if the request has a redirect_to parameter
        if ($request->has('redirect_to')) {
            $redirectTo = $request->input('redirect_to');
            if ($redirectTo === 'show') {
                return redirect()->route('admin.portfolio-projects.show', $portfolioProject->id)
                    ->with('success', 'Portfolio project updated successfully.');
            } elseif ($redirectTo === 'edit') {
                return redirect()->route('admin.portfolio-projects.edit', $portfolioProject->id)
                    ->with('success', 'Portfolio project updated successfully.');
            }
        }

        // Check the referer header to determine where to redirect
        $referer = request()->header('referer');
        if ($referer) {
            if (strpos($referer, '/dashboard/portfolio-projects/' . $portfolioProject->id . '/edit') !== false) {
                return redirect()->route('admin.portfolio-projects.edit', $portfolioProject->id)
                    ->with('success', 'Portfolio project updated successfully.');
            } elseif (strpos($referer, '/dashboard/portfolio-projects/' . $portfolioProject->id) !== false) {
                return redirect()->route('admin.portfolio-projects.show', $portfolioProject->id)
                    ->with('success', 'Portfolio project updated successfully.');
            }
        }

        // Default redirect to index
        return redirect()->route('admin.portfolio-projects.index')
            ->with('success', 'Portfolio project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $portfolioProject = PortfolioProject::with('images')->findOrFail($id);

        // Delete main image if exists
        if ($portfolioProject->image) {
            try {
                // Log the image path for debugging
                Log::info('Deleting main image: ' . $portfolioProject->image);

                // Ensure the path doesn't have a leading slash
                $imagePath = ltrim($portfolioProject->image, '/');

                // Delete the image
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                    Log::info('Main image deleted successfully');
                } else {
                    Log::warning('Main image file not found: ' . $imagePath);
                }
            } catch (\Exception $e) {
                Log::error('Error deleting main image: ' . $e->getMessage());
            }
        }

        // Delete all associated images
        foreach ($portfolioProject->images as $image) {
            try {
                // Log the image path for debugging
                Log::info('Deleting associated image: ' . $image->image_path);

                // Ensure the path doesn't have a leading slash
                $imagePath = ltrim($image->image_path, '/');

                // Delete the image
                if (Storage::disk('public')->exists($imagePath)) {
                    Storage::disk('public')->delete($imagePath);
                    Log::info('Associated image deleted successfully');
                } else {
                    Log::warning('Associated image file not found: ' . $imagePath);
                }
            } catch (\Exception $e) {
                Log::error('Error deleting associated image: ' . $e->getMessage());
            }
        }

        // Delete portfolio project (will cascade delete images due to foreign key constraint)
        $portfolioProject->delete();

        return redirect()->route('admin.portfolio-projects.index')
            ->with('success', 'Portfolio project deleted successfully.');
    }
}
