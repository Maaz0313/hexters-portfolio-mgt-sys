import React, { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Save, X } from 'lucide-react';

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Props {
  tag: Tag;
}

const Edit = ({ tag }: Props) => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Tags',
      href: '/dashboard/tags',
    },
    {
      title: 'Edit',
      href: `/dashboard/tags/${tag.id}/edit`,
    },
  ];

  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    name: tag.name,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    post(route('admin.tags.update', tag.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Tag: ${tag.name}`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Edit Tag</h1>
                <div className="flex space-x-2">
                  <Link
                    href={route('admin.tags.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:border-gray-500 focus:ring ring-gray-300 disabled:opacity-25 transition"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Link>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6 max-w-xl">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Tags can be used for both blog posts and portfolio projects.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {processing ? 'Saving...' : 'Update Tag'}
                    </button>
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
