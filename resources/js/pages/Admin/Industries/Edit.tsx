import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import React, { FormEvent } from 'react';

interface Industry {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    industry: Industry;
}

const Edit = ({ industry }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Industries',
            href: '/dashboard/industries',
        },
        {
            title: 'Edit',
            href: `/dashboard/industries/${industry.id}/edit`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: industry.name,
        description: industry.description || '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.industries.update', industry.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Industry: ${industry.name}`} />
            
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Edit Industry: {industry.name}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.industries.index')}>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" form="industryForm">
                        <Save className="w-4 h-4 mr-2" />
                        Save
                    </Button>
                </div>
            </div>

            <div className="bg-card shadow-sm rounded-lg overflow-hidden">
                <form id="industryForm" onSubmit={handleSubmit} className="p-6">
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
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                placeholder="Provide a description for this industry"
                            />
                            {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
