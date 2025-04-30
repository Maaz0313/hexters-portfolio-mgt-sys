import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit, ArrowLeft, Trash } from 'lucide-react';
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
  industry: Industry;
}

const Show = ({ industry }: Props) => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
    {
      title: 'Industries',
      href: '/dashboard/industries',
    },
    {
      title: industry.name,
      href: `/dashboard/industries/${industry.id}`,
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Industry: ${industry.name}`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{industry.name}</h1>
                <div className="flex space-x-2">
                  <Link
                    href={route('admin.industries.index')}
                    className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:border-gray-500 focus:ring ring-gray-300 disabled:opacity-25 transition"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Link>
                  <Link
                    href={route('admin.industries.edit', industry.id)}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                  <Link
                    href={route('admin.industries.destroy', industry.id)}
                    method="delete"
                    as="button"
                    className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 active:bg-red-800 focus:outline-none focus:border-red-800 focus:ring ring-red-300 disabled:opacity-25 transition"
                    onClick={(e) => {
                      if (!confirm('Are you sure you want to delete this industry?')) {
                        e.preventDefault();
                      }
                    }}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Link>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="text-lg font-medium mb-2">Industry Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-base">{industry.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Slug</p>
                    <p className="text-base">{industry.slug}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-base">
                      {industry.description || <span className="text-gray-400 italic">No description</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created At</p>
                    <p className="text-base">{format(new Date(industry.created_at), 'MMM d, yyyy h:mm a')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Updated At</p>
                    <p className="text-base">{format(new Date(industry.updated_at), 'MMM d, yyyy h:mm a')}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Portfolio Projects</p>
                    <p className="text-base">{industry.portfolio_projects_count}</p>
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
