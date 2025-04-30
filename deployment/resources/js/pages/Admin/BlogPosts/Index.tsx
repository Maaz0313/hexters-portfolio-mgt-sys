import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  user: {
    name: string;
  };
  category: {
    name: string;
  } | null;
}

interface Props {
  blogPosts: {
    data: BlogPost[];
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
    title: 'Blog Posts',
    href: '/dashboard/blog-posts',
  },
];

const Index = ({ blogPosts }: Props) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Blog Posts" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
            <Link
              href={route('admin.blog-posts.create')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
            >
              Create New Post
            </Link>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {blogPosts.data.map((post) => (
                      <tr key={post.id}>
                        <td className="px-4 py-3">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{post.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[200px]">{post.slug}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {post.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {post.category ? post.category.name : 'Uncategorized'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {post.user.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {format(new Date(post.created_at), 'MMM d, yyyy')}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          <div className="flex flex-wrap gap-2">
                            <Link
                              href={route('admin.blog-posts.edit', post.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <Link
                              href={route('admin.blog-posts.show', post.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </Link>
                            <Link
                              href={route('blog.show', post.slug)}
                              className="text-green-600 hover:text-green-900"
                              target="_blank"
                            >
                              Preview
                            </Link>
                            <Link
                              href={route('admin.blog-posts.destroy', post.id)}
                              method="delete"
                              as="button"
                              type="button"
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {blogPosts.data.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No blog posts found. Create your first blog post!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {blogPosts.last_page > 1 && (
                <div className="mt-4 flex justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(blogPosts.current_page - 1) * blogPosts.per_page + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(blogPosts.current_page * blogPosts.per_page, blogPosts.total)}
                    </span>{" "}
                    of <span className="font-medium">{blogPosts.total}</span> results
                  </div>

                  <div className="flex space-x-2">
                    {Array.from({ length: blogPosts.last_page }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={route('admin.blog-posts.index', { page })}
                        className={`px-3 py-1 rounded ${
                          page === blogPosts.current_page
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
