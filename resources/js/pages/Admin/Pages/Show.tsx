import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Trash } from 'lucide-react';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    meta_title: string | null;
    meta_description: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

interface Props {
    page: Page;
}

const Show = ({ page }: Props) => {
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
            title: page.title,
            href: `/dashboard/pages/${page.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Page: ${page.title}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">Page: {page.title}</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.pages.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Link>
                                    <Link
                                        href={route('admin.pages.edit', page.id)}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('admin.pages.destroy', page.id)}
                                        method="delete"
                                        as="button"
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 ring-destructive inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                        onClick={(e) => {
                                            if (!confirm('Are you sure you want to delete this page?')) {
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
                                    {/* Content Preview */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">Content Preview</h2>
                                        <div className="border-border bg-muted rounded-lg border p-4">
                                            <div
                                                className="prose text-card-foreground max-w-none"
                                                dangerouslySetInnerHTML={{ __html: page.content }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {/* Status */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">Status</h2>
                                        <div className="bg-muted rounded-md p-4">
                                            <div className="mb-2 flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Status:</span>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-semibold ${page.is_published ? 'bg-accent/20 text-accent' : 'bg-muted-foreground/20 text-muted-foreground'}`}
                                                >
                                                    {page.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            <div className="mb-2 flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Created:</span>
                                                <span className="text-muted-foreground">{format(new Date(page.created_at), 'MMM d, yyyy')}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Updated:</span>
                                                <span className="text-muted-foreground">{format(new Date(page.updated_at), 'MMM d, yyyy')}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Page Details */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">Page Details</h2>
                                        <div className="bg-muted space-y-3 rounded-md p-4">
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Title:</span>
                                                <span className="text-muted-foreground">{page.title}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Slug:</span>
                                                <span className="text-muted-foreground">{page.slug}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SEO Information */}
                                    <div>
                                        <h2 className="text-primary mb-2 text-lg font-medium">SEO Information</h2>
                                        <div className="bg-muted space-y-3 rounded-md p-4">
                                            <div>
                                                <span className="text-card-foreground mr-2 font-medium">Meta Title:</span>
                                                {page.meta_title ? (
                                                    <span className="text-muted-foreground">{page.meta_title}</span>
                                                ) : (
                                                    <span className="text-muted-foreground italic">Not set</span>
                                                )}
                                            </div>
                                            <div>
                                                <span className="text-card-foreground mr-2 font-medium">Meta Description:</span>
                                                {page.meta_description ? (
                                                    <p className="text-muted-foreground">{page.meta_description}</p>
                                                ) : (
                                                    <span className="text-muted-foreground italic">Not set</span>
                                                )}
                                            </div>
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
