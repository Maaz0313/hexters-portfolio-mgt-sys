import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit, ArrowLeft, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  blog_posts_count: number;
  portfolio_projects_count: number;
}

interface Props {
  tag: Tag;
}

const Show = ({ tag }: Props) => {
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
      title: tag.name,
      href: `/dashboard/tags/${tag.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Tag: ${tag.name}`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{tag.name}</h1>
                <div className="flex space-x-2">
                  <Link
                    href={route('admin.tags.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:border-gray-500 focus:ring ring-gray-300 disabled:opacity-25 transition"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Link>
                  <Link
                    href={route('admin.tags.edit', tag.id)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                  <Link
                    href={route('admin.tags.destroy', tag.id)}
                    method="delete"
                    as="button"
                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-800 focus:outline-none focus:border-red-800 focus:ring ring-red-300 disabled:opacity-25 transition"
                    onClick={(e) => {
                      if (!confirm('Are you sure you want to delete this tag?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Basic Information</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <span className="font-medium text-gray-700">Name:</span>
                          <p className="text-gray-600">{tag.name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Slug:</span>
                          <p className="text-gray-600">{tag.slug}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Usage Stats */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Usage Statistics</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <span className="font-medium text-gray-700">Blog Posts:</span>
                          <p className="text-gray-600">{tag.blog_posts_count}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Portfolio Projects:</span>
                          <p className="text-gray-600">{tag.portfolio_projects_count}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Total Usage:</span>
                          <p className="text-gray-600">{tag.blog_posts_count + tag.portfolio_projects_count}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Timestamps */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Timestamps</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <span className="font-medium text-gray-700">Created:</span>
                          <p className="text-gray-600">{format(new Date(tag.created_at), 'MMM d, yyyy h:mm a')}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Last Updated:</span>
                          <p className="text-gray-600">{format(new Date(tag.updated_at), 'MMM d, yyyy h:mm a')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Actions</h2>
                    <div className="bg-gray-100 rounded-md p-4 space-y-2">
                      {tag.blog_posts_count > 0 && (
                        <Link
                          href={route('admin.blog-posts.index', { tag: tag.id })}
                          className="block w-full text-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition"
                        >
                          View Blog Posts with this Tag
                        </Link>
                      )}
                      {tag.portfolio_projects_count > 0 && (
                        <Link
                          href={route('admin.portfolio-projects.index', { tag: tag.id })}
                          className="block w-full text-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition"
                        >
                          View Portfolio Projects with this Tag
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
