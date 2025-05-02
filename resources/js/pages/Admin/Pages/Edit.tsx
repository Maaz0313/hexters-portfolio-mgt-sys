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

const Edit = ({ page }: Props) => {
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
        {
            title: 'Edit',
            href: `/dashboard/pages/${page.id}/edit`,
        },
    ];

    const { data, setData, put, errors } = useForm({
        title: page.title,
        content: page.content,
        meta_title: page.meta_title || '',
        meta_description: page.meta_description || '',
        is_published: page.is_published,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route('admin.pages.update', page.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Page: ${page.title}`} />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Edit Page: {page.title}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.pages.index')}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" form="pageForm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                    </Button>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow">
                <form id="pageForm" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                                {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                                <Input
                                    id="meta_title"
                                    value={data.meta_title}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setData('meta_title', e.target.value)}
                                />
                                {errors.meta_title && <p className="text-destructive text-sm">{errors.meta_title}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                            <Textarea
                                id="meta_description"
                                value={data.meta_description}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('meta_description', e.target.value)}
                                rows={3}
                            />
                            {errors.meta_description && <p className="text-destructive text-sm">{errors.meta_description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                value={data.content}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setData('content', e.target.value)}
                                rows={15}
                                required
                            />
                            <p className="text-muted-foreground text-sm">
                                You can use HTML tags for formatting. For example, use &lt;h2&gt; for headings, &lt;p&gt; for paragraphs, etc.
                            </p>
                            {errors.content && <p className="text-destructive text-sm">{errors.content}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="is_published"
                                checked={data.is_published}
                                onCheckedChange={(checked: CheckedState) => setData('is_published', checked === true)}
                            />
                            <Label htmlFor="is_published">Published</Label>
                            {errors.is_published && <p className="text-destructive text-sm">{errors.is_published}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
