<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PortfolioProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PortfolioProject::query()->where('is_published', true);

        // Search functionality
        if ($request->has('search')) {
            $search = $request->input('search');
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

        // Filter by branding
        if ($request->has('branding') && !empty($request->input('branding'))) {
            $brandings = explode(',', $request->input('branding'));
            if (count($brandings) > 0) {
                $query->whereHas('branding', function($q) use ($brandings) {
                    $q->whereIn('id', $brandings);
                });
            }
        }

        // Filter by industry
        if ($request->has('industry') && !empty($request->input('industry'))) {
            $industries = explode(',', $request->input('industry'));
            if (count($industries) > 0) {
                $query->whereHas('industry', function($q) use ($industries) {
                    $q->whereIn('id', $industries);
                });
            }
        }

        // Get all brandings and industries for filters
        $brandings = \App\Models\Branding::orderBy('name')->get()->toArray();
        $industries = \App\Models\Industry::orderBy('name')->get()->toArray();

        $portfolioProjects = $query->with(['branding', 'industry'])
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Portfolio', [
            'portfolioProjects' => $portfolioProjects,
            'brandings' => $brandings,
            'industries' => $industries,
            'filters' => [
                'search' => $request->input('search', ''),
                'branding' => $request->input('branding', ''),
                'industry' => $request->input('industry', ''),
            ],
        ]);
    }


}
