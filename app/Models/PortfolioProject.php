<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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

    /**
     * Get the images for the portfolio project.
     */
    public function images(): HasMany
    {
        return $this->hasMany(PortfolioImage::class)->orderBy('display_order');
    }

    /**
     * Get the featured image for the portfolio project.
     */
    public function featuredImage()
    {
        return $this->images()->where('is_featured', true)->first();
    }

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['original_image'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = ['original_image'];

    /**
     * Store the original image path for tracking purposes.
     */
    protected $originalImagePath = null;

    /**
     * Get the original image attribute.
     *
     * @return string|null
     */
    public function getOriginalImageAttribute()
    {
        return $this->originalImagePath;
    }

    /**
     * Set the original image attribute.
     *
     * @param string|null $value
     * @return void
     */
    public function setOriginalImageAttribute($value)
    {
        $this->originalImagePath = $value;
    }

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Add a safeguard to prevent accidental deletion of the main image
        static::updating(function ($portfolioProject) {
            // If the main image is being removed but not replaced, and it wasn't null before
            if ($portfolioProject->image === null && $portfolioProject->getOriginal('image') !== null) {
                Log::warning('Prevented accidental removal of main image', [
                    'project_id' => $portfolioProject->id,
                    'original_image' => $portfolioProject->getOriginal('image'),
                    'is_dirty' => $portfolioProject->isDirty('image')
                ]);

                // Restore the original image
                $portfolioProject->image = $portfolioProject->getOriginal('image');
            }
        });

        // Add a safeguard for when portfolio images are deleted
        static::retrieved(function ($portfolioProject) {
            // Store the original image path when the model is retrieved
            $portfolioProject->original_image = $portfolioProject->image;
        });

        static::saved(function ($portfolioProject) {
            // Check if the main image was accidentally removed
            if ($portfolioProject->original_image && !$portfolioProject->image) {
                Log::warning('Detected main image was removed during save operation', [
                    'project_id' => $portfolioProject->id,
                    'original_image' => $portfolioProject->original_image
                ]);

                // Use direct DB update to avoid triggering model events
                DB::table('portfolio_projects')
                    ->where('id', $portfolioProject->id)
                    ->update(['image' => $portfolioProject->original_image]);

                // Refresh the model to get the updated image
                $portfolioProject->refresh();

                Log::info('Main image restored via direct DB update', [
                    'image' => $portfolioProject->image
                ]);
            }
        });
    }
}
