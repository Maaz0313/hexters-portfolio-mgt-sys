import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

interface Page {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    pages: {
        data: Page[];
        links: any;
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
        title: 'Pages',
        href: '/dashboard/pages',
    },
];

const Index = ({ pages }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Pages" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="title-text text-primary text-3xl font-bold">Manage Pages</h1>
                        <Link
                            href={route('admin.pages.create')}
                            className="bg-primary text-primary-foreground hover:bg-opacity-90 ring-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Page
                        </Link>
                    </div>

                    <DataTable
                        data={pages.data}
                        columns={[
                            {
                                header: 'Title',
                                accessor: (page) => (
                                    <div>
                                        <div className="text-card-foreground text-sm font-medium">{page.title}</div>
                                        <div className="text-muted-foreground text-sm">{page.slug}</div>
                                    </div>
                                ),
                                className: 'whitespace-nowrap',
                            },
                            {
                                header: 'Status',
                                accessor: (page) => (
                                    <span
                                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${page.is_published ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}
                                    >
                                        {page.is_published ? 'Published' : 'Draft'}
                                    </span>
                                ),
                                className: 'whitespace-nowrap',
                            },
                            {
                                header: 'Created At',
                                accessor: (page) => format(new Date(page.created_at), 'MMM d, yyyy'),
                                className: 'whitespace-nowrap',
                            },
                            {
                                header: 'Updated At',
                                accessor: (page) => format(new Date(page.updated_at), 'MMM d, yyyy'),
                                className: 'whitespace-nowrap',
                            },
                        ]}
                        actions={(page) => [
                            {
                                label: 'Edit',
                                href: route('admin.pages.edit', page.id),
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                            {
                                label: 'View',
                                href: route('admin.pages.show', page.id),
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                            {
                                label: 'Delete',
                                href: route('admin.pages.destroy', page.id),
                                method: 'delete',
                                as: 'button',
                                type: 'button',
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                        ]}
                        keyField="id"
                        emptyMessage="No pages found. Create your first page."
                        pagination={{
                            currentPage: pages.current_page,
                            lastPage: pages.last_page,
                            perPage: pages.per_page,
                            total: pages.total,
                            routeName: 'admin.pages.index',
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
