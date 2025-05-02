import React, { useState, FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { FileText, Save, X } from 'lucide-react';

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  tags: Tag[];
}

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
    title: 'Create',
    href: '/dashboard/blog-posts/create',
  },
];

const Create = ({ categories, tags }: Props) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    category_id: '',
    excerpt: '',
    content: '',
    featured_image: null as File | null,
    is_published: false,
    tags: [] as number[],
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('admin.blog-posts.store'), {
      forceFormData: true,
      onSuccess: () => reset(),
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
      <Head title="Create Blog Post" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-card border-b border-border">
              <div className="flex justify-between items-center mb-6">
                <h1 className="title-text text-2xl font-bold text-primary">Create Blog Post</h1>
                <div className="flex space-x-2">
                  <Link
                    href={route('admin.blog-posts.index')}
                    className="inline-flex items-center px-4 py-2 bg-muted border border-transparent rounded-md font-semibold text-xs text-muted-foreground uppercase tracking-widest hover:bg-muted/80 active:bg-muted/70 focus:outline-none focus:ring ring-muted disabled:opacity-25 transition cursor-pointer"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Link>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-card-foreground">
                        Title <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-muted border-border text-card-foreground shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                        required
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-accent">{errors.title}</p>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label htmlFor="excerpt" className="block text-sm font-medium text-card-foreground">
                        Excerpt
                      </label>
                      <textarea
                        id="excerpt"
                        value={data.excerpt}
                        onChange={(e) => setData('excerpt', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md bg-muted border-border text-card-foreground shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                      />
                      {errors.excerpt && (
                        <p className="mt-1 text-sm text-accent">{errors.excerpt}</p>
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-card-foreground">
                        Content <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="content"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        rows={15}
                        className="mt-1 block w-full rounded-md bg-muted border-border text-card-foreground shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                        required
                      />
                      {errors.content && (
                        <p className="mt-1 text-sm text-accent">{errors.content}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Featured Image */}
                    <div>
                      <label htmlFor="featured_image" className="block text-sm font-medium text-card-foreground">
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
                          className="cursor-pointer inline-flex items-center px-4 py-2 bg-muted border border-border rounded-md font-semibold text-xs text-muted-foreground uppercase tracking-widest shadow-sm hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-25 transition"
                        >
                          Select Image
                        </label>
                      </div>
                      {previewUrl && (
                        <div className="mt-2">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-40 w-full object-cover rounded-md"
                          />
                        </div>
                      )}
                      {errors.featured_image && (
                        <p className="mt-1 text-sm text-accent">{errors.featured_image}</p>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label htmlFor="category_id" className="block text-sm font-medium text-card-foreground">
                        Category
                      </label>
                      <select
                        id="category_id"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="mt-1 block w-full rounded-md bg-muted border-border text-card-foreground shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category_id && (
                        <p className="mt-1 text-sm text-accent">{errors.category_id}</p>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-card-foreground mb-2">
                        Tags
                      </label>
                      <div className="space-y-2 max-h-60 overflow-y-auto border border-border bg-muted rounded-md p-2">
                        {tags.map((tag) => (
                          <div key={tag.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`tag-${tag.id}`}
                              checked={data.tags.includes(tag.id)}
                              onChange={() => handleTagChange(tag.id)}
                              className="rounded border-border text-accent shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 cursor-pointer"
                            />
                            <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-card-foreground cursor-pointer">
                              {tag.name}
                            </label>
                          </div>
                        ))}
                        {tags.length === 0 && (
                          <p className="text-sm text-muted-foreground">No tags available</p>
                        )}
                      </div>
                      {errors.tags && (
                        <p className="mt-1 text-sm text-accent">{errors.tags}</p>
                      )}
                    </div>

                    {/* Published Status */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_published"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                        className="rounded border-border text-accent shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50 cursor-pointer"
                      />
                      <label htmlFor="is_published" className="ml-2 text-sm text-card-foreground cursor-pointer">
                        Publish immediately
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex justify-center items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 active:bg-opacity-80 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition cursor-pointer"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Blog Post'}
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
