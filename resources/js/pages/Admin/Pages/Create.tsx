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

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Create Page</h1>
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
                                onCheckedChange={(checked: CheckedState) => {
                                    setData('is_published', checked === 'indeterminate' ? false : checked);
                                }}
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

export default Create;
