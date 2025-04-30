import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit, ArrowLeft, Eye, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface Tag {
  id: number;
  name: string;
  slug: string;
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
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  tags: Tag[];
}

interface Props {
  blogPost: BlogPost;
}

const Show = ({ blogPost }: Props) => {
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
      title: blogPost.title,
      href: `/dashboard/blog-posts/${blogPost.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Blog Post: ${blogPost.title}`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{blogPost.title}</h1>
                <div className="flex space-x-2">
                  <Link
                    href={route('admin.blog-posts.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:border-gray-500 focus:ring ring-gray-300 disabled:opacity-25 transition"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Link>
                  <Link
                    href={route('blog.show', blogPost.slug)}
                    target="_blank"
                    className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 active:bg-green-800 focus:outline-none focus:border-green-800 focus:ring ring-green-300 disabled:opacity-25 transition"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                  <Link
                    href={route('admin.blog-posts.edit', blogPost.id)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                  <Link
                    href={route('admin.blog-posts.destroy', blogPost.id)}
                    method="delete"
                    as="button"
                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-800 focus:outline-none focus:border-red-800 focus:ring ring-red-300 disabled:opacity-25 transition"
                    onClick={(e) => {
                      if (!confirm('Are you sure you want to delete this blog post?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  {/* Featured Image */}
                  {blogPost.featured_image && (
                    <div>
                      <img
                        src={`/storage/${blogPost.featured_image}`}
                        alt={blogPost.title}
                        className="w-full h-auto rounded-lg object-cover"
                        style={{ maxHeight: '400px' }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Content</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Status</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-700 mr-2">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${blogPost.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {blogPost.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      {blogPost.published_at && (
                        <div className="flex items-center mb-2">
                          <span className="font-medium text-gray-700 mr-2">Published:</span>
                          <span className="text-gray-600">{format(new Date(blogPost.published_at), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-700 mr-2">Created:</span>
                        <span className="text-gray-600">{format(new Date(blogPost.created_at), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Updated:</span>
                        <span className="text-gray-600">{format(new Date(blogPost.updated_at), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Author */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Author</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          {blogPost.user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{blogPost.user.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Category</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      {blogPost.category ? (
                        <span className="text-gray-700">{blogPost.category.name}</span>
                      ) : (
                        <span className="text-gray-500 italic">Uncategorized</span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Tags</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      {blogPost.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {blogPost.tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">No tags</span>
                      )}
                    </div>
                  </div>

                  {/* Excerpt */}
                  {blogPost.excerpt && (
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-2">Excerpt</h2>
                      <div className="bg-gray-100 rounded-md p-4">
                        <p className="text-gray-700">{blogPost.excerpt}</p>
                      </div>
                    </div>
                  )}
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
