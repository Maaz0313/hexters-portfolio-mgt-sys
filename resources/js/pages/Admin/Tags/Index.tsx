import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';

interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  blog_posts_count: number;
  portfolio_projects_count: number;
}

interface Props {
  tags: {
    data: Tag[];
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
    title: 'Tags',
    href: '/dashboard/tags',
  },
];

const Index = ({ tags }: Props) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Tags" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Tags</h1>
            <Link
              href={route('admin.tags.create')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
            >
              Create New Tag
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
                        Blog Posts
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Portfolio Projects
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
                    {tags.data.map((tag) => (
                      <tr key={tag.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                          <div className="text-sm text-gray-500">{tag.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tag.blog_posts_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tag.portfolio_projects_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(new Date(tag.created_at), 'MMM d, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            href={route('admin.tags.edit', tag.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Edit
                          </Link>
                          <Link
                            href={route('admin.tags.show', tag.id)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            View
                          </Link>
                          <Link
                            href={route('admin.tags.destroy', tag.id)}
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

                    {tags.data.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                          No tags found. Create your first tag!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {tags.last_page > 1 && (
                <div className="mt-4 flex justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(tags.current_page - 1) * tags.per_page + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(tags.current_page * tags.per_page, tags.total)}
                    </span>{" "}
                    of <span className="font-medium">{tags.total}</span> results
                  </div>

                  <div className="flex space-x-2">
                    {Array.from({ length: tags.last_page }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={route('admin.tags.index', { page })}
                        className={`px-3 py-1 rounded ${
                          page === tags.current_page
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
