import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';
import { DataTable } from '@/components/ui/data-table';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  type: 'blog' | 'portfolio';
  created_at: string;
}

interface Props {
  categories: {
    data: Category[];
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
    title: 'Categories',
    href: '/dashboard/categories',
  },
];

const Index = ({ categories }: Props) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Categories" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="title-text text-3xl font-bold text-primary">Manage Categories</h1>
            <Link
              href={route('admin.categories.create')}
              className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition cursor-pointer"
            >
              Create New Category
            </Link>
          </div>

          <DataTable
            data={categories.data}
            columns={[
              {
                header: 'Name',
                accessor: (category) => (
                  <div>
                    <div className="text-sm font-medium text-card-foreground">{category.name}</div>
                    <div className="text-sm text-muted-foreground">{category.slug}</div>
                  </div>
                ),
                className: 'whitespace-nowrap'
              },
              {
                header: 'Type',
                accessor: (category) => (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${category.type === 'blog' ? 'bg-accent/20 text-accent' : 'bg-accent/20 text-accent'}`}>
                    {category.type === 'blog' ? 'Blog' : 'Portfolio'}
                  </span>
                ),
                className: 'whitespace-nowrap'
              },
              {
                header: 'Description',
                accessor: (category) => (
                  category.description ? (
                    <span className="truncate block max-w-xs">{category.description}</span>
                  ) : (
                    <span className="text-muted-foreground italic">No description</span>
                  )
                ),
                className: 'whitespace-nowrap'
              },
              {
                header: 'Date Created',
                accessor: (category) => format(new Date(category.created_at), 'MMM d, yyyy'),
                className: 'whitespace-nowrap'
              }
            ]}
            actions={(category) => [
              {
                label: 'Edit',
                href: route('admin.categories.edit', category.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'View',
                href: route('admin.categories.show', category.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'Delete',
                href: route('admin.categories.destroy', category.id),
                method: 'delete',
                as: 'button',
                type: 'button',
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              }
            ]}
            keyField="id"
            emptyMessage="No categories found. Create your first category!"
            pagination={{
              currentPage: categories.current_page,
              lastPage: categories.last_page,
              perPage: categories.per_page,
              total: categories.total,
              routeName: 'admin.categories.index'
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
