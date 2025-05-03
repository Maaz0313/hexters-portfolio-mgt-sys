import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';

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
            <Head title="Manage Roles" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="title-text text-primary text-3xl font-bold">Manage Roles</h1>
                        <Link
                            href={route('admin.roles.create')}
                            className="bg-primary text-primary-foreground hover:bg-opacity-90 ring-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Create New Role
                        </Link>
                    </div>

                    <DataTable
                        data={roles.data}
                        columns={[
                            {
                                header: 'Name',
                                accessor: (role) => (
                                    <div>
                                        <div className="text-card-foreground text-sm font-medium">{role.name}</div>
                                        <div className="text-muted-foreground text-sm">{role.slug}</div>
                                    </div>
                                ),
                                className: 'whitespace-nowrap',
                            },
                            {
                                header: 'Description',
                                accessor: (role) => role.description || 'No description',
                                className: 'hidden md:table-cell',
                            },
                            {
                                header: 'Permissions',
                                accessor: (role) => (
                                    <Badge variant="outline" className="bg-primary/10 text-primary">
                                        {role.permissions_count}
                                    </Badge>
                                ),
                                className: 'text-center',
                            },
                            {
                                header: 'Users',
                                accessor: (role) => (
                                    <Badge variant="outline" className="bg-primary/10 text-primary">
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
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                            {
                                label: 'View',
                                href: route('admin.roles.show', role.id),
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                            {
                                label: 'Delete',
                                href: route('admin.roles.destroy', role.id),
                                method: 'delete',
                                as: 'button',
                                type: 'button',
                                className: 'text-primary hover:text-primary/80 cursor-pointer',
                            },
                        ]}
                        keyField="id"
                        emptyMessage="No roles found. Create your first role."
                        pagination={{
                            currentPage: roles.current_page,
                            lastPage: roles.last_page,
                            perPage: roles.per_page,
                            total: roles.total,
                            routeName: 'admin.roles.index',
                        }}
                    />
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
