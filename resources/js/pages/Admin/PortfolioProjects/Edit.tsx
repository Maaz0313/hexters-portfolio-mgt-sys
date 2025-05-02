import ImageGallery from '@/components/ImageGallery';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, Save, Upload, X } from 'lucide-react';
import React, { FormEvent, useRef, useState } from 'react';

// Removed unused interfaces

interface Branding {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface Industry {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface PortfolioImage {
    id: number;
    image_path: string;
    alt_text: string | null;
    display_order: number;
    is_featured: boolean;
}

interface PortfolioProject {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    image_alt: string | null;
    branding_id: number | null;
    industry_id: number | null;
    branding: Branding | null;
    industry: Industry | null;
    completion_date: string | null;
    is_featured: boolean;
    is_published: boolean;
    images: PortfolioImage[];
}

interface Props {
    portfolioProject: PortfolioProject;
    brandings: Branding[];
    industries: Industry[];
}

const Edit = ({ portfolioProject, brandings, industries }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Portfolio Projects',
            href: '/dashboard/portfolio-projects',
        },
        {
            title: 'Edit',
            href: `/dashboard/portfolio-projects/${portfolioProject.id}/edit`,
        },
    ];

    // Format the completion date to YYYY-MM-DD for the date input
    const formatDateForInput = (dateString: string | null): string => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    };

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: portfolioProject.title,
        description: portfolioProject.description || '',
        image: null as File | null,
        image_alt: portfolioProject.image_alt || '',
        branding_id: portfolioProject.branding_id?.toString() || '',
        industry_id: portfolioProject.industry_id?.toString() || '',
        completion_date: formatDateForInput(portfolioProject.completion_date),
        is_featured: portfolioProject.is_featured,
        is_published: portfolioProject.is_published,
        redirect_to: 'edit',
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(portfolioProject.image ? `/storage/${portfolioProject.image}` : null);

    // Form for additional images
    const additionalImagesForm = useForm({
        images: [] as File[],
    });

    // Forms for image operations
    const deleteImageForm = useForm({
        _method: 'DELETE',
    });

    const setFeaturedForm = useForm({});

    // Reference to the file input for additional images
    const additionalImagesInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Submitting form with data:', data);

        post(route('admin.portfolio-projects.update', portfolioProject.id), {
            forceFormData: true,
            onSuccess: () => {
                console.log('Portfolio project updated successfully');
                // If there was a preview URL (new image selected), clear it to show the updated image from the server
                if (previewUrl && previewUrl.startsWith('data:')) {
                    setPreviewUrl(null);
                }
            },
            onError: (errors) => {
                console.error('Error updating portfolio project:', errors);
            },
            preserveScroll: true,
            preserveState: false, // Don't preserve state to ensure we get fresh data from the server
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);

            // Create a preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewUrl(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handler for additional images
    const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Convert FileList to array
            const filesArray = Array.from(e.target.files);
            console.log('Files selected:', filesArray);
            additionalImagesForm.setData('images', filesArray);
        }
    };

    // Handler for uploading additional images
    const handleUploadAdditionalImages = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Uploading images:', additionalImagesForm.data.images);

        // Create a FormData object manually to ensure files are properly added
        const formData = new FormData();
        additionalImagesForm.data.images.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        // Use the Inertia form submit instead of router.post
        additionalImagesForm.post(route('admin.portfolio-images.store', portfolioProject.id), {
            forceFormData: true,
            onSuccess: () => {
                console.log('Upload successful');

                // Reset the form and file input
                additionalImagesForm.reset();
                if (additionalImagesInputRef.current) {
                    additionalImagesInputRef.current.value = '';
                }
            },
            onError: (errors) => {
                console.error('Upload failed:', errors);
                // Keep error messages visible to the user
            },
            preserveScroll: true,
            preserveState: true, // Preserve state to keep the form values
        });
    };

    // Tag handling removed

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Portfolio Project: ${portfolioProject.title}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Edit Portfolio Project</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.portfolio-projects.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Link>
                                    <Link
                                        href={route('admin.portfolio-projects.show', portfolioProject.id)}
                                        className="bg-accent text-accent-foreground hover:bg-accent/80 ring-accent inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        View
                                    </Link>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="redirect_to" value="edit" />
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="space-y-6 md:col-span-2">
                                        {/* Title */}
                                        <div>
                                            <label htmlFor="title" className="text-card-foreground block text-sm font-medium">
                                                Title <span className="text-destructive">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            {errors.title && <p className="text-destructive mt-1 text-sm">{errors.title}</p>}
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <label htmlFor="description" className="text-card-foreground block text-sm font-medium">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                rows={3}
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                            />
                                            {errors.description && <p className="text-destructive mt-1 text-sm">{errors.description}</p>}
                                        </div>

                                        {/* Content and Client Information removed */}

                                        {/* Branding and Industry */}
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <label htmlFor="branding_id" className="text-card-foreground block text-sm font-medium">
                                                    Branding
                                                </label>
                                                <select
                                                    id="branding_id"
                                                    value={data.branding_id}
                                                    onChange={(e) => setData('branding_id', e.target.value)}
                                                    className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                >
                                                    <option value="">Select Branding</option>
                                                    {brandings.map((branding) => (
                                                        <option key={branding.id} value={branding.id}>
                                                            {branding.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.branding_id && <p className="text-destructive mt-1 text-sm">{errors.branding_id}</p>}
                                            </div>
                                            <div>
                                                <label htmlFor="industry_id" className="text-card-foreground block text-sm font-medium">
                                                    Industry
                                                </label>
                                                <select
                                                    id="industry_id"
                                                    value={data.industry_id}
                                                    onChange={(e) => setData('industry_id', e.target.value)}
                                                    className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                >
                                                    <option value="">Select Industry</option>
                                                    {industries.map((industry) => (
                                                        <option key={industry.id} value={industry.id}>
                                                            {industry.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {errors.industry_id && <p className="text-destructive mt-1 text-sm">{errors.industry_id}</p>}
                                            </div>
                                        </div>

                                        {/* Completion Date */}
                                        <div>
                                            <label htmlFor="completion_date" className="text-card-foreground block text-sm font-medium">
                                                Completion Date
                                            </label>
                                            <input
                                                type="date"
                                                id="completion_date"
                                                value={data.completion_date}
                                                onChange={(e) => setData('completion_date', e.target.value)}
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                            />
                                            {errors.completion_date && <p className="text-destructive mt-1 text-sm">{errors.completion_date}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Main Image */}
                                        <div>
                                            <label htmlFor="image" className="text-card-foreground block text-sm font-medium">
                                                Main Project Image
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <input type="file" id="image" onChange={handleImageChange} className="sr-only" accept="image/*" />
                                                <label
                                                    htmlFor="image"
                                                    className="bg-background border-border text-card-foreground hover:bg-muted focus:ring-primary inline-flex cursor-pointer items-center rounded-md border px-4 py-2 text-xs font-semibold tracking-widest uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-25"
                                                >
                                                    {portfolioProject.image ? 'Change Main Image' : 'Select Main Image'}
                                                </label>
                                            </div>
                                            {/* Show either the preview URL (if a new image was selected) or the existing image */}
                                            {(previewUrl || portfolioProject.image) && (
                                                <div className="mt-2">
                                                    <img
                                                        src={previewUrl || (portfolioProject.image ? `/storage/${portfolioProject.image}` : '')}
                                                        alt="Preview"
                                                        className="h-40 w-full rounded-md object-cover"
                                                        onError={(e) => {
                                                            console.error('Main image failed to load');
                                                            e.currentTarget.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            {errors.image && <p className="text-destructive mt-1 text-sm">{errors.image}</p>}
                                        </div>

                                        {/* Image Alt Text */}
                                        <div>
                                            <label htmlFor="image_alt" className="text-card-foreground block text-sm font-medium">
                                                Main Image Alt Text
                                            </label>
                                            <input
                                                type="text"
                                                id="image_alt"
                                                value={data.image_alt}
                                                onChange={(e) => setData('image_alt', e.target.value)}
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                placeholder="Brief description of the main image"
                                            />
                                            {errors.image_alt && <p className="text-destructive mt-1 text-sm">{errors.image_alt}</p>}
                                        </div>

                                        {/* Project Images Gallery */}
                                        {portfolioProject.images && portfolioProject.images.length > 0 && (
                                            <div className="mt-6">
                                                <h3 className="text-card-foreground mb-2 block text-sm font-medium">Project Images</h3>
                                                <ImageGallery
                                                    images={portfolioProject.images}
                                                    editable={true}
                                                    onDelete={(imageId: number) => {
                                                        // Find the image to be deleted
                                                        const imageToDelete = portfolioProject.images.find((img) => img.id === imageId);

                                                        if (!imageToDelete) {
                                                            console.error('Image not found:', imageId);
                                                            return;
                                                        }

                                                        // Check if this image path matches the main project image
                                                        const normalizeImagePath = (path: string | null) => {
                                                            if (!path) return '';
                                                            // Remove leading slashes and normalize storage/ prefix
                                                            return path.replace(/^\/+/, '').replace(/^storage\//, '');
                                                        };

                                                        const mainImagePath = normalizeImagePath(portfolioProject.image);
                                                        const imageToDeletePath = normalizeImagePath(imageToDelete.image_path);

                                                        console.log('Comparing paths:', {
                                                            mainImagePath,
                                                            imageToDeletePath,
                                                            originalMainImage: portfolioProject.image,
                                                            originalImagePath: imageToDelete.image_path,
                                                        });

                                                        if (mainImagePath && imageToDeletePath && mainImagePath === imageToDeletePath) {
                                                            alert('Cannot delete the main project image. Please change the main image first.');
                                                            return;
                                                        }

                                                        if (confirm('Are you sure you want to delete this image?')) {
                                                            console.log('Deleting image with ID:', imageId);

                                                            // Disable rapid successive deletions
                                                            if (deleteImageForm.processing) {
                                                                console.warn('Another deletion is in progress. Please wait.');
                                                                return;
                                                            }

                                                            // Use the pre-defined form to delete the image
                                                            deleteImageForm.delete(route('admin.portfolio-images.destroy', imageId), {
                                                                preserveScroll: true,
                                                                preserveState: true,
                                                                onSuccess: () => {
                                                                    console.log('Image deleted successfully');
                                                                },
                                                                onError: (errors) => {
                                                                    console.error('Error deleting image:', errors);
                                                                },
                                                            });
                                                        }
                                                    }}
                                                    onSetFeatured={(imageId: number) => {
                                                        if (confirm('Set this image as featured?')) {
                                                            // Use the pre-defined form to set the image as featured
                                                            setFeaturedForm.post(route('admin.portfolio-images.set-featured', imageId), {
                                                                preserveScroll: true,
                                                                preserveState: true,
                                                                onSuccess: () => {
                                                                    console.log('Image set as featured successfully');
                                                                },
                                                                onError: (errors) => {
                                                                    console.error('Error setting image as featured:', errors);
                                                                },
                                                            });
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Status Options moved up to make space for the additional images form outside the main form */}
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="is_featured"
                                                    checked={data.is_featured}
                                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                                    className="border-border text-primary focus:border-primary focus:ring-primary focus:ring-opacity-50 rounded shadow-sm focus:ring"
                                                />
                                                <label htmlFor="is_featured" className="text-card-foreground ml-2 text-sm">
                                                    Featured project
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id="is_published"
                                                    checked={data.is_published}
                                                    onChange={(e) => setData('is_published', e.target.checked)}
                                                    className="border-border text-primary focus:border-primary focus:ring-primary focus:ring-opacity-50 rounded shadow-sm focus:ring"
                                                />
                                                <label htmlFor="is_published" className="text-card-foreground ml-2 text-sm">
                                                    {portfolioProject.is_published ? 'Published' : 'Publish'}
                                                </label>
                                            </div>
                                        </div>

                                        {/* Category and Tags removed */}

                                        {/* Submit Button */}
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                {processing ? 'Saving...' : 'Update Project'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Upload Additional Images - Moved outside the main form */}
                            <div className="border-border mt-6 border-t p-6">
                                <h3 className="text-card-foreground mb-4 text-lg font-medium">Upload Additional Images</h3>
                                <form onSubmit={handleUploadAdditionalImages}>
                                    <div className="mt-1 flex items-center">
                                        <input
                                            type="file"
                                            id="additional_images"
                                            ref={additionalImagesInputRef}
                                            className="sr-only"
                                            accept="image/*"
                                            multiple
                                            onChange={handleAdditionalImagesChange}
                                        />
                                        <label
                                            htmlFor="additional_images"
                                            className="bg-background border-border text-card-foreground hover:bg-muted focus:ring-primary inline-flex cursor-pointer items-center rounded-md border px-4 py-2 text-xs font-semibold tracking-widest uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-25"
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Select Images
                                        </label>
                                        <button
                                            type="submit"
                                            disabled={additionalImagesForm.processing || additionalImagesForm.data.images.length === 0}
                                            className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary ml-2 inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                        >
                                            <Save className="mr-2 h-4 w-4" />
                                            {additionalImagesForm.processing ? 'Uploading...' : 'Upload Images'}
                                        </button>
                                    </div>
                                    {additionalImagesForm.data.images.length > 0 && (
                                        <p className="text-primary mt-2 text-xs">
                                            {additionalImagesForm.data.images.length}{' '}
                                            {additionalImagesForm.data.images.length === 1 ? 'image' : 'images'} selected
                                        </p>
                                    )}
                                    <p className="text-secondary mt-2 text-xs">
                                        You can select multiple images at once. Images will be uploaded when you click "Upload Images". Max 5MB per
                                        image.
                                    </p>
                                    {additionalImagesForm.errors.images && (
                                        <p className="text-destructive mt-1 text-sm">{additionalImagesForm.errors.images}</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
