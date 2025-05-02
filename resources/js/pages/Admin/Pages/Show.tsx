import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Edit, ArrowLeft, Trash } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Page: {page.title}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.pages.index')}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={route('admin.pages.edit', page.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (confirm('Are you sure you want to delete this page?')) {
                                // Use Inertia to delete
                                const form = document.createElement('form');
                                form.method = 'POST';
                                form.action = route('admin.pages.destroy', page.id);
                                const methodInput = document.createElement('input');
                                methodInput.type = 'hidden';
                                methodInput.name = '_method';
                                methodInput.value = 'DELETE';
                                form.appendChild(methodInput);
                                const csrfInput = document.createElement('input');
                                csrfInput.type = 'hidden';
                                csrfInput.name = '_token';
                                csrfInput.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
                                form.appendChild(csrfInput);
                                document.body.appendChild(form);
                                form.submit();
                            }
                        }}
                    >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-lg shadow p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-6">
                    <div>
                        <h2 className="text-lg font-medium mb-2">Page Details</h2>
                        <div className="space-y-2">
                            <div>
                                <span className="font-medium">Title:</span> {page.title}
                            </div>
                            <div>
                                <span className="font-medium">Slug:</span> {page.slug}
                            </div>
                            <div>
                                <span className="font-medium">Status:</span>{' '}
                                {page.is_published ? (
                                    <Badge variant="success">Published</Badge>
                                ) : (
                                    <Badge variant="secondary">Draft</Badge>
                                )}
                            </div>
                            <div>
                                <span className="font-medium">Created:</span>{' '}
                                {format(new Date(page.created_at), 'MMM d, yyyy h:mm a')}
                            </div>
                            <div>
                                <span className="font-medium">Last Updated:</span>{' '}
                                {format(new Date(page.updated_at), 'MMM d, yyyy h:mm a')}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium mb-2">SEO Information</h2>
                        <div className="space-y-2">
                            <div>
                                <span className="font-medium">Meta Title:</span>{' '}
                                {page.meta_title || <span className="text-muted-foreground italic">Not set</span>}
                            </div>
                            <div>
                                <span className="font-medium">Meta Description:</span>{' '}
                                {page.meta_description ? (
                                    <p className="text-muted-foreground">{page.meta_description}</p>
                                ) : (
                                    <span className="text-muted-foreground italic">Not set</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-medium mb-2">Content Preview</h2>
                    <div className="border rounded-lg p-4 bg-background">
                        <div dangerouslySetInnerHTML={{ __html: page.content }} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
