import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';
import { DataTable } from '@/components/ui/data-table';

interface Tag {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  blog_posts_count: number;
  portfolio_projects_count: number;
}

interface Props {
  tags: {
    data: Tag[];
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
    title: 'Tags',
    href: '/dashboard/tags',
  },
];

const Index = ({ tags }: Props) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Manage Tags" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="title-text text-3xl font-bold text-primary">Manage Tags</h1>
            <Link
              href={route('admin.tags.create')}
              className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition cursor-pointer"
            >
              Create New Tag
            </Link>
          </div>

          <DataTable
            data={tags.data}
            columns={[
              {
                header: 'Name',
                accessor: (tag) => (
                  <div>
                    <div className="text-sm font-medium text-card-foreground">{tag.name}</div>
                    <div className="text-sm text-muted-foreground">{tag.slug}</div>
                  </div>
                ),
                className: 'whitespace-nowrap'
              },
              {
                header: 'Blog Posts',
                accessor: 'blog_posts_count',
                className: 'whitespace-nowrap'
              },
              {
                header: 'Portfolio Projects',
                accessor: 'portfolio_projects_count',
                className: 'whitespace-nowrap'
              },
              {
                header: 'Date Created',
                accessor: (tag) => format(new Date(tag.created_at), 'MMM d, yyyy'),
                className: 'whitespace-nowrap'
              }
            ]}
            actions={(tag) => [
              {
                label: 'Edit',
                href: route('admin.tags.edit', tag.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'View',
                href: route('admin.tags.show', tag.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'Delete',
                href: route('admin.tags.destroy', tag.id),
                method: 'delete',
                as: 'button',
                type: 'button',
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              }
            ]}
            keyField="id"
            emptyMessage="No tags found. Create your first tag!"
            pagination={{
              currentPage: tags.current_page,
              lastPage: tags.last_page,
              perPage: tags.per_page,
              total: tags.total,
              routeName: 'admin.tags.index'
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
