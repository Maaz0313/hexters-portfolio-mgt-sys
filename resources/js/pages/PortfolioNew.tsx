import Layout from '@/Layout';
import BlogPostCard from '@/components/BlogPostCard';
import { Head } from '@inertiajs/react';

interface PortfolioProject {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    image: string | null;
    image_alt: string | null;
}

interface Props {
    portfolioProjects: PortfolioProject[];
}

const PortfolioNew = ({ portfolioProjects = [] }: Props) => {
    // Ensure portfolioProjects is an array
    const projects = Array.isArray(portfolioProjects) ? portfolioProjects : [];

    console.log('Portfolio Projects:', projects); // Debug log

    return (
        <>
            <Head title="Portfolio" />
            <Layout>
                <div className="container mx-auto px-4 py-12">
                    <h1 className="mb-8 text-3xl font-bold">Portfolio Projects</h1>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {projects.length > 0 ? (
                            projects.map((project) => (
                                <BlogPostCard
                                    key={project.id}
                                    title={project.title}
                                    href={project.slug ? route('portfolio.show', { slug: project.slug }) : ''}
                                    imageSrc={project.image ? `/storage/${project.image}` : '/images/placeholder.jpg'}
                                    imageAlt={project.image_alt || project.title}
                                    excerpt={project.description || ''}
                                />
                            ))
                        ) : (
                            <div className="col-span-3 py-10 text-center">
                                <p className="text-lg text-gray-600">No portfolio projects found. Check back later for new content.</p>
                            </div>
                        )}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default PortfolioNew;
