import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

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
            <Head title="Pages" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Pages</h1>
                <Button asChild>
                    <Link href={route('admin.pages.create')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Page
                    </Link>
                </Button>
            </div>

            <DataTable
                data={pages.data}
                columns={[
                    {
                        header: 'Title',
                        accessor: (page) => (
                            <div>
                                <div className="text-sm font-medium text-card-foreground">{page.title}</div>
                                <div className="text-sm text-muted-foreground">{page.slug}</div>
                            </div>
                        ),
                        className: 'whitespace-nowrap'
                    },
                    {
                        header: 'Status',
                        accessor: (page) => (
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.is_published ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                                {page.is_published ? 'Published' : 'Draft'}
                            </span>
                        ),
                        className: 'whitespace-nowrap'
                    },
                    {
                        header: 'Created At',
                        accessor: (page) => format(new Date(page.created_at), 'MMM d, yyyy'),
                        className: 'whitespace-nowrap'
                    },
                    {
                        header: 'Updated At',
                        accessor: (page) => format(new Date(page.updated_at), 'MMM d, yyyy'),
                        className: 'whitespace-nowrap'
                    }
                ]}
                actions={(page) => [
                    {
                        label: 'Edit',
                        href: route('admin.pages.edit', page.id),
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    },
                    {
                        label: 'View',
                        href: route('admin.pages.show', page.id),
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    },
                    {
                        label: 'Delete',
                        href: route('admin.pages.destroy', page.id),
                        method: 'delete',
                        as: 'button',
                        type: 'button',
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    }
                ]}
                keyField="id"
                emptyMessage="No pages found. Create your first page."
                pagination={{
                    currentPage: pages.current_page,
                    lastPage: pages.last_page,
                    perPage: pages.per_page,
                    total: pages.total,
                    routeName: 'admin.pages.index'
                }}
            />
        </AppLayout>
    );
};

export default Index;
