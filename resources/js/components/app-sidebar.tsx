import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Briefcase, Building2, File, FileText, FolderTree, LayoutGrid, Palette, Shield, Tag, Users } from 'lucide-react';
import AdminLogoLink from './admin-logo-link';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Blog Posts',
        href: '/dashboard/blog-posts',
        icon: FileText,
    },
    {
        title: 'Portfolio Projects',
        href: '/dashboard/portfolio-projects',
        icon: Briefcase,
    },
    {
        title: 'Categories',
        href: '/dashboard/categories',
        icon: FolderTree,
    },
    {
        title: 'Tags',
        href: '/dashboard/tags',
        icon: Tag,
    },
    {
        title: 'Brandings',
        href: '/dashboard/brandings',
        icon: Palette,
    },
    {
        title: 'Industries',
        href: '/dashboard/industries',
        icon: Building2,
    },
    {
        title: 'Pages',
        href: '/dashboard/pages',
        icon: File,
    },
    {
        title: 'Users',
        href: '/dashboard/users',
        icon: Users,
    },
    {
        title: 'Roles',
        href: '/dashboard/roles',
        icon: Shield,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <AdminLogoLink />
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
