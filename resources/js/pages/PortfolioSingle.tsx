import BlogPostCard from '@/components/BlogPostCard';
import ImageGallery from '@/components/ImageGallery';
import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

interface PortfolioImage {
    id: number;
    image_path: string;
    alt_text: string | null;
    display_order: number;
    is_featured: boolean;
}

interface Branding {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface Industry {
    id: number;
    name: string;
    slug: string;
    description: string | null;
}

interface PortfolioProject {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    image_alt: string | null;
    branding_id: number | null;
    industry_id: number | null;
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
    relatedProjects: PortfolioProject[];
}

const PortfolioSingle = ({ portfolioProject, relatedProjects }: Props) => {
    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return format(date, 'MMMM d, yyyy');
    };

    // Get the main image path
    const getMainImagePath = () => {
        if (portfolioProject.image) {
            return `/storage/${portfolioProject.image}`;
        }

        // If no main image, try to find a featured image
        const featuredImage = portfolioProject.images?.find((img) => img.is_featured);
        if (featuredImage) {
            return `/storage/${featuredImage.image_path}`;
        }

        // If no featured image, use the first image
        if (portfolioProject.images?.length > 0) {
            return `/storage/${portfolioProject.images[0].image_path}`;
        }

        // Fallback to placeholder
        return '/images/placeholder.jpg';
    };

    return (
        <Layout>
            <Head title={portfolioProject.title} />

            <div className="bg-background text-foreground">
                {/* Header with project title and back button */}
                <div className="border-border border-b">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col justify-between md:flex-row md:items-center">
                            <div>
                                <h1 className="title-text text-primary mb-2 text-4xl font-bold md:text-5xl">{portfolioProject.title}</h1>
                                <div className="text-primary text-lg">
                                    {portfolioProject.user?.name} • {formatDate(portfolioProject.created_at)}
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Link
                                    href="/portfolio"
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-md px-4 py-2 transition-colors"
                                >
                                    Back to Portfolio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Left column - Project images */}
                        <div className="md:col-span-2">
                            {/* Main image */}
                            <div className="mb-8 overflow-hidden rounded-lg">
                                <img
                                    src={getMainImagePath()}
                                    alt={portfolioProject.image_alt || portfolioProject.title}
                                    className="h-auto w-full object-contain"
                                />
                            </div>

                            {/* Project images gallery - Behance style */}
                            {portfolioProject.images && portfolioProject.images.length > 0 && (
                                <div className="mb-8">
                                    <ImageGallery images={portfolioProject.images} behanceStyle={true} />
                                </div>
                            )}

                            {/* Description */}
                            {portfolioProject.description && (
                                <div className="bg-card mb-8 rounded-lg p-6">
                                    <h2 className="text-card-foreground mb-4 text-2xl font-bold">Project Overview</h2>
                                    <p className="text-card-foreground/80">{portfolioProject.description}</p>
                                </div>
                            )}
                        </div>

                        {/* Right column - Project info */}
                        <div className="bg-card sticky top-8 h-fit rounded-lg p-6">
                            <h2 className="text-card-foreground mb-4 text-2xl font-bold">Project Details</h2>

                            {/* Branding and Industry */}
                            <div className="mb-6">
                                {portfolioProject.branding && (
                                    <div className="mb-4">
                                        <h3 className="text-card-foreground mb-2 text-lg font-semibold">Branding</h3>
                                        <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                                            {portfolioProject.branding.name}
                                        </div>
                                    </div>
                                )}

                                {portfolioProject.industry && (
                                    <div>
                                        <h3 className="text-card-foreground mb-2 text-lg font-semibold">Industry</h3>
                                        <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                                            {portfolioProject.industry.name}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Completion date */}
                            {portfolioProject.completion_date && (
                                <div className="mb-6">
                                    <h3 className="text-card-foreground mb-2 text-lg font-semibold">Completed</h3>
                                    <p className="text-card-foreground/80">{formatDate(portfolioProject.completion_date)}</p>
                                </div>
                            )}

                            {/* Author info */}
                            <div className="border-border border-t pt-6">
                                <h3 className="text-card-foreground mb-2 text-lg font-semibold">Created by</h3>
                                <div className="flex items-center">
                                    <div className="bg-primary/20 text-primary mr-3 flex h-10 w-10 items-center justify-center rounded-full">
                                        {portfolioProject.user?.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-card-foreground font-medium">{portfolioProject.user?.name}</div>
                                        <div className="text-card-foreground/70 text-sm">Designer</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Projects */}
                {relatedProjects.length > 0 && (
                    <div className="container mx-auto px-4 py-12">
                        <h2 className="text-primary mb-8 text-2xl font-bold">Related Projects</h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {relatedProjects.map((project) => (
                                <BlogPostCard
                                    key={project.id}
                                    title={project.title}
                                    href={project.slug ? route('portfolio.show', { slug: project.slug }) : ''}
                                    imageSrc={project.image ? `/storage/${project.image}` : '/images/placeholder.jpg'}
                                    imageAlt={project.image_alt || project.title}
                                    excerpt={project.description || ''}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default PortfolioSingle;
