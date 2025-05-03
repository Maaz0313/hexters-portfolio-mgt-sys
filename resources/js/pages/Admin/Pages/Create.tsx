import { Checkbox, type CheckedState } from '@/components/ui/checkbox';
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
        title: 'Pages',
        href: '/dashboard/pages',
    },
    {
        title: 'Create',
        href: '/dashboard/pages/create',
    },
];

const Create = () => {
    const { data, setData, post, errors, reset } = useForm<{
        title: string;
        content: string;
        meta_title: string;
        meta_description: string;
        is_published: boolean;
    }>({
        title: '',
        content: '',
        meta_title: '',
        meta_description: '',
        is_published: true,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.pages.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Page" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Create Page</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.pages.index')}
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
                                        {/* Title */}
                                        <div>
                                            <label htmlFor="title" className="text-card-foreground block text-sm font-medium">
                                                Title <span className="text-accent">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            {errors.title && <p className="text-accent mt-1 text-sm">{errors.title}</p>}
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <label htmlFor="content" className="text-card-foreground block text-sm font-medium">
                                                Content <span className="text-accent">*</span>
                                            </label>
                                            <textarea
                                                id="content"
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                                rows={15}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                                required
                                            />
                                            <p className="text-secondary mt-1 text-sm">
                                                You can use HTML tags for formatting. For example, use &lt;h2&gt; for headings, &lt;p&gt; for
                                                paragraphs, etc.
                                            </p>
                                            {errors.content && <p className="text-accent mt-1 text-sm">{errors.content}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* SEO Meta Title */}
                                        <div>
                                            <label htmlFor="meta_title" className="text-card-foreground block text-sm font-medium">
                                                Meta Title (SEO)
                                            </label>
                                            <input
                                                type="text"
                                                id="meta_title"
                                                value={data.meta_title}
                                                onChange={(e) => setData('meta_title', e.target.value)}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                            />
                                            {errors.meta_title && <p className="text-accent mt-1 text-sm">{errors.meta_title}</p>}
                                        </div>

                                        {/* SEO Meta Description */}
                                        <div>
                                            <label htmlFor="meta_description" className="text-card-foreground block text-sm font-medium">
                                                Meta Description (SEO)
                                            </label>
                                            <textarea
                                                id="meta_description"
                                                value={data.meta_description}
                                                onChange={(e) => setData('meta_description', e.target.value)}
                                                rows={3}
                                                className="bg-muted border-border text-card-foreground focus:border-accent focus:ring-accent focus:ring-opacity-50 mt-1 block w-full rounded-md shadow-sm focus:ring"
                                            />
                                            {errors.meta_description && <p className="text-accent mt-1 text-sm">{errors.meta_description}</p>}
                                        </div>

                                        {/* Published Status */}
                                        <div className="flex items-center">
                                            <Checkbox
                                                id="is_published"
                                                checked={data.is_published}
                                                onCheckedChange={(checked: CheckedState) => {
                                                    setData('is_published', checked === 'indeterminate' ? false : checked);
                                                }}
                                            />
                                            <label htmlFor="is_published" className="text-card-foreground ml-2 cursor-pointer text-sm">
                                                Publish immediately
                                            </label>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="mt-6">
                                            <button
                                                type="submit"
                                                className="bg-primary text-primary-foreground hover:bg-opacity-90 active:bg-opacity-80 ring-primary inline-flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                            >
                                                <Save className="mr-2 h-4 w-4" />
                                                Save Page
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
