import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEvent } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Categories',
        href: '/dashboard/categories',
    },
    {
        title: 'Create',
        href: '/dashboard/categories/create',
    },
];

const Create = () => {
    const { data, setData, post, errors, reset } = useForm({
        name: '',
        description: '',
        type: 'blog', // Default to blog
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Create Category</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.categories.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 active:bg-muted/70 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Cancel
                                    </Link>
                                </div>
                            </div>

                            <form id="categoryForm" onSubmit={handleSubmit}>
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
                                            <p className="text-muted-foreground mt-1 text-sm">
                                                The URL slug will be automatically generated from the name.
                                            </p>
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
                                                placeholder="Provide a description for this category"
                                            />
                                            {errors.description && <p className="text-accent mt-1 text-sm">{errors.description}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Category Type */}
                                        <div>
                                            <label className="text-card-foreground block text-sm font-medium">
                                                Category Type <span className="text-accent">*</span>
                                            </label>
                                            <div className="border-border bg-muted mt-1 rounded-md border p-4">
                                                <RadioGroup
                                                    value={data.type}
                                                    onValueChange={(value: 'blog' | 'portfolio') => setData('type', value)}
                                                    className="space-y-3"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="blog" id="type-blog" />
                                                        <label htmlFor="type-blog" className="text-card-foreground cursor-pointer text-sm">
                                                            Blog
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="portfolio" id="type-portfolio" />
                                                        <label htmlFor="type-portfolio" className="text-card-foreground cursor-pointer text-sm">
                                                            Portfolio
                                                        </label>
                                                    </div>
                                                </RadioGroup>
                                                {errors.type && <p className="text-accent mt-2 text-sm">{errors.type}</p>}
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="bg-primary text-primary-foreground hover:bg-opacity-90 active:bg-opacity-80 ring-primary inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Category
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
