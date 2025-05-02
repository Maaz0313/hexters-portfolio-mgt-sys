import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';

interface Role {
    id: number;
    name: string;
    slug: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
    roles: Role[];
}

interface Props {
    users: {
        data: User[];
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
        title: 'Users',
        href: '/dashboard/users',
    },
];

const Index = ({ users }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Users</h1>
                <Button asChild>
                    <Link href={route('admin.users.create')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </Link>
                </Button>
            </div>

            <DataTable
                data={users.data}
                columns={[
                    {
                        header: 'Name',
                        accessor: (user) => (
                            <div>
                                <div className="text-sm font-medium text-card-foreground">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                        ),
                        className: 'whitespace-nowrap'
                    },
                    {
                        header: 'Roles',
                        accessor: (user) => (
                            <div className="flex flex-wrap gap-1">
                                {user.roles.map((role) => (
                                    <Badge key={role.id} className="text-xs">
                                        {role.name}
                                    </Badge>
                                ))}
                                {user.is_admin && (
                                    <Badge variant="success" className="text-xs">
                                        Admin
                                    </Badge>
                                )}
                            </div>
                        ),
                    },
                    {
                        header: 'Created At',
                        accessor: (user) => format(new Date(user.created_at), 'MMM d, yyyy'),
                        className: 'whitespace-nowrap'
                    },
                ]}
                actions={(user) => [
                    {
                        label: 'Edit',
                        href: route('admin.users.edit', user.id),
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    },
                    {
                        label: 'View',
                        href: route('admin.users.show', user.id),
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    },
                    {
                        label: 'Delete',
                        href: route('admin.users.destroy', user.id),
                        method: 'delete',
                        as: 'button',
                        type: 'button',
                        className: 'text-accent hover:text-accent/80 cursor-pointer'
                    }
                ]}
                keyField="id"
                emptyMessage="No users found. Create your first user."
                pagination={{
                    currentPage: users.current_page,
                    lastPage: users.last_page,
                    perPage: users.per_page,
                    total: users.total,
                    routeName: 'admin.users.index'
                }}
            />
        </AppLayout>
    );
};

export default Index;
