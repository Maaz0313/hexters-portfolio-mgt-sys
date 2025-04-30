import React, { ReactNode } from "react";
import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layout';
import { FaCalendarAlt, FaUser, FaTag, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { format } from 'date-fns';

// Define interfaces for props
interface PortfolioLayoutProps {
  children: ReactNode;
  title?: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  published_at: string;
  user: {
    name: string;
  };
  category: {
    name: string;
    slug: string;
  } | null;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface BlogSingleProps {
  blogPost: BlogPost;
  relatedPosts: BlogPost[];
  popularPosts: BlogPost[];
}

// Define a local PortfolioLayout component
const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ children, title }) => {
  return (
    <>
      {title && <Head title={title} />}
      <Layout>{children}</Layout>
    </>
  );
};

const BlogSingle: React.FC<BlogSingleProps> = ({ blogPost, relatedPosts, popularPosts }) => {
  if (!blogPost) {
    return (
      <PortfolioLayout title="Error">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Blog post not found
          </div>
        </div>
      </PortfolioLayout>
    );
  }

  return (
    <PortfolioLayout title={blogPost.title}>
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          {/* Breadcrumbs */}
          <div className="mb-8 text-sm text-gray-600">
            <Link href={route('home')} className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href={route('blogs')} className="hover:text-primary">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{blogPost.title}</span>
          </div>

          {/* Featured Image */}
          {blogPost.featured_image && (
            <div className="mb-8 overflow-hidden rounded-xl">
              <img
                src={`/storage/${blogPost.featured_image}`}
                alt={blogPost.title}
                className="h-auto w-full object-cover"
                style={{ maxHeight: '500px' }}
              />
            </div>
          )}

          {/* Post Header */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              {blogPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <FaUser className="mr-2 text-primary" />
                <span>{blogPost.user.name}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-primary" />
                <span>{format(new Date(blogPost.published_at), 'MMMM d, yyyy')}</span>
              </div>
              {blogPost.category && (
                <div className="flex items-center">
                  <FaTag className="mr-2 text-primary" />
                  <span>{blogPost.category.name}</span>
                </div>
              )}
              <div className="ml-auto flex items-center">
                <span className="mr-2">Share:</span>
                <a href="#" className="mx-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark">
                  <FaFacebookF />
                </a>
                <a href="#" className="mx-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark">
                  <FaTwitter />
                </a>
                <a href="#" className="mx-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Author Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {blogPost.user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{blogPost.user.name}</h3>
                    <p className="text-sm text-gray-600">Author</p>
                  </div>
                </div>
                <p className="mb-4 text-sm text-gray-700">
                  Author of this blog post.
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: blogPost.content || '' }}
                />

                {/* Tags */}
                {blogPost.tags && blogPost.tags.length > 0 && (
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag) => (
                        <Link
                          key={tag.id}
                          href={route('blogs', { tag: tag.slug })}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-primary hover:text-white"
                        >
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Posts</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:scale-105">
                    <Link href={route('blog.show', { slug: relatedPost.slug })}>
                      <div className="overflow-hidden">
                        {relatedPost.featured_image ? (
                          <img
                            src={`/storage/${relatedPost.featured_image}`}
                            alt={relatedPost.title}
                            className="h-48 w-full object-cover transition-transform hover:scale-110"
                          />
                        ) : (
                          <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-gray-900">{relatedPost.title}</h3>
                        <p className="mb-4 text-gray-700">{relatedPost.excerpt || ''}</p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{format(new Date(relatedPost.published_at), 'MMMM d, yyyy')}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular Posts */}
          {popularPosts && popularPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Popular Posts</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {popularPosts.map((popularPost) => (
                  <div key={popularPost.id} className="overflow-hidden rounded-xl bg-white shadow-sm transition-transform hover:scale-105">
                    <Link href={route('blog.show', { slug: popularPost.slug })}>
                      <div className="overflow-hidden">
                        {popularPost.featured_image ? (
                          <img
                            src={`/storage/${popularPost.featured_image}`}
                            alt={popularPost.title}
                            className="h-48 w-full object-cover transition-transform hover:scale-110"
                          />
                        ) : (
                          <div className="h-48 w-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="mb-2 text-xl font-bold text-gray-900">{popularPost.title}</h3>
                        <p className="mb-4 text-gray-700">{popularPost.excerpt || ''}</p>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{format(new Date(popularPost.published_at), 'MMMM d, yyyy')}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PortfolioLayout>
  );
};

export default BlogSingle;
