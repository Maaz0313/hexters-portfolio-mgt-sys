<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display the specified page by slug.
     */
    public function show(string $slug)
    {
        $page = Page::where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('Page', [
            'page' => $page,
        ]);
    }

    /**
     * Display the privacy policy page.
     */
    public function privacyPolicy()
    {
        $page = Page::where('slug', 'privacy-policy')
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('PrivacyPolicy', [
            'page' => $page,
        ]);
    }

    /**
     * Display the terms of service page.
     */
    public function termsOfService()
    {
        $page = Page::where('slug', 'terms-of-service')
            ->where('is_published', true)
            ->firstOrFail();

        return Inertia::render('TermsOfService', [
            'page' => $page,
        ]);
    }
}
