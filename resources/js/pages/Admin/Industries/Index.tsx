import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';
import { DataTable } from '@/components/ui/data-table';

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
            <h1 className="title-text text-3xl font-bold text-primary">Manage Industries</h1>
            <Link
              href={route('admin.industries.create')}
              className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition cursor-pointer"
            >
              Create New Industry
            </Link>
          </div>

          <DataTable
            data={industries.data}
            columns={[
              {
                header: 'Name',
                accessor: 'name',
                className: 'whitespace-nowrap'
              },
              {
                header: 'Description',
                accessor: (industry) => (
                  <div>
                    {industry.description ? (
                      industry.description.length > 100 ? (
                        industry.description.substring(0, 100) + '...'
                      ) : (
                        industry.description
                      )
                    ) : (
                      <span className="text-muted-foreground italic">No description</span>
                    )}
                  </div>
                )
              },
              {
                header: 'Projects',
                accessor: 'portfolio_projects_count',
                className: 'whitespace-nowrap'
              },
              {
                header: 'Created At',
                accessor: (industry) => format(new Date(industry.created_at), 'MMM d, yyyy'),
                className: 'whitespace-nowrap'
              }
            ]}
            actions={(industry) => [
              {
                label: 'View',
                href: route('admin.industries.show', industry.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'Edit',
                href: route('admin.industries.edit', industry.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'Delete',
                href: route('admin.industries.destroy', industry.id),
                method: 'delete',
                as: 'button',
                type: 'button',
                className: 'text-accent hover:text-accent/80 cursor-pointer',
                onClick: (e) => {
                  if (!confirm('Are you sure you want to delete this industry?')) {
                    e.preventDefault();
                  }
                }
              }
            ]}
            keyField="id"
            emptyMessage="No industries found. Create your first industry!"
            pagination={{
              currentPage: industries.current_page,
              lastPage: industries.last_page,
              perPage: industries.per_page,
              total: industries.total,
              routeName: 'admin.industries.index'
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
