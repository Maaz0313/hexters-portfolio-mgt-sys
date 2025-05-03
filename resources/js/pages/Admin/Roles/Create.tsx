import { Checkbox, type CheckedState } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEvent } from 'react';

interface Permission {
    id: number;
    name: string;
    slug: string;
    description: string;
}

interface Props {
    permissions: Permission[];
    groupedPermissions: Record<string, Permission[]>;
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
    {
        title: 'Create',
        href: '/dashboard/roles/create',
    },
];

const Create = ({ groupedPermissions }: Props) => {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        description: '',
        permissions: [] as number[],
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.roles.store'), {
            onSuccess: () => reset(),
        });
    };

    const handlePermissionChange = (permissionId: number, checked: boolean) => {
        if (checked) {
            setData('permissions', [...data.permissions, permissionId]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((id) => id !== permissionId),
            );
        }
    };

    const handleSelectAllInGroup = (groupPermissions: Permission[], checked: boolean) => {
        const permissionIds = groupPermissions.map((p) => p.id);

        if (checked) {
            // Add all permissions from this group that aren't already selected
            const newPermissions = [...data.permissions];
            permissionIds.forEach((id) => {
                if (!newPermissions.includes(id)) {
                    newPermissions.push(id);
                }
            });
            setData('permissions', newPermissions);
        } else {
            // Remove all permissions from this group
            setData(
                'permissions',
                data.permissions.filter((id) => !permissionIds.includes(id)),
            );
        }
    };

    const isGroupFullySelected = (groupPermissions: Permission[]) => {
        return groupPermissions.every((permission) => data.permissions.includes(permission.id));
    };

    const isGroupPartiallySelected = (groupPermissions: Permission[]) => {
        return groupPermissions.some((permission) => data.permissions.includes(permission.id)) && !isGroupFullySelected(groupPermissions);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Create Role</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.roles.index')}
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

                                        {/* Description */}
                                        <div>
                                            <label htmlFor="description" className="text-card-foreground block text-sm font-medium">
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                rows={3}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                placeholder="Provide a description of this role's purpose and responsibilities"
                                            />
                                            {errors.description && <p className="text-accent mt-1 text-sm">{errors.description}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Permissions */}
                                        <div>
                                            <label className="text-card-foreground mb-2 block text-sm font-medium">
                                                Permissions <span className="text-accent">*</span>
                                            </label>
                                            <div className="border-border bg-muted max-h-96 space-y-4 overflow-y-auto rounded-md border p-4">
                                                {Object.entries(groupedPermissions).map(([resource, groupPermissions]) => (
                                                    <div key={resource} className="border-border mb-4 rounded-md border p-4">
                                                        <div className="mb-3 flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`group-${resource}`}
                                                                checked={isGroupFullySelected(groupPermissions)}
                                                                indeterminate={isGroupPartiallySelected(groupPermissions)}
                                                                onCheckedChange={(checked: CheckedState) =>
                                                                    handleSelectAllInGroup(groupPermissions, checked === true)
                                                                }
                                                            />
                                                            <Label htmlFor={`group-${resource}`} className="cursor-pointer font-medium capitalize">
                                                                {resource}
                                                            </Label>
                                                        </div>

                                                        <div className="grid grid-cols-1 gap-2 pl-6 md:grid-cols-2">
                                                            {groupPermissions.map((permission) => (
                                                                <div key={permission.id} className="flex items-center space-x-2">
                                                                    <Checkbox
                                                                        id={`permission-${permission.id}`}
                                                                        checked={data.permissions.includes(permission.id)}
                                                                        onCheckedChange={(checked: CheckedState) =>
                                                                            handlePermissionChange(permission.id, checked === true)
                                                                        }
                                                                    />
                                                                    <Label htmlFor={`permission-${permission.id}`} className="cursor-pointer">
                                                                        {permission.name}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                                {errors.permissions && <p className="text-accent mt-2 text-sm">{errors.permissions}</p>}
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="bg-primary text-primary-foreground hover:bg-opacity-90 active:bg-opacity-80 ring-primary inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Role
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
