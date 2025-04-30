<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use App\Models\Branding;
use App\Models\Industry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Display a listing of the portfolio projects.
     */
    public function index(Request $request)
    {
        $query = PortfolioProject::with(['branding', 'industry', 'user'])
            ->where('is_published', true)
            ->orderBy('created_at', 'desc');

        // Filter by featured
        if ($request->has('featured') && $request->featured === 'true') {
            $query->where('is_featured', true);
        }

        // Filter by branding
        if ($request->has('branding')) {
            $brandingSlug = $request->branding;
            $branding = Branding::where('slug', $brandingSlug)->first();
            if ($branding) {
                $query->where('branding_id', $branding->id);
            }
        }

        // Filter by industry
        if ($request->has('industry')) {
            $industrySlug = $request->industry;
            $industry = Industry::where('slug', $industrySlug)->first();
            if ($industry) {
                $query->where('industry_id', $industry->id);
            }
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('branding', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('industry', function($q) use ($search) {
                      $q->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $portfolioProjects = $query->with(['branding', 'industry', 'user'])->get();

        // If this is an AJAX request, return JSON
        if ($request->ajax() || $request->wantsJson()) {
            return response()->json($portfolioProjects);
        }

        // Get all brandings and industries for filters
        $brandings = Branding::orderBy('name')->get()->toArray();
        $industries = Industry::orderBy('name')->get()->toArray();

        // Otherwise, render the Inertia view
        return Inertia::render('Portfolio', [
            'portfolioProjects' => $portfolioProjects,
            'brandings' => $brandings,
            'industries' => $industries,
            'filters' => [
                'search' => $request->input('search', ''),
                'branding' => $request->input('branding', ''),
                'industry' => $request->input('industry', ''),
                'featured' => $request->input('featured', ''),
            ],
        ]);
    }


}
