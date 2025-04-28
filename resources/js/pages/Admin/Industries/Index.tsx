import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';

interface Industry {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  portfolio_projects_count: number;
}

interface Props {
  industries: {
    data: Industry[];
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
    title: 'Industries',
    href: '/dashboard/industries',
  },
];

const Index = ({ industries }: Props) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Industries" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Industries</h1>
            <Link
              href={route('admin.industries.create')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
            >
              Create New Industry
            </Link>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Projects
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created At
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {industries.data.length > 0 ? (
                      industries.data.map((industry) => (
                        <tr key={industry.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{industry.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500">
                              {industry.description ? (
                                industry.description.length > 100 ? (
                                  industry.description.substring(0, 100) + '...'
                                ) : (
                                  industry.description
                                )
                              ) : (
                                <span className="text-gray-400 italic">No description</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {industry.portfolio_projects_count}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {format(new Date(industry.created_at), 'MMM d, yyyy')}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <Link
                                href={route('admin.industries.show', industry.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View
                              </Link>
                              <Link
                                href={route('admin.industries.edit', industry.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Edit
                              </Link>
                              <Link
                                href={route('admin.industries.destroy', industry.id)}
                                method="delete"
                                as="button"
                                type="button"
                                className="text-red-600 hover:text-red-900"
                                onClick={(e) => {
                                  if (!confirm('Are you sure you want to delete this industry?')) {
                                    e.preventDefault();
                                  }
                                }}
                              >
                                Delete
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No industries found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {industries.last_page > 1 && (
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing {(industries.current_page - 1) * industries.per_page + 1} to{' '}
                    {Math.min(industries.current_page * industries.per_page, industries.total)} of{' '}
                    {industries.total} results
                  </div>
                  <div className="flex space-x-2">
                    {Array.from({ length: industries.last_page }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={route('admin.industries.index', { page })}
                        className={`px-3 py-1 rounded ${
                          page === industries.current_page
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
