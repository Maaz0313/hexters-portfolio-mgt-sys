import { Link, usePage } from '@inertiajs/react';
import React, { ReactNode, useState } from 'react';
import { FaBars, FaBriefcase, FaFolder, FaHome, FaNewspaper, FaSignOutAlt, FaTags, FaTimes, FaUser } from 'react-icons/fa';

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
        <div className="bg-background text-foreground min-h-screen">
            {/* Mobile sidebar toggle */}
            <div className="fixed top-0 left-0 z-20 p-4 lg:hidden">
                <button onClick={toggleSidebar} className="text-foreground hover:text-primary focus:text-primary focus:outline-none">
                    {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`bg-card text-card-foreground fixed inset-y-0 left-0 z-10 w-64 transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}
            >
                <div className="border-border border-b p-6">
                    <Link href={route('admin.dashboard')} className="title-text text-primary text-xl font-bold">
                        Admin Dashboard
                    </Link>
                </div>

                <nav className="mt-6">
                    <div className="text-muted-foreground px-4 py-2 text-xs uppercase">Main</div>
                    <Link
                        href={route('admin.dashboard')}
                        className={`text-card-foreground hover:bg-primary hover:text-secondary flex items-center px-6 py-3 ${
                            component === 'Admin/Dashboard' ? 'bg-primary text-secondary' : ''
                        }`}
                    >
                        <FaHome className="mr-3" />
                        Dashboard
                    </Link>

                    <div className="text-muted-foreground mt-4 px-4 py-2 text-xs uppercase">Content</div>
                    <Link
                        href={route('admin.blog-posts.index')}
                        className={`text-card-foreground hover:bg-primary hover:text-secondary flex items-center px-6 py-3 ${
                            component.startsWith('Admin/BlogPosts') ? 'bg-primary text-secondary' : ''
                        }`}
                    >
                        <FaNewspaper className="mr-3" />
                        Blog Posts
                    </Link>
                    <Link
                        href={route('admin.portfolio-projects.index')}
                        className={`text-card-foreground hover:bg-primary hover:text-secondary flex items-center px-6 py-3 ${
                            component.startsWith('Admin/PortfolioProjects') ? 'bg-primary text-secondary' : ''
                        }`}
                    >
                        <FaBriefcase className="mr-3" />
                        Portfolio Projects
                    </Link>
                    <Link
                        href={route('admin.categories.index')}
                        className={`text-card-foreground hover:bg-primary hover:text-secondary flex items-center px-6 py-3 ${
                            component.startsWith('Admin/Categories') ? 'bg-primary text-secondary' : ''
                        }`}
                    >
                        <FaFolder className="mr-3" />
                        Categories
                    </Link>
                    <Link
                        href={route('admin.tags.index')}
                        className={`text-card-foreground hover:bg-primary hover:text-secondary flex items-center px-6 py-3 ${
                            component.startsWith('Admin/Tags') ? 'bg-primary text-secondary' : ''
                        }`}
                    >
                        <FaTags className="mr-3" />
                        Tags
                    </Link>

                    <div className="text-muted-foreground mt-4 px-4 py-2 text-xs uppercase">Account</div>
                    <Link
                        href={route('profile.edit')}
                        className={`text-card-foreground hover:bg-primary hover:text-secondary flex items-center px-6 py-3 ${
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
                        className="text-card-foreground hover:bg-primary hover:text-secondary flex w-full items-center px-6 py-3 text-left"
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
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="title-text text-primary text-2xl font-bold">{title || component.split('/').pop()}</h1>
                    </div>
                </header>

                {/* Page content */}
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>

                {/* Footer */}
                <footer className="bg-card mt-auto shadow-inner">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <p className="text-muted-foreground text-center text-sm">
                            &copy; {new Date().getFullYear()} Hexters Admin Panel. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && <div className="bg-background bg-opacity-50 fixed inset-0 z-0 lg:hidden" onClick={toggleSidebar}></div>}
        </div>
    );
};

export default AdminLayout;
