<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class PortfolioProject extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'image',
        'image_alt',
        'branding_id',
        'industry_id',
        'completion_date',
        'is_featured',
        'is_published',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'completion_date' => 'date',
    ];

    /**
     * Get the user that owns the portfolio project.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the branding that owns the portfolio project.
     */
    public function branding(): BelongsTo
    {
        return $this->belongsTo(Branding::class);
    }

    /**
     * Get the industry that owns the portfolio project.
     */
    public function industry(): BelongsTo
    {
        return $this->belongsTo(Industry::class);
    }
}
