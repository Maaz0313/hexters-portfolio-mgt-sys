import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';

interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  branding: string | null;
  industry: string | null;
  is_published: boolean;
  is_featured: boolean;
  created_at: string;
  user: {
    name: string;
  };
}

interface Props {
  portfolioProjects: {
    data: PortfolioProject[];
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
    title: 'Portfolio Projects',
    href: '/dashboard/portfolio-projects',
  },
];

const Index = ({ portfolioProjects }: Props) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Portfolio Projects" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Manage Portfolio Projects</h1>
            <Link
              href={route('admin.portfolio-projects.create')}
              className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:border-blue-800 focus:ring ring-blue-300 disabled:opacity-25 transition"
            >
              Create New Project
            </Link>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Branding
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Industry
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Author
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {portfolioProjects.data.map((project) => (
                      <tr key={project.id}>
                        <td className="px-3 py-3">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{project.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-[150px]">{project.slug}</div>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {project.is_published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-3 py-3">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.is_featured ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                            {project.is_featured ? 'Featured' : 'Not Featured'}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-500 truncate max-w-[120px]">
                          {project.branding || 'Not specified'}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-500 truncate max-w-[120px]">
                          {project.industry || 'Not specified'}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-500">
                          {project.user.name}
                        </td>
                        <td className="px-3 py-3 text-sm text-gray-500">
                          {format(new Date(project.created_at), 'MMM d, yyyy')}
                        </td>
                        <td className="px-3 py-3 text-sm font-medium">
                          <div className="flex flex-wrap gap-2">
                            <Link
                              href={route('admin.portfolio-projects.edit', project.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <Link
                              href={route('admin.portfolio-projects.show', project.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View
                            </Link>
                            <Link
                              href={route('admin.portfolio-projects.destroy', project.id)}
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

                    {portfolioProjects.data.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-3 py-3 text-center text-gray-500">
                          No portfolio projects found. Create your first project!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {portfolioProjects.last_page > 1 && (
                <div className="mt-4 flex justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(portfolioProjects.current_page - 1) * portfolioProjects.per_page + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(portfolioProjects.current_page * portfolioProjects.per_page, portfolioProjects.total)}
                    </span>{" "}
                    of <span className="font-medium">{portfolioProjects.total}</span> results
                  </div>

                  <div className="flex space-x-2">
                    {Array.from({ length: portfolioProjects.last_page }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={route('admin.portfolio-projects.index', { page })}
                        className={`px-3 py-1 rounded ${
                          page === portfolioProjects.current_page
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
