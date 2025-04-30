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
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-20 p-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
        >
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-gray-700">
          <Link href={route('admin.dashboard')} className="text-xl font-bold text-white">
            Admin Dashboard
          </Link>
        </div>

        <nav className="mt-6">
          <div className="px-4 py-2 text-xs text-gray-400 uppercase">Main</div>
          <Link
            href={route('admin.dashboard')}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              component === 'Admin/Dashboard' ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <FaHome className="mr-3" />
            Dashboard
          </Link>

          <div className="px-4 py-2 mt-4 text-xs text-gray-400 uppercase">Content</div>
          <Link
            href={route('admin.blog-posts.index')}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              component.startsWith('Admin/BlogPosts') ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <FaNewspaper className="mr-3" />
            Blog Posts
          </Link>
          <Link
            href={route('admin.portfolio-projects.index')}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              component.startsWith('Admin/PortfolioProjects') ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <FaBriefcase className="mr-3" />
            Portfolio Projects
          </Link>
          <Link
            href={route('admin.categories.index')}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              component.startsWith('Admin/Categories') ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <FaFolder className="mr-3" />
            Categories
          </Link>
          <Link
            href={route('admin.tags.index')}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              component.startsWith('Admin/Tags') ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <FaTags className="mr-3" />
            Tags
          </Link>

          <div className="px-4 py-2 mt-4 text-xs text-gray-400 uppercase">Account</div>
          <Link
            href={route('profile.edit')}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              component === 'Profile/Edit' ? 'bg-gray-700 text-white' : ''
            }`}
          >
            <FaUser className="mr-3" />
            Profile
          </Link>
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="flex items-center w-full px-6 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">{title || component.split('/').pop()}</h1>
          </div>
        </header>

        {/* Page content */}
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-inner mt-auto">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Your Portfolio & Blog Admin. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-0 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;
