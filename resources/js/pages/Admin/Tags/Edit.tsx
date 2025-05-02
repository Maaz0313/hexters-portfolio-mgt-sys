import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import React, { FormEvent } from 'react';

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
            
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Edit Tag: {tag.name}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.tags.index')}>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" form="tagForm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </Button>
                </div>
            </div>

            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
                <form id="tagForm" onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name <span className="text-accent">*</span></Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                            <p className="text-muted-foreground text-sm">
                                Tags can be used for both blog posts and portfolio projects.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
