import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  type: 'blog' | 'portfolio';
  created_at: string;
}

interface Props {
  categories: {
    data: Category[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Categories',
    href: '/dashboard/categories',
  },
];

const Index = ({ categories }: Props) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Categories" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Categories</h1>
            <Link
              href={route('admin.categories.create')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
            >
              Create New Category
            </Link>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.data.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          <div className="text-sm text-gray-500">{category.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${category.type === 'blog' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                            {category.type === 'blog' ? 'Blog' : 'Portfolio'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.description ? (
                            <span className="truncate block max-w-xs">{category.description}</span>
                          ) : (
                            <span className="text-gray-400 italic">No description</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(category.created_at), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            href={route('admin.categories.edit', category.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route('admin.categories.show', category.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </Link>
                          <Link
                            href={route('admin.categories.destroy', category.id)}
                            method="delete"
                            as="button"
                            type="button"
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}

                    {categories.data.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No categories found. Create your first category!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {categories.last_page > 1 && (
                <div className="mt-4 flex justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(categories.current_page - 1) * categories.per_page + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(categories.current_page * categories.per_page, categories.total)}
                    </span>{" "}
                    of <span className="font-medium">{categories.total}</span> results
                  </div>

                  <div className="flex space-x-2">
                    {Array.from({ length: categories.last_page }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={route('admin.categories.index', { page })}
                        className={`px-3 py-1 rounded ${
                          page === categories.current_page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-600 hover:bg-blue-100'
                        }`}
                      >
                        {page}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
