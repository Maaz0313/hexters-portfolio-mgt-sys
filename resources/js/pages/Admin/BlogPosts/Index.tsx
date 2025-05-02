import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { format } from 'date-fns';
import { DataTable } from '@/components/ui/data-table';

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
            <h1 className="title-text text-3xl font-bold text-primary">Manage Blog Posts</h1>
            <Link
              href={route('admin.blog-posts.create')}
              className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition cursor-pointer"
            >
              Create New Post
            </Link>
          </div>

          <DataTable
            data={blogPosts.data}
            columns={[
              {
                header: 'Title',
                accessor: (post) => (
                  <div>
                    <div className="text-sm font-medium text-card-foreground truncate max-w-[200px]">{post.title}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">{post.slug}</div>
                  </div>
                )
              },
              {
                header: 'Status',
                accessor: (post) => (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.is_published ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                    {post.is_published ? 'Published' : 'Draft'}
                  </span>
                )
              },
              {
                header: 'Category',
                accessor: (post) => post.category ? post.category.name : 'Uncategorized'
              },
              {
                header: 'Author',
                accessor: (post) => post.user.name
              },
              {
                header: 'Date',
                accessor: (post) => format(new Date(post.created_at), 'MMM d, yyyy')
              }
            ]}
            actions={(post) => [
              {
                label: 'Edit',
                href: route('admin.blog-posts.edit', post.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'View',
                href: route('admin.blog-posts.show', post.id),
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'Preview',
                href: route('blog.show', post.slug),
                target: '_blank',
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              },
              {
                label: 'Delete',
                href: route('admin.blog-posts.destroy', post.id),
                method: 'delete',
                as: 'button',
                type: 'button',
                className: 'text-accent hover:text-accent/80 cursor-pointer'
              }
            ]}
            keyField="id"
            emptyMessage="No blog posts found. Create your first blog post!"
            pagination={{
              currentPage: blogPosts.current_page,
              lastPage: blogPosts.last_page,
              perPage: blogPosts.per_page,
              total: blogPosts.total,
              routeName: 'admin.blog-posts.index'
            }}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
