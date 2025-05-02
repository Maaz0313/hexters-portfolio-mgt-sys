import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';
import { DataTable } from '@/components/ui/data-table';

interface Branding {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  portfolio_projects_count: number;
}

interface Props {
  brandings: {
    data: Branding[];
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
    title: 'Brandings',
    href: '/dashboard/brandings',
  },
];

const Index = ({ brandings }: Props) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Brandings" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="title-text text-3xl font-bold text-primary">Manage Brandings</h1>
            <Link
              href={route('admin.brandings.create')}
              className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition cursor-pointer"
            >
              Create New Branding
            </Link>
          </div>

          <DataTable
            data={brandings.data}
            columns={[
              {
                header: 'Name',
                accessor: 'name',
                className: 'whitespace-nowrap'
              },
              {
                header: 'Description',
                accessor: (branding) => (
                  <div>
                    {branding.description ? (
                      branding.description.length > 100 ? (
                        branding.description.substring(0, 100) + '...'
                      ) : (
                        branding.description
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
                accessor: (branding) => format(new Date(branding.created_at), 'MMM d, yyyy'),
                className: 'whitespace-nowrap'
              }
            ]}
            actions={(branding) => [
              {
                label: 'View',
                href: route('admin.brandings.show', branding.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'Edit',
                href: route('admin.brandings.edit', branding.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'Delete',
                href: route('admin.brandings.destroy', branding.id),
                method: 'delete',
                as: 'button',
                type: 'button',
                className: 'text-accent hover:text-accent/80 cursor-pointer',
                onClick: (e) => {
                  if (!confirm('Are you sure you want to delete this branding?')) {
                    e.preventDefault();
                  }
                }
              }
            ]}
            keyField="id"
            emptyMessage="No brandings found. Create your first branding!"
            pagination={{
              currentPage: brandings.current_page,
              lastPage: brandings.last_page,
              perPage: brandings.per_page,
              total: brandings.total,
              routeName: 'admin.brandings.index'
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
