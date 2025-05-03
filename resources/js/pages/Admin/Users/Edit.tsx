import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FileText, X } from 'lucide-react';
import { FormEvent } from 'react';

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
    roles: Role[];
}

interface Props {
    user: User;
    roles: Role[];
}

const Edit = ({ user, roles }: Props) => {
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
        {
            title: 'Edit',
            href: `/dashboard/users/${user.id}/edit`,
        },
    ];

    const { data, setData, put, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        roles: user.roles.map((role) => role.id),
        is_admin: user.is_admin,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    const handleRoleChange = (roleId: number, checked: boolean) => {
        if (checked) {
            setData('roles', [...data.roles, roleId]);
        } else {
            setData(
                'roles',
                data.roles.filter((id) => id !== roleId),
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit User: ${user.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="title-text text-primary text-3xl font-bold">Edit User: {user.name}</h1>
                        <div className="flex space-x-2">
                            <Link
                                href={route('admin.users.index')}
                                className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Link>
                            <Link
                                href={route('admin.users.show', user.id)}
                                className="bg-accent text-accent-foreground hover:bg-accent/80 ring-accent inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                View
                            </Link>
                        </div>
                    </div>

                    <div className="bg-card overflow-hidden rounded-lg shadow-sm">
                        <form id="userForm" onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">
                                            Name <span className="text-accent">*</span>
                                        </Label>
                                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            Email <span className="text-accent">*</span>
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                        />
                                        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password (leave blank to keep current)</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label>Roles</Label>
                                    <div className="border-border rounded-md border p-4">
                                        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                                            {roles.map((role) => (
                                                <div key={role.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`role-${role.id}`}
                                                        checked={data.roles.includes(role.id)}
                                                        onCheckedChange={(checked) => handleRoleChange(role.id, checked as boolean)}
                                                    />
                                                    <Label htmlFor={`role-${role.id}`} className="cursor-pointer">
                                                        {role.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.roles && <p className="text-destructive mt-2 text-sm">{errors.roles}</p>}
                                    </div>
                                </div>

                                <div className="border-border rounded-md border p-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_admin"
                                            checked={data.is_admin}
                                            onCheckedChange={(checked) => setData('is_admin', checked as boolean)}
                                        />
                                        <Label htmlFor="is_admin" className="cursor-pointer font-medium">
                                            Administrator Access
                                        </Label>
                                    </div>
                                    <p className="text-muted-foreground mt-2 pl-6 text-sm">
                                        Administrators have full access to all features regardless of assigned roles.
                                    </p>
                                    {errors.is_admin && <p className="text-destructive mt-2 text-sm">{errors.is_admin}</p>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
