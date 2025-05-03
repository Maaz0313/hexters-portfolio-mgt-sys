import { Checkbox, type CheckedState } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea-fix';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FileText, X } from 'lucide-react';
import { ChangeEvent, FormEvent } from 'react';

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
    permissions: Permission[];
}

interface Props {
    role: Role;
    permissions: Permission[];
    groupedPermissions: Record<string, Permission[]>;
}

const Edit = ({ role, groupedPermissions }: Props) => {
    const breadcrumbs = [
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
        {
            title: 'Edit',
            href: `/dashboard/roles/${role.id}/edit`,
        },
    ];

    const { data, setData, put, errors } = useForm({
        name: role.name,
        description: role.description || '',
        permissions: role.permissions.map((permission) => permission.id),
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.roles.update', role.id));
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
            <Head title={`Edit Role: ${role.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="title-text text-primary text-3xl font-bold">Edit Role: {role.name}</h1>
                        <div className="flex space-x-2">
                            <Link
                                href={route('admin.roles.index')}
                                className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Link>
                            <Link
                                href={route('admin.roles.show', role.id)}
                                className="bg-accent text-accent-foreground hover:bg-accent/80 ring-accent inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                View
                            </Link>
                        </div>
                    </div>

                    <div className="bg-card overflow-hidden rounded-lg shadow-sm">
                        <form id="roleForm" onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Name <span className="text-accent">*</span>
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                        required
                                    />
                                    {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                        rows={3}
                                        placeholder="Provide a description of this role's purpose and responsibilities"
                                    />
                                    {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                                </div>

                                <div className="space-y-4">
                                    <Label>
                                        Permissions <span className="text-accent">*</span>
                                    </Label>

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

                                            <div className="grid grid-cols-1 gap-2 pl-6 md:grid-cols-2 lg:grid-cols-3">
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

                                    {errors.permissions && <p className="text-destructive text-sm">{errors.permissions}</p>}
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
