<?php

use Illuminate\Support\Facades\Route;

// Default Laravel routes
Route::get('/', function () {
    return inertia('Home');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return inertia('Admin/Dashboard');
    })->name('dashboard');
});

// Portfolio routes from main.tsx
Route::get('/services', function () {
    return inertia('Services');
})->name('services');

Route::get('/branding', function () {
    return inertia('Branding');
})->name('branding');

Route::get('/laravel-backend', function () {
    return inertia('LaravelBackend');
})->name('laravel-backend');

Route::get('/marketing', function () {
    return inertia('Marketing');
})->name('marketing');

Route::get('/shopify', function () {
    return inertia('Shopify');
})->name('shopify');

Route::get('/amazon', function () {
    return inertia('Amazon');
})->name('amazon');

Route::get('/portfolio', [App\Http\Controllers\PortfolioController::class, 'index'])->name('portfolio');
Route::post('/portfolio/filter', [App\Http\Controllers\PortfolioController::class, 'index'])->name('portfolio.filter');

Route::get('/blogs', [App\Http\Controllers\BlogController::class, 'index'])->name('blogs');
Route::post('/blogs/filter', [App\Http\Controllers\BlogController::class, 'index'])->name('blogs.filter');
Route::get('/blogs/{slug}', [App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');
Route::get('/blogs/{slug}/related', [App\Http\Controllers\BlogController::class, 'related'])->name('blog.related');

Route::get('/about', function () {
    return inertia('About');
})->name('about');

Route::get('/contact', function () {
    return inertia('Contact');
})->name('contact');

// Fallback route for 404 errors
Route::fallback(function () {
    return inertia('ErrorPage');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
