import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEvent } from 'react';

interface Tag {
    id: number;
    name: string;
    slug: string;
}

interface Props {
    tag: Tag;
}

const Edit = ({ tag }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Tags',
            href: '/dashboard/tags',
        },
        {
            title: 'Edit',
            href: `/dashboard/tags/${tag.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: tag.name,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.tags.update', tag.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Tag: ${tag.name}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Edit Tag: {tag.name}</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.tags.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 active:bg-muted/70 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Link>
                                </div>
                            </div>

                            <form id="tagForm" onSubmit={handleSubmit}>
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
                                            {data.name !== tag.name && (
                                                <p className="text-accent mt-1 text-sm">Note: Changing the name will update the URL slug.</p>
                                            )}

                                            <p className="text-muted-foreground mt-1 text-sm">
                                                Tags can be used for both blog posts and portfolio projects.
                                            </p>
                                            {errors.name && <p className="text-destructive mt-1 text-sm">{errors.name}</p>}
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
                                                Update Tag
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
