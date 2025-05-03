import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FileText, Save, X } from 'lucide-react';
import React, { FormEvent, useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image: string | null;
    is_published: boolean;
    published_at: string | null;
    category_id: number | null;
    tags: Tag[];
}

interface Props {
    blogPost: BlogPost;
    categories: Category[];
    tags: Tag[];
    selectedTags: number[];
}

const Edit = ({ blogPost, categories, tags, selectedTags }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Blog Posts',
            href: '/dashboard/blog-posts',
        },
        {
            title: 'Edit',
            href: `/dashboard/blog-posts/${blogPost.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: blogPost.title,
        category_id: blogPost.category_id?.toString() || '',
        excerpt: blogPost.excerpt || '',
        content: blogPost.content,
        featured_image: null as File | null, // Will only be sent if a new image is selected
        thumbnail_image: null as File | null, // Will only be sent if a new thumbnail is selected
        is_published: blogPost.is_published,
        tags: selectedTags,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(blogPost.featured_image ? `/storage/${blogPost.featured_image}` : null);
    const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
        blogPost.thumbnail_image ? `/storage/${blogPost.thumbnail_image}` : null,
    );

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.blog-posts.update', blogPost.id), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('featured_image', file);

            // Create a preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewUrl(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('thumbnail_image', file);

            // Create a preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setThumbnailPreviewUrl(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTagChange = (tagId: number) => {
        const currentTags = [...data.tags];
        const index = currentTags.indexOf(tagId);

        if (index === -1) {
            // Add tag
            setData('tags', [...currentTags, tagId]);
        } else {
            // Remove tag
            currentTags.splice(index, 1);
            setData('tags', currentTags);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Blog Post: ${blogPost.title}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Edit Blog Post</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.blog-posts.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Link>
                                    <Link
                                        href={route('blog.show', blogPost.slug)}
                                        target="_blank"
                                        className="bg-accent text-accent-foreground hover:bg-accent/80 ring-accent inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <FileText className="mr-2 h-4 w-4" />
                                        View
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
                                            {data.title !== blogPost.title && (
                                                <p className="text-accent mt-1 text-sm">Note: Changing the title will update the URL slug.</p>
                                            )}
                                            <p className="text-muted-foreground mt-1 text-sm">
                                                Current URL: {window.location.origin}/blogs/{blogPost.slug}
                                            </p>
                                            {errors.title && <p className="text-destructive mt-1 text-sm">{errors.title}</p>}
                                        </div>

                                        {/* Excerpt */}
                                        <div>
                                            <label htmlFor="excerpt" className="text-card-foreground block text-sm font-medium">
                                                Excerpt
                                            </label>
                                            <textarea
                                                id="excerpt"
                                                value={data.excerpt}
                                                onChange={(e) => setData('excerpt', e.target.value)}
                                                rows={3}
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                            />
                                            {errors.excerpt && <p className="text-destructive mt-1 text-sm">{errors.excerpt}</p>}
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <label htmlFor="content" className="text-card-foreground block text-sm font-medium">
                                                Content <span className="text-destructive">*</span>
                                            </label>
                                            <textarea
                                                id="content"
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                rows={15}
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            <p className="text-muted-foreground mt-1 text-sm">
                                                You can use HTML tags for formatting. For example, use &lt;h2&gt; for headings, &lt;p&gt; for
                                                paragraphs, &lt;a href="..."&gt; for links, etc.
                                            </p>
                                            {errors.content && <p className="text-destructive mt-1 text-sm">{errors.content}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Featured Image */}
                                        <div>
                                            <label htmlFor="featured_image" className="text-card-foreground block text-sm font-medium">
                                                Featured Image
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <input
                                                    type="file"
                                                    id="featured_image"
                                                    onChange={handleImageChange}
                                                    className="sr-only"
                                                    accept="image/*"
                                                />
                                                <label
                                                    htmlFor="featured_image"
                                                    className="bg-background border-border text-card-foreground hover:bg-muted focus:ring-primary inline-flex cursor-pointer items-center rounded-md border px-4 py-2 text-xs font-semibold tracking-widest uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-25"
                                                >
                                                    {blogPost.featured_image ? 'Change Image' : 'Select Image'}
                                                </label>
                                            </div>
                                            {previewUrl && (
                                                <div className="mt-2">
                                                    <img src={previewUrl} alt="Preview" className="h-40 w-full rounded-md object-cover" />
                                                </div>
                                            )}
                                            <p className="text-muted-foreground mt-1 text-sm">
                                                This image will be displayed on the blog post page. The current image will be preserved unless you
                                                select a new one.
                                            </p>
                                            {errors.featured_image && <p className="text-destructive mt-1 text-sm">{errors.featured_image}</p>}
                                        </div>

                                        {/* Thumbnail Image */}
                                        <div>
                                            <label htmlFor="thumbnail_image" className="text-card-foreground block text-sm font-medium">
                                                Thumbnail Image
                                            </label>
                                            <div className="mt-1 flex items-center">
                                                <input
                                                    type="file"
                                                    id="thumbnail_image"
                                                    onChange={handleThumbnailChange}
                                                    className="sr-only"
                                                    accept="image/*"
                                                />
                                                <label
                                                    htmlFor="thumbnail_image"
                                                    className="bg-background border-border text-card-foreground hover:bg-muted focus:ring-primary inline-flex cursor-pointer items-center rounded-md border px-4 py-2 text-xs font-semibold tracking-widest uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-25"
                                                >
                                                    {blogPost.thumbnail_image ? 'Change Thumbnail' : 'Select Thumbnail'}
                                                </label>
                                            </div>
                                            {thumbnailPreviewUrl && (
                                                <div className="mt-2">
                                                    <img
                                                        src={thumbnailPreviewUrl}
                                                        alt="Thumbnail Preview"
                                                        className="h-40 w-full rounded-md object-cover"
                                                    />
                                                </div>
                                            )}
                                            <p className="text-muted-foreground mt-1 text-sm">
                                                This image will be displayed on blog cards. If not provided, the featured image will be used. The
                                                current thumbnail will be preserved unless you select a new one.
                                            </p>
                                            {errors.thumbnail_image && <p className="text-destructive mt-1 text-sm">{errors.thumbnail_image}</p>}
                                        </div>

                                        {/* Category */}
                                        <div>
                                            <label htmlFor="category_id" className="text-card-foreground block text-sm font-medium">
                                                Category
                                            </label>
                                            <select
                                                id="category_id"
                                                value={data.category_id}
                                                onChange={(e) => setData('category_id', e.target.value)}
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.category_id && <p className="text-destructive mt-1 text-sm">{errors.category_id}</p>}
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <label className="text-card-foreground mb-2 block text-sm font-medium">Tags</label>
                                            <div className="border-border bg-background max-h-60 space-y-2 overflow-y-auto rounded-md border p-2">
                                                {tags.map((tag) => (
                                                    <div key={tag.id} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`tag-${tag.id}`}
                                                            checked={data.tags.includes(tag.id)}
                                                            onChange={() => handleTagChange(tag.id)}
                                                            className="border-border text-primary focus:border-primary focus:ring-primary focus:ring-opacity-50 rounded shadow-sm focus:ring"
                                                        />
                                                        <label htmlFor={`tag-${tag.id}`} className="text-card-foreground ml-2 text-sm">
                                                            {tag.name}
                                                        </label>
                                                    </div>
                                                ))}
                                                {tags.length === 0 && <p className="text-muted-foreground text-sm">No tags available</p>}
                                            </div>
                                            {errors.tags && <p className="text-destructive mt-1 text-sm">{errors.tags}</p>}
                                        </div>

                                        {/* Published Status */}
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="is_published"
                                                checked={data.is_published}
                                                onChange={(e) => setData('is_published', e.target.checked)}
                                                className="border-border text-primary focus:border-primary focus:ring-primary focus:ring-opacity-50 rounded shadow-sm focus:ring"
                                            />
                                            <label htmlFor="is_published" className="text-card-foreground ml-2 text-sm">
                                                {blogPost.is_published ? 'Published' : 'Publish'}
                                            </label>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                {processing ? 'Saving...' : 'Update Blog Post'}
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

export default Edit;
