import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Trash } from 'lucide-react';

interface Permission {
    id: number;
    name: string;
    slug: string;
    description: string;
}

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
    users_count: number;
}

interface Props {
    role: Role;
}

const Show = ({ role }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Roles',
            href: '/dashboard/roles',
        },
        {
            title: role.name,
            href: `/dashboard/roles/${role.id}`,
        },
    ];

    // Group permissions by resource
    const groupedPermissions: Record<string, Permission[]> = {};
    role.permissions.forEach((permission) => {
        const parts = permission.slug.split('-');
        if (parts.length >= 2) {
            const resource = parts[1];
            if (!groupedPermissions[resource]) {
                groupedPermissions[resource] = [];
            }
            groupedPermissions[resource].push(permission);
        }
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Role: ${role.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Role: {role.name}</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.roles.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Link>
                                    <Link
                                        href={route('admin.roles.edit', role.id)}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Link>
                                    {role.users_count === 0 && (
                                        <Link
                                            href={route('admin.roles.destroy', role.id)}
                                            method="delete"
                                            as="button"
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 ring-destructive inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            onClick={(e) => {
                                                if (!confirm('Are you sure you want to delete this role?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div className="space-y-6 md:col-span-2">
                                    {/* Role Details */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">Role Details</h2>
                                        <div className="bg-muted space-y-3 rounded-md p-4">
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Name:</span>
                                                <span className="text-muted-foreground">{role.name}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Slug:</span>
                                                <span className="text-muted-foreground">{role.slug}</span>
                                            </div>
                                            {role.description && (
                                                <div>
                                                    <span className="text-card-foreground mr-2 font-medium">Description:</span>
                                                    <span className="text-muted-foreground">{role.description}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Created:</span>
                                                <span className="text-muted-foreground">{format(new Date(role.created_at), 'MMM d, yyyy')}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Last Updated:</span>
                                                <span className="text-muted-foreground">{format(new Date(role.updated_at), 'MMM d, yyyy')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Usage */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">Usage</h2>
                                        <div className="bg-muted rounded-md p-4">
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Users with this role:</span>
                                                <span className="bg-accent/20 text-accent rounded-full px-2 py-1 text-xs font-semibold">
                                                    {role.users_count}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Permissions */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">Permissions ({role.permissions.length})</h2>
                                        <div className="bg-muted rounded-md p-4">
                                            {role.permissions.length > 0 ? (
                                                <div className="space-y-4">
                                                    {Object.entries(groupedPermissions).map(([resource, permissions]) => (
                                                        <div key={resource} className="border-border rounded-md border p-4">
                                                            <h4 className="mb-2 font-medium capitalize">{resource}</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {permissions.map((permission) => (
                                                                    <span
                                                                        key={permission.id}
                                                                        className="bg-accent/20 text-accent inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                                                    >
                                                                        {permission.name}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground italic">No permissions assigned</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
