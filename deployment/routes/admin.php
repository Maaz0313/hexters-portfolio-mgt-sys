<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\BrandingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\IndustryController;
use App\Http\Controllers\Admin\PortfolioProjectController;
use App\Http\Controllers\Admin\TagController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::middleware(['auth', 'admin'])->prefix('dashboard')->name('admin.')->group(function () {
    // Blog Posts
    Route::resource('blog-posts', BlogPostController::class);

    // Portfolio Projects
    Route::resource('portfolio-projects', PortfolioProjectController::class);

    // Categories
    Route::resource('categories', CategoryController::class);

    // Tags
    Route::resource('tags', TagController::class);

    // Brandings
    Route::resource('brandings', BrandingController::class);

    // Industries
    Route::resource('industries', IndustryController::class);
});
