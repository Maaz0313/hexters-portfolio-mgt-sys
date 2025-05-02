import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit, ArrowLeft, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    role.permissions.forEach(permission => {
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

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Role: {role.name}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.roles.index')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.roles.edit', role.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Link>
                    </Button>
                    {role.users_count === 0 && (
                        <Button
                            variant="destructive"
                            as="a"
                            href={route('admin.roles.destroy', role.id)}
                            method="delete"
                        >
                            <Trash className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    )}
                </div>
            </div>

            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Name</p>
                                    <p>{role.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Slug</p>
                                    <p>{role.slug}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Description</p>
                                    <p>{role.description || 'No description'}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Created</p>
                                    <p>{format(new Date(role.created_at), 'PPP')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Last Updated</p>
                                    <p>{format(new Date(role.updated_at), 'PPP')}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Users with this role</p>
                                    <Badge variant="outline" className="bg-accent/10 text-accent mt-1">
                                        {role.users_count}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Permissions ({role.permissions.length})</h3>
                            <div className="space-y-4">
                                {Object.entries(groupedPermissions).map(([resource, permissions]) => (
                                    <div key={resource} className="border border-border rounded-md p-4">
                                        <h4 className="font-medium capitalize mb-2">{resource}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {permissions.map(permission => (
                                                <Badge key={permission.id} variant="outline" className="bg-accent/10 text-accent">
                                                    {permission.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                
                                {role.permissions.length === 0 && (
                                    <p className="text-muted-foreground">No permissions assigned to this role.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
