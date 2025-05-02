import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

interface Permission {
    id: number;
    name: string;
    slug: string;
}

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    permissions_count: number;
    users_count: number;
}

interface Props {
    roles: {
        data: Role[];
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
        title: 'Roles',
        href: '/dashboard/roles',
    },
];

const Index = ({ roles }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Roles</h1>
                <Button asChild>
                    <Link href={route('admin.roles.create')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Role
                    </Link>
                </Button>
            </div>

            <DataTable
                data={roles.data}
                columns={[
                    {
                        header: 'Name',
                        accessor: 'name',
                    },
                    {
                        header: 'Description',
                        accessor: (role) => role.description || 'No description',
                        className: 'hidden md:table-cell',
                    },
                    {
                        header: 'Permissions',
                        accessor: (role) => (
                            <Badge variant="outline" className="bg-accent/10 text-accent">
                                {role.permissions_count}
                            </Badge>
                        ),
                        className: 'text-center',
                    },
                    {
                        header: 'Users',
                        accessor: (role) => (
                            <Badge variant="outline" className="bg-accent/10 text-accent">
                                {role.users_count}
                            </Badge>
                        ),
                        className: 'text-center',
                    },
                    {
                        header: 'Created',
                        accessor: (role) => format(new Date(role.created_at), 'MMM d, yyyy'),
                        className: 'hidden md:table-cell',
                    },
                ]}
                actions={(role) => [
                    {
                        label: 'Edit',
                        href: route('admin.roles.edit', role.id),
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    },
                    {
                        label: 'View',
                        href: route('admin.roles.show', role.id),
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    },
                    {
                        label: 'Delete',
                        href: route('admin.roles.destroy', role.id),
                        method: 'delete',
                        as: 'button',
                        type: 'button',
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    }
                ]}
                keyField="id"
                emptyMessage="No roles found. Create your first role."
                pagination={{
                    currentPage: roles.current_page,
                    lastPage: roles.last_page,
                    perPage: roles.per_page,
                    total: roles.total,
                    routeName: 'admin.roles.index'
                }}
            />
        </AppLayout>
    );
};

export default Index;
