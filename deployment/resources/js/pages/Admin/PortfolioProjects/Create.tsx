import React, { useState, FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Save, X } from 'lucide-react';

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
  const { data, setData, post, processing, errors, reset } = useForm({
    title: '',
    description: '',
    image: null as File | null,
    image_alt: '',
    branding_id: '',
    industry_id: '',
    completion_date: '',
    is_featured: false,
    is_published: false,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Create Portfolio Project</h1>
                <div className="flex space-x-2">
                  <Link
                    href={route('admin.portfolio-projects.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:border-gray-500 focus:ring ring-gray-300 disabled:opacity-25 transition"
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

                    {/* Description */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                      )}
                    </div>

                    {/* Content and Client Information removed */}

                    {/* Branding and Industry */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="branding_id" className="block text-sm font-medium text-gray-700">
                          Branding
                        </label>
                        <select
                          id="branding_id"
                          value={data.branding_id}
                          onChange={(e) => setData('branding_id', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">Select Branding</option>
                          {brandings.map((branding) => (
                            <option key={branding.id} value={branding.id}>
                              {branding.name}
                            </option>
                          ))}
                        </select>
                        {errors.branding_id && (
                          <p className="mt-1 text-sm text-red-600">{errors.branding_id}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="industry_id" className="block text-sm font-medium text-gray-700">
                          Industry
                        </label>
                        <select
                          id="industry_id"
                          value={data.industry_id}
                          onChange={(e) => setData('industry_id', e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                          <option value="">Select Industry</option>
                          {industries.map((industry) => (
                            <option key={industry.id} value={industry.id}>
                              {industry.name}
                            </option>
                          ))}
                        </select>
                        {errors.industry_id && (
                          <p className="mt-1 text-sm text-red-600">{errors.industry_id}</p>
                        )}
                      </div>
                    </div>

                    {/* Completion Date */}
                    <div>
                      <label htmlFor="completion_date" className="block text-sm font-medium text-gray-700">
                        Completion Date
                      </label>
                      <input
                        type="date"
                        id="completion_date"
                        value={data.completion_date}
                        onChange={(e) => setData('completion_date', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      />
                      {errors.completion_date && (
                        <p className="mt-1 text-sm text-red-600">{errors.completion_date}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Image */}
                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Project Image
                      </label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="file"
                          id="image"
                          onChange={handleImageChange}
                          className="sr-only"
                          accept="image/*"
                        />
                        <label
                          htmlFor="image"
                          className="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition"
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
                      {errors.image && (
                        <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                      )}
                    </div>

                    {/* Image Alt Text */}
                    <div>
                      <label htmlFor="image_alt" className="block text-sm font-medium text-gray-700">
                        Image Alt Text
                      </label>
                      <input
                        type="text"
                        id="image_alt"
                        value={data.image_alt}
                        onChange={(e) => setData('image_alt', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        placeholder="Brief description of the image"
                      />
                      {errors.image_alt && (
                        <p className="mt-1 text-sm text-red-600">{errors.image_alt}</p>
                      )}
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
                          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label htmlFor="is_featured" className="ml-2 text-sm text-gray-700">
                          Featured project
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="is_published"
                          checked={data.is_published}
                          onChange={(e) => setData('is_published', e.target.checked)}
                          className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label htmlFor="is_published" className="ml-2 text-sm text-gray-700">
                          Publish immediately
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
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
