import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Trash } from 'lucide-react';

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
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">User: {user.name}</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.users.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Link>
                                    <Link
                                        href={route('admin.users.edit', user.id)}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('admin.users.destroy', user.id)}
                                        method="delete"
                                        as="button"
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 ring-destructive inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                        onClick={(e) => {
                                            if (!confirm('Are you sure you want to delete this user?')) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                <div className="space-y-6 md:col-span-2">
                                    {/* User Details */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">User Details</h2>
                                        <div className="bg-muted space-y-3 rounded-md p-4">
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Name:</span>
                                                <span className="text-muted-foreground">{user.name}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Email:</span>
                                                <span className="text-muted-foreground">{user.email}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Created:</span>
                                                <span className="text-muted-foreground">
                                                    {format(new Date(user.created_at), 'MMM d, yyyy h:mm a')}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Last Updated:</span>
                                                <span className="text-muted-foreground">
                                                    {format(new Date(user.updated_at), 'MMM d, yyyy h:mm a')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Admin Status */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">Admin Status</h2>
                                        <div className="bg-muted rounded-md p-4">
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Admin Access:</span>
                                                {user.is_admin ? (
                                                    <span className="bg-accent/20 text-accent rounded-full px-2 py-1 text-xs font-semibold">Yes</span>
                                                ) : (
                                                    <span className="bg-muted-foreground/20 text-muted-foreground rounded-full px-2 py-1 text-xs font-semibold">
                                                        No
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Roles */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">Roles</h2>
                                        <div className="bg-muted rounded-md p-4">
                                            {user.roles.length > 0 ? (
                                                <div className="space-y-2">
                                                    {user.roles.map((role) => (
                                                        <div key={role.id} className="border-border rounded-md border p-3">
                                                            <div className="text-card-foreground font-medium">{role.name}</div>
                                                            {role.description && (
                                                                <div className="text-muted-foreground mt-1 text-sm">{role.description}</div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground italic">No roles assigned</span>
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
