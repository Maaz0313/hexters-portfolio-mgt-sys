import { Button } from '@/components/ui/button';
import { Checkbox, type CheckedState } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea-fix';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { ChangeEvent, FormEvent } from 'react';

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

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Create Role</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.roles.index')}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" form="roleForm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                    </Button>
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
                                            onCheckedChange={(checked: CheckedState) => handleSelectAllInGroup(groupPermissions, checked === true)}
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
        </AppLayout>
    );
};

export default Create;
