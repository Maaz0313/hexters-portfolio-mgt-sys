<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'type',
    ];

    /**
     * Get the blog posts for the category.
     */
    public function blogPosts(): HasMany
    {
        return $this->hasMany(BlogPost::class);
    }

    /**
     * Get the portfolio projects for the category.
     */
    public function portfolioProjects(): HasMany
    {
        return $this->hasMany(PortfolioProject::class);
    }

    /**
     * Scope a query to only include blog categories.
     */
    public function scopeBlog($query)
    {
        return $query->where('type', 'blog');
    }

    /**
     * Scope a query to only include portfolio categories.
     */
    public function scopePortfolio($query)
    {
        return $query->where('type', 'portfolio');
    }
}
