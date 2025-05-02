import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

const Dashboard = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center">
              <div className="flex items-center gap-3 mr-3">
                <img
                  src="/images/logos/logo white.png"
                  alt="Hexters Logo Icon"
                  className="h-9 w-auto"
                />
                <span
                  className="font-title text-4xl text-accent tracking-wide"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  HEXTERS
                </span>
              </div>
              <span className="text-card-foreground text-xl">Admin Dashboard</span>
            </div>
            <div className="h-0.5 w-full bg-border"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-card border-b border-border">
                <h2 className="text-xl font-semibold mb-2 text-card-foreground">Blog Posts</h2>
                <p className="text-muted-foreground mb-4">Manage your blog posts</p>
                <Link
                  href={route('admin.blog-posts.index')}
                  className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition"
                >
                  Manage Posts
                </Link>
              </div>
            </div>

            <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-card border-b border-border">
                <h2 className="text-xl font-semibold mb-2 text-card-foreground">Portfolio Projects</h2>
                <p className="text-muted-foreground mb-4">Manage your portfolio projects</p>
                <Link
                  href={route('admin.portfolio-projects.index')}
                  className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition"
                >
                  Manage Projects
                </Link>
              </div>
            </div>

            <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-card border-b border-border">
                <h2 className="text-xl font-semibold mb-2 text-card-foreground">Categories</h2>
                <p className="text-muted-foreground mb-4">Manage your categories</p>
                <Link
                  href={route('admin.categories.index')}
                  className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition"
                >
                  Manage Categories
                </Link>
              </div>
            </div>

            <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-card border-b border-border">
                <h2 className="text-xl font-semibold mb-2 text-card-foreground">Tags</h2>
                <p className="text-muted-foreground mb-4">Manage your tags</p>
                <Link
                  href={route('admin.tags.index')}
                  className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-primary-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-primary disabled:opacity-25 transition"
                >
                  Manage Tags
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-card border-b border-border">
              <h2 className="title-text text-xl font-semibold mb-4 text-primary">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href={route('admin.blog-posts.create')}
                  className="inline-flex items-center justify-center px-4 py-2 bg-accent border border-transparent rounded-md font-semibold text-xs text-accent-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-accent disabled:opacity-25 transition"
                >
                  Create Blog Post
                </Link>

                <Link
                  href={route('admin.portfolio-projects.create')}
                  className="inline-flex items-center justify-center px-4 py-2 bg-accent border border-transparent rounded-md font-semibold text-xs text-accent-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-accent disabled:opacity-25 transition"
                >
                  Create Portfolio Project
                </Link>

                <Link
                  href={route('admin.categories.create')}
                  className="inline-flex items-center justify-center px-4 py-2 bg-accent border border-transparent rounded-md font-semibold text-xs text-accent-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-accent disabled:opacity-25 transition"
                >
                  Create Category
                </Link>

                <Link
                  href={route('admin.tags.create')}
                  className="inline-flex items-center justify-center px-4 py-2 bg-accent border border-transparent rounded-md font-semibold text-xs text-accent-foreground uppercase tracking-widest hover:bg-opacity-90 focus:outline-none focus:ring ring-accent disabled:opacity-25 transition"
                >
                  Create Tag
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
