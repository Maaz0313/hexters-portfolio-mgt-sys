import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import React, { FormEvent, useState } from 'react';

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

interface Props {
    brandings: Branding[];
    industries: Industry[];
}

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
        title: 'Create',
        href: '/dashboard/portfolio-projects/create',
    },
];

const Create = ({ brandings, industries }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm<any>({
        title: '',
        description: '',
        image: null as File | null,
        image_alt: '',
        branding_id: '',
        industry_id: '',
        completion_date: '',
        is_featured: false,
        is_published: false,
        images: [] as File[],
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.portfolio-projects.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
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

    // Tag handling removed

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Portfolio Project" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Create Portfolio Project</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.portfolio-projects.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Link>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
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
                                                    Select Main Image
                                                </label>
                                            </div>
                                            {previewUrl && (
                                                <div className="mt-2">
                                                    <img src={previewUrl} alt="Preview" className="h-40 w-full rounded-md object-cover" />
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

                                        {/* Additional Images */}
                                        <div className="mt-6">
                                            <h3 className="text-secondary mb-2 block text-sm font-medium">
                                                Upload Additional Images{' '}
                                                {selectedImages.length > 0 && (
                                                    <span className="text-primary ml-2">({selectedImages.length} selected)</span>
                                                )}
                                            </h3>
                                            <div className="flex items-center">
                                                <input
                                                    type="file"
                                                    id="additional_images"
                                                    onChange={(e) => {
                                                        if (e.target.files && e.target.files.length > 0) {
                                                            const filesArray = Array.from(e.target.files);
                                                            setSelectedImages(filesArray);
                                                            setData('images', filesArray);
                                                        }
                                                    }}
                                                    className="hidden"
                                                    accept="image/*"
                                                    multiple
                                                />
                                                <label
                                                    htmlFor="additional_images"
                                                    className="bg-background border-border text-card-foreground hover:bg-muted focus:ring-primary inline-flex cursor-pointer items-center rounded-md border px-4 py-2 text-xs font-semibold tracking-widest uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-25"
                                                >
                                                    Add Images
                                                </label>
                                            </div>
                                            <p className="text-muted-foreground mt-2 text-xs">
                                                You can select multiple images at once. Images will be uploaded when you save the project. Max 5MB per
                                                image.
                                            </p>
                                            {errors.images && <p className="text-destructive mt-1 text-sm">{errors.images}</p>}
                                        </div>

                                        {/* Category and Tags removed */}

                                        {/* Status Options */}
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
                                                    Publish immediately
                                                </label>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                {processing ? 'Saving...' : 'Save Project'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
