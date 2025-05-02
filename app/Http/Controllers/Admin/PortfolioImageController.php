<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PortfolioImage;
use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PortfolioImageController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, string $projectId)
    {
        // Log the request for debugging
        Log::info('Portfolio image upload request received', [
            'projectId' => $projectId,
            'hasFiles' => $request->hasFile('images'),
            'allFiles' => $request->allFiles(),
            'allInput' => $request->all()
        ]);

        $portfolioProject = PortfolioProject::findOrFail($projectId);

        try {
            $validated = $request->validate([
                'images' => 'required|array',
                'images.*' => 'image|max:5120', // Increased from 2MB to 5MB
                'alt_text' => 'nullable|string|max:255',
            ]);

            Log::info('Validation passed', ['validated' => $validated]);

            // Get the current highest display order
            $maxOrder = $portfolioProject->images()->max('display_order') ?? 0;

            // Handle multiple image uploads
            if ($request->hasFile('images')) {
                Log::info('Processing image files', ['count' => count($request->file('images'))]);

                foreach ($request->file('images') as $index => $image) {
                    $path = $image->store('portfolio', 'public');
                    Log::info('Image stored', ['index' => $index, 'path' => $path]);

                    // Create a new portfolio image
                    $portfolioImage = $portfolioProject->images()->create([
                        'image_path' => $path,
                        'alt_text' => $validated['alt_text'] ?? $portfolioProject->title,
                        'display_order' => $maxOrder + $index + 1,
                        'is_featured' => $index === 0 && $portfolioProject->images()->count() === 0, // First image is featured if no other images
                    ]);

                    Log::info('Portfolio image created', ['id' => $portfolioImage->id]);
                }
            } else {
                Log::warning('No image files found in the request');
            }
        } catch (\Exception $e) {
            Log::error('Error uploading portfolio images', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // For Inertia requests, return a JSON response with error
            if ($request->header('X-Inertia')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error uploading images: ' . $e->getMessage()
                ], 422);
            }

            return redirect()->route('admin.portfolio-projects.edit', $portfolioProject->id)
                ->with('error', 'Error uploading images: ' . $e->getMessage());
        }

        // For Inertia requests, return a proper Inertia response
        if ($request->header('X-Inertia')) {
            // Get the updated portfolio project with images
            $portfolioProject = PortfolioProject::with(['branding', 'industry', 'images'])
                ->findOrFail($projectId);

            // Return to the edit page with the updated portfolio project data
            return \Inertia\Inertia::render('Admin/PortfolioProjects/Edit', [
                'portfolioProject' => $portfolioProject,
                'brandings' => \App\Models\Branding::all(),
                'industries' => \App\Models\Industry::all(),
            ]);
        }

        // For traditional form submissions, redirect without success message
        return redirect()->route('admin.portfolio-projects.edit', $portfolioProject->id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $portfolioImage = PortfolioImage::findOrFail($id);

        $validated = $request->validate([
            'alt_text' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer|min:0',
            'is_featured' => 'boolean',
        ]);

        // Update portfolio image
        $portfolioImage->update($validated);

        // If this image is set as featured, unset other images as featured
        if ($validated['is_featured']) {
            $portfolioImage->portfolioProject->images()
                ->where('id', '!=', $portfolioImage->id)
                ->update(['is_featured' => false]);
        }

        return redirect()->route('admin.portfolio-projects.edit', $portfolioImage->portfolio_project_id)
            ->with('success', 'Image updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Use a database transaction to ensure atomic operations
        return DB::transaction(function () use ($id) {
            $portfolioImage = PortfolioImage::findOrFail($id);
            $projectId = $portfolioImage->portfolio_project_id;

            // Get the portfolio project before deletion
            $portfolioProjectBefore = PortfolioProject::findOrFail($projectId);
            $mainImageBefore = $portfolioProjectBefore->image;

            Log::info('Portfolio project before image deletion', [
                'id' => $portfolioProjectBefore->id,
                'main_image' => $mainImageBefore,
                'image_count' => $portfolioProjectBefore->images()->count(),
                'deleting_image_id' => $id,
                'deleting_image_path' => $portfolioImage->image_path
            ]);

            // CRITICAL SAFETY CHECK: Prevent deletion if the image path matches the main image
            // Normalize both paths for comparison by removing any leading slashes and storage/ prefix
            $normalizeImagePath = function ($path) {
                if (!$path) return null;
                // Remove leading slashes and normalize storage/ prefix
                return preg_replace('/^storage\//', '', ltrim($path, '/'));
            };

            $normalizedMainImage = $normalizeImagePath($mainImageBefore);
            $normalizedImagePath = $normalizeImagePath($portfolioImage->image_path);

            // Log the normalized paths for debugging
            Log::info('Comparing normalized paths for main image check', [
                'normalized_main_image' => $normalizedMainImage,
                'normalized_image_path' => $normalizedImagePath,
                'original_main_image' => $mainImageBefore,
                'original_image_path' => $portfolioImage->image_path
            ]);

            if ($normalizedMainImage && $normalizedImagePath && $normalizedMainImage === $normalizedImagePath) {
                Log::warning('Prevented deletion of main image', [
                    'main_image' => $mainImageBefore,
                    'image_path' => $portfolioImage->image_path,
                    'normalized_main_image' => $normalizedMainImage,
                    'normalized_image_path' => $normalizedImagePath
                ]);

                // Return early with an error message
                if (request()->header('X-Inertia')) {
                    return \Inertia\Inertia::render('Admin/PortfolioProjects/Edit', [
                        'portfolioProject' => $portfolioProjectBefore->load(['branding', 'industry', 'images']),
                        'brandings' => \App\Models\Branding::all(),
                        'industries' => \App\Models\Industry::all(),
                        'error' => 'Cannot delete the main project image. Please change the main image first.'
                    ]);
                }

                return redirect()->route('admin.portfolio-projects.edit', $projectId)
                    ->with('error', 'Cannot delete the main project image. Please change the main image first.');
            }

            // Delete image from storage
            if ($portfolioImage->image_path) {
                try {
                    // Log the image path for debugging
                    Log::info('Deleting portfolio image: ' . $portfolioImage->image_path);

                    // Ensure the path doesn't have a leading slash
                    $imagePath = ltrim($portfolioImage->image_path, '/');

                    // Delete the image
                    if (Storage::disk('public')->exists($imagePath)) {
                        Storage::disk('public')->delete($imagePath);
                        Log::info('Portfolio image deleted successfully');
                    } else {
                        Log::warning('Portfolio image file not found: ' . $imagePath);
                    }
                } catch (\Exception $e) {
                    Log::error('Error deleting portfolio image: ' . $e->getMessage());
                }
            }

            // Delete portfolio image
            $portfolioImage->delete();

            // Get the portfolio project after deletion and force a fresh query to avoid stale data
            $portfolioProject = PortfolioProject::findOrFail($projectId);

            Log::info('Portfolio project after image deletion', [
                'id' => $portfolioProject->id,
                'main_image' => $portfolioProject->image,
                'image_count' => $portfolioProject->images()->count()
            ]);

            // Double-check that the main image is still there
            if ($mainImageBefore && (!$portfolioProject->image || $portfolioProject->image !== $mainImageBefore)) {
                Log::error('Main image was accidentally deleted or changed during portfolio image deletion', [
                    'before_image' => $mainImageBefore,
                    'after_image' => $portfolioProject->image
                ]);

                // Restore the main image without triggering model events
                DB::table('portfolio_projects')
                    ->where('id', $portfolioProject->id)
                    ->update(['image' => $mainImageBefore]);

                // Refresh the model to get the updated image
                $portfolioProject->refresh();

                Log::info('Main image restored', ['image' => $mainImageBefore]);
            }

            // Reload the portfolio project with all relationships for the response
            $portfolioProject = PortfolioProject::with(['branding', 'industry', 'images'])
                ->findOrFail($projectId);

            // For Inertia requests, return a proper Inertia response
            if (request()->header('X-Inertia')) {
                // Return to the edit page with the updated portfolio project data
                return \Inertia\Inertia::render('Admin/PortfolioProjects/Edit', [
                    'portfolioProject' => $portfolioProject,
                    'brandings' => \App\Models\Branding::all(),
                    'industries' => \App\Models\Industry::all(),
                ]);
            }

            // For AJAX requests
            if (request()->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Image deleted successfully.'
                ]);
            }

            // For traditional form submissions, redirect
            return redirect()->route('admin.portfolio-projects.edit', $projectId)
                ->with('success', 'Image deleted successfully.');
        });
    }

    /**
     * Reorder images.
     */
    public function reorder(Request $request, string $projectId)
    {
        // Verify project exists
        PortfolioProject::findOrFail($projectId);

        $validated = $request->validate([
            'image_order' => 'required|array',
            'image_order.*' => 'integer|exists:portfolio_images,id',
        ]);

        // Update display order for each image
        foreach ($validated['image_order'] as $index => $imageId) {
            PortfolioImage::where('id', $imageId)
                ->where('portfolio_project_id', $projectId)
                ->update(['display_order' => $index]);
        }

        return redirect()->route('admin.portfolio-projects.edit', $projectId)
            ->with('success', 'Images reordered successfully.');
    }

    /**
     * Set an image as featured.
     */
    public function setFeatured(string $id)
    {
        $portfolioImage = PortfolioImage::findOrFail($id);
        $projectId = $portfolioImage->portfolio_project_id;

        // Set this image as featured
        $portfolioImage->update(['is_featured' => true]);

        // Unset other images as featured
        PortfolioImage::where('portfolio_project_id', $projectId)
            ->where('id', '!=', $id)
            ->update(['is_featured' => false]);

        // For Inertia requests, return a proper Inertia response
        if (request()->header('X-Inertia')) {
            // Get the updated portfolio project with images
            $portfolioProject = PortfolioProject::with(['branding', 'industry', 'images'])
                ->findOrFail($projectId);

            // Return to the edit page with the updated portfolio project data
            return \Inertia\Inertia::render('Admin/PortfolioProjects/Edit', [
                'portfolioProject' => $portfolioProject,
                'brandings' => \App\Models\Branding::all(),
                'industries' => \App\Models\Industry::all(),
            ]);
        }

        // For AJAX requests
        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Featured image updated successfully.'
            ]);
        }

        // For traditional form submissions, redirect
        return redirect()->route('admin.portfolio-projects.edit', $projectId)
            ->with('success', 'Featured image updated successfully.');
    }
}
