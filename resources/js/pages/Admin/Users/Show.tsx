import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit, ArrowLeft, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string;
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
    user: User;
}

const Show = ({ user }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Users',
            href: '/dashboard/users',
        },
        {
            title: user.name,
            href: `/dashboard/users/${user.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">User: {user.name}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.users.index')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.users.edit', user.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this user?')) {
                                // Use Inertia to delete
                                const form = document.createElement('form');
                                form.method = 'POST';
                                form.action = route('admin.users.destroy', user.id);
                                const methodInput = document.createElement('input');
                                methodInput.type = 'hidden';
                                methodInput.name = '_method';
                                methodInput.value = 'DELETE';
                                form.appendChild(methodInput);
                                const csrfInput = document.createElement('input');
                                csrfInput.type = 'hidden';
                                csrfInput.name = '_token';
                                csrfInput.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
                                form.appendChild(csrfInput);
                                document.body.appendChild(form);
                                form.submit();
                            }
                        }}
                    >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-lg shadow p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
                    <div>
                        <h2 className="text-lg font-medium mb-2">User Details</h2>
                        <div className="space-y-2">
                            <div>
                                <span className="font-medium">Name:</span> {user.name}
                            </div>
                            <div>
                                <span className="font-medium">Email:</span> {user.email}
                            </div>
                            <div>
                                <span className="font-medium">Admin Access:</span>{' '}
                                {user.is_admin ? (
                                    <Badge variant="success">Yes</Badge>
                                ) : (
                                    <Badge variant="secondary">No</Badge>
                                )}
                            </div>
                            <div>
                                <span className="font-medium">Created:</span>{' '}
                                {format(new Date(user.created_at), 'MMM d, yyyy h:mm a')}
                            </div>
                            <div>
                                <span className="font-medium">Last Updated:</span>{' '}
                                {format(new Date(user.updated_at), 'MMM d, yyyy h:mm a')}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-2">Roles</h2>
                        {user.roles.length === 0 ? (
                            <p className="text-muted-foreground">No roles assigned.</p>
                        ) : (
                            <div className="space-y-2">
                                {user.roles.map((role) => (
                                    <div key={role.id} className="p-3 border rounded-md">
                                        <div className="font-medium">{role.name}</div>
                                        <div className="text-sm text-muted-foreground">{role.description}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
