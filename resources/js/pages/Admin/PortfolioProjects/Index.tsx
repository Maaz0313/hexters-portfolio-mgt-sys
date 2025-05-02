import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

interface Branding {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface Industry {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface PortfolioProject {
    id: number;
    title: string;
    slug: string;
    description: string;
    branding_id: number | null;
    industry_id: number | null;
    branding: Branding | null;
    industry: Industry | null;
    is_published: boolean;
    is_featured: boolean;
    created_at: string;
    user: {
        name: string;
    };
}

interface Props {
    portfolioProjects: {
        data: PortfolioProject[];
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
        title: 'Portfolio Projects',
        href: '/dashboard/portfolio-projects',
    },
];

const Index = ({ portfolioProjects }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Portfolio Projects" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="title-text text-primary text-3xl font-bold">Manage Portfolio Projects</h1>
                        <Link
                            href={route('admin.portfolio-projects.create')}
                            className="bg-primary text-primary-foreground hover:bg-opacity-90 ring-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                        >
                            Create New Project
                        </Link>
                    </div>

                    <DataTable
                        data={portfolioProjects.data}
                        columns={[
                            {
                                header: 'Title',
                                accessor: (project) => (
                                    <div>
                                        <div className="text-card-foreground max-w-[200px] truncate text-sm font-medium">{project.title}</div>
                                        <div className="text-muted-foreground max-w-[200px] truncate text-sm">{project.slug}</div>
                                    </div>
                                ),
                            },
                            {
                                header: 'Status',
                                accessor: (project) => (
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${project.is_published ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        {project.is_published ? 'Published' : 'Draft'}
                                    </span>
                                ),
                            },
                            {
                                header: 'Featured',
                                accessor: (project) => (
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${project.is_featured ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        {project.is_featured ? 'Featured' : 'Not Featured'}
                                    </span>
                                ),
                            },
                            {
                                header: 'Branding',
                                accessor: (project) => (project.branding ? project.branding.name : 'Not specified'),
                                className: 'truncate max-w-[120px]',
                            },
                            {
                                header: 'Industry',
                                accessor: (project) => (project.industry ? project.industry.name : 'Not specified'),
                                className: 'truncate max-w-[120px]',
                            },
                            {
                                header: 'Author',
                                accessor: (project) => project.user.name,
                            },
                            {
                                header: 'Date',
                                accessor: (project) => format(new Date(project.created_at), 'MMM d, yyyy'),
                            },
                        ]}
                        actions={(project) => [
                            {
                                label: 'Edit',
                                href: route('admin.portfolio-projects.edit', project.id),
                                className: 'text-accent hover:text-accent/80 cursor-pointer',
                            },
                            {
                                label: 'View',
                                href: route('admin.portfolio-projects.show', project.id),
                                className: 'text-accent hover:text-accent/80 cursor-pointer',
                            },
                            {
                                label: 'Delete',
                                href: route('admin.portfolio-projects.destroy', project.id),
                                method: 'delete',
                                as: 'button',
                                type: 'button',
                                className: 'text-accent hover:text-accent/80 cursor-pointer',
                            },
                        ]}
                        keyField="id"
                        emptyMessage="No portfolio projects found. Create your first project!"
                        pagination={{
                            currentPage: portfolioProjects.current_page,
                            lastPage: portfolioProjects.last_page,
                            perPage: portfolioProjects.per_page,
                            total: portfolioProjects.total,
                            routeName: 'admin.portfolio-projects.index',
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
