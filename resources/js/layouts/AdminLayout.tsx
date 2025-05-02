import React, { useState, ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { FaHome, FaNewspaper, FaBriefcase, FaTags, FaFolder, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { url, component } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-20 p-4">
        <button
          onClick={toggleSidebar}
          className="text-foreground hover:text-primary focus:outline-none focus:text-primary"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-card text-card-foreground transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-border">
          <Link href={route('admin.dashboard')} className="title-text text-xl font-bold text-primary">
            Admin Dashboard
          </Link>
        </div>

        <nav className="mt-6">
          <div className="px-4 py-2 text-xs text-muted-foreground uppercase">Main</div>
          <Link
            href={route('admin.dashboard')}
            className={`flex items-center px-6 py-3 text-card-foreground hover:bg-primary hover:text-secondary ${
              component === 'Admin/Dashboard' ? 'bg-primary text-secondary' : ''
            }`}
          >
            <FaHome className="mr-3" />
            Dashboard
          </Link>

          <div className="px-4 py-2 mt-4 text-xs text-muted-foreground uppercase">Content</div>
          <Link
            href={route('admin.blog-posts.index')}
            className={`flex items-center px-6 py-3 text-card-foreground hover:bg-primary hover:text-secondary ${
              component.startsWith('Admin/BlogPosts') ? 'bg-primary text-secondary' : ''
            }`}
          >
            <FaNewspaper className="mr-3" />
            Blog Posts
          </Link>
          <Link
            href={route('admin.portfolio-projects.index')}
            className={`flex items-center px-6 py-3 text-card-foreground hover:bg-primary hover:text-secondary ${
              component.startsWith('Admin/PortfolioProjects') ? 'bg-primary text-secondary' : ''
            }`}
          >
            <FaBriefcase className="mr-3" />
            Portfolio Projects
          </Link>
          <Link
            href={route('admin.categories.index')}
            className={`flex items-center px-6 py-3 text-card-foreground hover:bg-primary hover:text-secondary ${
              component.startsWith('Admin/Categories') ? 'bg-primary text-secondary' : ''
            }`}
          >
            <FaFolder className="mr-3" />
            Categories
          </Link>
          <Link
            href={route('admin.tags.index')}
            className={`flex items-center px-6 py-3 text-card-foreground hover:bg-primary hover:text-secondary ${
              component.startsWith('Admin/Tags') ? 'bg-primary text-secondary' : ''
            }`}
          >
            <FaTags className="mr-3" />
            Tags
          </Link>

          <div className="px-4 py-2 mt-4 text-xs text-muted-foreground uppercase">Account</div>
          <Link
            href={route('profile.edit')}
            className={`flex items-center px-6 py-3 text-card-foreground hover:bg-primary hover:text-secondary ${
              component === 'Profile/Edit' ? 'bg-primary text-secondary' : ''
            }`}
          >
            <FaUser className="mr-3" />
            Profile
          </Link>
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="flex items-center w-full px-6 py-3 text-left text-card-foreground hover:bg-primary hover:text-secondary"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="title-text text-2xl font-bold text-primary">{title || component.split('/').pop()}</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-card shadow-inner mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} Hexters Admin Panel. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background bg-opacity-50 z-0 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
