import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import { FormEvent } from 'react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    type: 'blog' | 'portfolio';
}

interface Props {
    category: Category;
}

const Edit = ({ category }: Props) => {
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
            title: 'Edit',
            href: `/dashboard/categories/${category.id}/edit`,
        },
    ];

    const { data, setData, post, errors } = useForm({
        _method: 'PUT',
        name: category.name,
        description: category.description || '',
        type: category.type,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.update', category.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Category: ${category.name}`} />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Edit Category: {category.name}</h1>
                <div className="flex space-x-2">
                    <Button variant="outline" asChild>
                        <Link href={route('admin.categories.index')}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" form="categoryForm">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                    </Button>
                </div>
            </div>

            <div className="bg-card overflow-hidden rounded-lg shadow-sm">
                <form id="categoryForm" onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Name <span className="text-accent">*</span>
                            </Label>
                            <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={3}
                                placeholder="Provide a description for this category"
                            />
                            {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>
                                Category Type <span className="text-accent">*</span>
                            </Label>
                            <div className="border-border rounded-md border p-4">
                                <RadioGroup
                                    value={data.type}
                                    onValueChange={(value: 'blog' | 'portfolio') => setData('type', value)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="blog" id="type-blog" />
                                        <Label htmlFor="type-blog" className="cursor-pointer">
                                            Blog
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="portfolio" id="type-portfolio" />
                                        <Label htmlFor="type-portfolio" className="cursor-pointer">
                                            Portfolio
                                        </Label>
                                    </div>
                                </RadioGroup>
                                {errors.type && <p className="text-destructive mt-2 text-sm">{errors.type}</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Edit;
