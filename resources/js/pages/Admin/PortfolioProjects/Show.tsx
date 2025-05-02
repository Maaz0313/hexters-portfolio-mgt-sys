import ImageGallery from '@/components/ImageGallery';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Trash } from 'lucide-react';

interface Branding {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface Industry {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    created_at: string;
    updated_at: string;
}

interface PortfolioImage {
    id: number;
    image_path: string;
    alt_text: string | null;
    display_order: number;
    is_featured: boolean;
}

interface PortfolioProject {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    image_alt: string | null;
    branding: Branding | null;
    industry: Industry | null;
    completion_date: string | null;
    is_featured: boolean;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    user: {
        id: number;
        name: string;
    };
    images: PortfolioImage[];
}

interface Props {
    portfolioProject: PortfolioProject;
}

const Show = ({ portfolioProject }: Props) => {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Portfolio Projects',
            href: '/dashboard/portfolio-projects',
        },
        {
            title: portfolioProject.title,
            href: `/dashboard/portfolio-projects/${portfolioProject.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Portfolio Project: ${portfolioProject.title}`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-card overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-card border-border border-b p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h1 className="title-text text-primary text-2xl font-bold">{portfolioProject.title}</h1>
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('admin.portfolio-projects.index')}
                                        className="bg-muted text-muted-foreground hover:bg-muted/80 ring-muted inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back
                                    </Link>
                                    <Link
                                        href={route('admin.portfolio-projects.edit', portfolioProject.id)}
                                        className="bg-primary text-primary-foreground hover:bg-primary/90 ring-primary inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                    >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('admin.portfolio-projects.destroy', portfolioProject.id)}
                                        method="delete"
                                        as="button"
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 ring-destructive inline-flex cursor-pointer items-center rounded-md border border-transparent px-4 py-2 text-xs font-semibold tracking-widest uppercase transition focus:ring focus:outline-none disabled:opacity-25"
                                        onClick={(e) => {
                                            if (!confirm('Are you sure you want to delete this project?')) {
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
                                    {/* Main Project Image */}
                                    {portfolioProject.image && (
                                        <div className="mb-6">
                                            <h2 className="text-card-foreground mb-4 text-lg font-medium">Main Project Image</h2>
                                            {/* Debug info - remove in production */}
                                            <div className="text-muted-foreground mb-2 text-xs">Image path: {portfolioProject.image}</div>
                                            <img
                                                src={
                                                    portfolioProject.image?.startsWith('/')
                                                        ? `/storage${portfolioProject.image}`
                                                        : `/storage/${portfolioProject.image}`
                                                }
                                                alt={portfolioProject.image_alt || portfolioProject.title}
                                                className="h-auto w-full rounded-lg object-cover"
                                                style={{ maxHeight: '400px' }}
                                                onError={(e) => {
                                                    console.error('Main image failed to load:', portfolioProject.image);
                                                    // Add fallback image or hide the element
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    )}

                                    {/* Additional Project Images */}
                                    {portfolioProject.images && portfolioProject.images.length > 0 && (
                                        <div>
                                            <h2 className="text-card-foreground mb-4 text-lg font-medium">Additional Project Images</h2>
                                            <ImageGallery images={portfolioProject.images} behanceStyle={true} editable={false} />
                                        </div>
                                    )}

                                    {/* Description */}
                                    {portfolioProject.description && (
                                        <div>
                                            <h2 className="text-card-foreground mb-2 text-lg font-medium">Description</h2>
                                            <p className="text-card-foreground">{portfolioProject.description}</p>
                                        </div>
                                    )}

                                    {/* Content removed */}
                                </div>

                                <div className="space-y-6">
                                    {/* Status */}
                                    <div>
                                        <h2 className="text-card-foreground mb-2 text-lg font-medium">Status</h2>
                                        <div className="bg-muted rounded-md p-4">
                                            <div className="mb-2 flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Status:</span>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-semibold ${portfolioProject.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                                                >
                                                    {portfolioProject.is_published ? 'Published' : 'Draft'}
                                                </span>
                                            </div>
                                            <div className="mb-2 flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Featured:</span>
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-semibold ${portfolioProject.is_featured ? 'bg-purple-100 text-purple-800' : 'bg-muted-foreground/20 text-muted-foreground'}`}
                                                >
                                                    {portfolioProject.is_featured ? 'Featured' : 'Not Featured'}
                                                </span>
                                            </div>
                                            <div className="mb-2 flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Created:</span>
                                                <span className="text-muted-foreground">
                                                    {format(new Date(portfolioProject.created_at), 'MMM d, yyyy')}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-card-foreground mr-2 font-medium">Updated:</span>
                                                <span className="text-muted-foreground">
                                                    {format(new Date(portfolioProject.updated_at), 'MMM d, yyyy')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div>
                                        <h2 className="text-card-foreground mb-2 text-lg font-medium">Project Details</h2>
                                        <div className="bg-muted rounded-md p-4">
                                            {portfolioProject.branding && (
                                                <div className="mb-2 flex items-center">
                                                    <span className="text-card-foreground mr-2 font-medium">Branding:</span>
                                                    <span className="text-muted-foreground">{portfolioProject.branding.name}</span>
                                                </div>
                                            )}
                                            {portfolioProject.industry && (
                                                <div className="mb-2 flex items-center">
                                                    <span className="text-card-foreground mr-2 font-medium">Industry:</span>
                                                    <span className="text-muted-foreground">{portfolioProject.industry.name}</span>
                                                </div>
                                            )}
                                            {portfolioProject.completion_date && (
                                                <div className="mb-2 flex items-center">
                                                    <span className="text-card-foreground mr-2 font-medium">Completed:</span>
                                                    <span className="text-muted-foreground">
                                                        {format(new Date(portfolioProject.completion_date), 'MMM d, yyyy')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Author */}
                                    <div>
                                        <h2 className="text-card-foreground mb-2 text-lg font-medium">Author</h2>
                                        <div className="bg-muted rounded-md p-4">
                                            <div className="flex items-center">
                                                <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full font-bold">
                                                    {portfolioProject.user.name.charAt(0)}
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-card-foreground text-sm font-medium">{portfolioProject.user.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category and Tags removed */}
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
