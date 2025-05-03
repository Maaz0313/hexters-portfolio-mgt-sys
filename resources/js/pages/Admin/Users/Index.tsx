import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

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
            <Head title="Manage Users" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="title-text text-primary text-3xl font-bold">Manage Users</h1>
                        <Link
                            href={route('admin.users.create')}
                            className="bg-primary text-primary-foreground hover:bg-opacity-90 ring-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create New User
                        </Link>
                    </div>

                    <DataTable
                        data={users.data}
                        columns={[
                            {
                                header: 'Name',
                                accessor: (user) => (
                                    <div>
                                        <div className="text-card-foreground text-sm font-medium">{user.name}</div>
                                        <div className="text-muted-foreground text-sm">{user.email}</div>
                                    </div>
                                ),
                                className: 'whitespace-nowrap',
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
                                className: 'whitespace-nowrap',
                            },
                        ]}
                        actions={(user) => [
                            {
                                label: 'Edit',
                                href: route('admin.users.edit', user.id),
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                            {
                                label: 'View',
                                href: route('admin.users.show', user.id),
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                            {
                                label: 'Delete',
                                href: route('admin.users.destroy', user.id),
                                method: 'delete',
                                as: 'button',
                                type: 'button',
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                        ]}
                        keyField="id"
                        emptyMessage="No users found. Create your first user."
                        pagination={{
                            currentPage: users.current_page,
                            lastPage: users.last_page,
                            perPage: users.per_page,
                            total: users.total,
                            routeName: 'admin.users.index',
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
