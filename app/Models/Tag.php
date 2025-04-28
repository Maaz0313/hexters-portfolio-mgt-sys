<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Tag extends Model
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
    ];

    /**
     * Get all of the blog posts that are assigned this tag.
     */
    public function blogPosts(): MorphToMany
    {
        return $this->morphedByMany(BlogPost::class, 'taggable');
    }

    /**
     * Get all of the portfolio projects that are assigned this tag.
     */
    public function portfolioProjects(): MorphToMany
    {
        return $this->morphedByMany(PortfolioProject::class, 'taggable');
    }
}
