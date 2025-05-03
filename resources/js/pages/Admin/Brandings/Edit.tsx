import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEvent } from 'react';

interface Branding {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    branding: Branding;
}

const Edit = ({ branding }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Brandings',
            href: '/dashboard/brandings',
        },
        {
            title: 'Edit',
            href: `/dashboard/brandings/${branding.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: branding.name,
        description: branding.description || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.brandings.update', branding.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Branding: ${branding.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Edit Branding: {branding.name}</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.brandings.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 active:bg-muted/70 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Link>
                                </div>
                            </div>

                            <form id="brandingForm" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="space-y-6 md:col-span-2">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="text-card-foreground block text-sm font-medium">
                                                Name <span className="text-destructive">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            {data.name !== branding.name && (
                                                <p className="text-accent mt-1 text-sm">Note: Changing the name will update the URL slug.</p>
                                            )}

                                            {errors.name && <p className="text-destructive mt-1 text-sm">{errors.name}</p>}
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
                                                className="border-border bg-background text-card-foreground focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                placeholder="Provide a description for this branding"
                                            />
                                            {errors.description && <p className="text-destructive mt-1 text-sm">{errors.description}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Submit Button */}
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                Update Branding
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

export default Edit;
