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
    featured_image: null as File | null,
    is_published: blogPost.is_published,
    tags: selectedTags,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    blogPost.featured_image ? `/storage/${blogPost.featured_image}` : null
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('admin.blog-posts.update', blogPost.id), {
      forceFormData: true
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
      <Head title={`Edit Blog Post: ${blogPost.title}`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Blog Post</h1>
                <div className="flex space-x-2">
                  <Link
                    href={route('admin.blog-posts.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:border-gray-500 focus:ring ring-gray-300 disabled:opacity-25 transition"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Link>
                  <Link
                    href={route('blog.show', blogPost.slug)}
                    target="_blank"
                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-800 focus:outline-none focus:border-green-800 focus:ring ring-green-300 disabled:opacity-25 transition"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    {/* Title */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                        Excerpt
                      </label>
                      <textarea
                        id="excerpt"
                        value={data.excerpt}
                        onChange={(e) => setData('excerpt', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {errors.excerpt && (
                        <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>
                      )}
                    </div>

                    {/* Content */}
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="content"
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        rows={15}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        required
                      />
                      {errors.content && (
                        <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Featured Image */}
                    <div>
                      <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700">
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
                          className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition"
                        >
                          {blogPost.featured_image ? 'Change Image' : 'Select Image'}
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
                        <p className="mt-1 text-sm text-red-600">{errors.featured_image}</p>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category_id"
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.category_id && (
                        <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                      </label>
                      <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-300 rounded-md p-2">
                        {tags.map((tag) => (
                          <div key={tag.id} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`tag-${tag.id}`}
                              checked={data.tags.includes(tag.id)}
                              onChange={() => handleTagChange(tag.id)}
                              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            <label htmlFor={`tag-${tag.id}`} className="ml-2 text-sm text-gray-700">
                              {tag.name}
                            </label>
                          </div>
                        ))}
                        {tags.length === 0 && (
                          <p className="text-sm text-gray-500">No tags available</p>
                        )}
                      </div>
                      {errors.tags && (
                        <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
                      )}
                    </div>

                    {/* Published Status */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="is_published"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                        {blogPost.is_published ? 'Published' : 'Publish'}
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
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
