import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit, ArrowLeft, Eye, Trash, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  image_alt: string | null;
  branding: string | null;
  industry: string | null;
  completion_date: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
}

interface Props {
  portfolioProject: PortfolioProject;
}

const Show = ({ portfolioProject }: Props) => {
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
      title: portfolioProject.title,
      href: `/dashboard/portfolio-projects/${portfolioProject.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Portfolio Project: ${portfolioProject.title}`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{portfolioProject.title}</h1>
                <div className="flex space-x-2">
                  <Link
                    href={route('admin.portfolio-projects.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:border-gray-500 focus:ring ring-gray-300 disabled:opacity-25 transition"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Link>
                  <Link
                    href={route('admin.portfolio-projects.edit', portfolioProject.id)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                  <Link
                    href={route('admin.portfolio-projects.destroy', portfolioProject.id)}
                    method="delete"
                    as="button"
                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-800 focus:outline-none focus:border-red-800 focus:ring ring-red-300 disabled:opacity-25 transition"
                    onClick={(e) => {
                      if (!confirm('Are you sure you want to delete this project?')) {
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
                  {/* Project Image */}
                  {portfolioProject.image && (
                    <div>
                      <img
                        src={`/storage/${portfolioProject.image}`}
                        alt={portfolioProject.image_alt || portfolioProject.title}
                        className="w-full h-auto rounded-lg object-cover"
                        style={{ maxHeight: '400px' }}
                      />
                    </div>
                  )}

                  {/* Description */}
                  {portfolioProject.description && (
                    <div>
                      <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
                      <p className="text-gray-700">{portfolioProject.description}</p>
                    </div>
                  )}

                  {/* Content removed */}
                </div>

                <div className="space-y-6">
                  {/* Status */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Status</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-700 mr-2">Status:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${portfolioProject.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {portfolioProject.is_published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-700 mr-2">Featured:</span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${portfolioProject.is_featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                          {portfolioProject.is_featured ? 'Featured' : 'Not Featured'}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="font-medium text-gray-700 mr-2">Created:</span>
                        <span className="text-gray-600">{format(new Date(portfolioProject.created_at), 'MMM d, yyyy')}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Updated:</span>
                        <span className="text-gray-600">{format(new Date(portfolioProject.updated_at), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Project Details</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      {portfolioProject.branding && (
                        <div className="flex items-center mb-2">
                          <span className="font-medium text-gray-700 mr-2">Branding:</span>
                          <span className="text-gray-600">{portfolioProject.branding}</span>
                        </div>
                      )}
                      {portfolioProject.industry && (
                        <div className="flex items-center mb-2">
                          <span className="font-medium text-gray-700 mr-2">Industry:</span>
                          <span className="text-gray-600">{portfolioProject.industry}</span>
                        </div>
                      )}
                      {portfolioProject.completion_date && (
                        <div className="flex items-center mb-2">
                          <span className="font-medium text-gray-700 mr-2">Completed:</span>
                          <span className="text-gray-600">{format(new Date(portfolioProject.completion_date), 'MMM d, yyyy')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Author */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Author</h2>
                    <div className="bg-gray-100 rounded-md p-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                          {portfolioProject.user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{portfolioProject.user.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Category and Tags removed */}
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
