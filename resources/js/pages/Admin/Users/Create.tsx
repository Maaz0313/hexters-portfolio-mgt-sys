import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEvent } from 'react';

interface Role {
    id: number;
    name: string;
    slug: string;
    description: string;
}

interface Props {
    roles: Role[];
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
    {
        title: 'Create',
        href: '/dashboard/users/create',
    },
];

const Create = ({ roles }: Props) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: [] as number[],
        is_admin: false,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.users.store'), {
            onSuccess: () => reset(),
        });
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
            <Head title="Create User" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Create User</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.users.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 active:bg-muted/70 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Link>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="space-y-6 md:col-span-2">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="text-card-foreground block text-sm font-medium">
                                                Name <span className="text-accent">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            {errors.name && <p className="text-accent mt-1 text-sm">{errors.name}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="text-card-foreground block text-sm font-medium">
                                                Email <span className="text-accent">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            {errors.email && <p className="text-accent mt-1 text-sm">{errors.email}</p>}
                                        </div>

                                        {/* Password */}
                                        <div>
                                            <label htmlFor="password" className="text-card-foreground block text-sm font-medium">
                                                Password <span className="text-accent">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="password"
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            {errors.password && <p className="text-accent mt-1 text-sm">{errors.password}</p>}
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label htmlFor="password_confirmation" className="text-card-foreground block text-sm font-medium">
                                                Confirm Password <span className="text-accent">*</span>
                                            </label>
                                            <input
                                                type="password"
                                                id="password_confirmation"
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            {errors.password_confirmation && (
                                                <p className="text-accent mt-1 text-sm">{errors.password_confirmation}</p>
                                            )}
                                        </div>

                                        {/* Roles */}
                                        <div>
                                            <label className="text-card-foreground mb-2 block text-sm font-medium">Roles</label>
                                            <div className="border-border bg-muted max-h-60 space-y-2 overflow-y-auto rounded-md border p-2">
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
                                                {errors.roles && <p className="text-accent mt-2 text-sm">{errors.roles}</p>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Administrator Access */}
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
                                            <p className="text-secondary mt-2 pl-6 text-sm">
                                                Administrators have full access to all features regardless of assigned roles.
                                            </p>
                                            {errors.is_admin && <p className="text-accent mt-2 text-sm">{errors.is_admin}</p>}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-primary text-primary-foreground hover:bg-opacity-90 active:bg-opacity-80 ring-primary inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                {processing ? 'Saving...' : 'Save User'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
