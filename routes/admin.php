<?php

use App\Http\Controllers\Admin\BlogPostController;
use App\Http\Controllers\Admin\BrandingController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\IndustryController;
use App\Http\Controllers\Admin\PageController;
use App\Http\Controllers\Admin\PortfolioImageController;
use App\Http\Controllers\Admin\PortfolioProjectController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UserController;
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

    // Portfolio Images
    Route::post('portfolio-projects/{projectId}/images', [PortfolioImageController::class, 'store'])->name('portfolio-images.store');
    Route::put('portfolio-images/{id}', [PortfolioImageController::class, 'update'])->name('portfolio-images.update');
    Route::delete('portfolio-images/{id}', [PortfolioImageController::class, 'destroy'])->name('portfolio-images.destroy');
    Route::post('portfolio-projects/{projectId}/images/reorder', [PortfolioImageController::class, 'reorder'])->name('portfolio-images.reorder');
    Route::post('portfolio-images/{id}/set-featured', [PortfolioImageController::class, 'setFeatured'])->name('portfolio-images.set-featured');

    // Categories
    Route::resource('categories', CategoryController::class);

    // Tags
    Route::resource('tags', TagController::class);

    // Brandings
    Route::resource('brandings', BrandingController::class);

    // Industries
    Route::resource('industries', IndustryController::class);

    // Pages
    Route::resource('pages', PageController::class);

    // Users
    Route::resource('users', UserController::class);

    // Roles
    Route::resource('roles', RoleController::class);
});
