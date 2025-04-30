import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layout';
import BlogPostCard from '@/components/BlogPostCard';

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
          <h1 className="text-3xl font-bold mb-8">Portfolio Projects</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <BlogPostCard
                  key={project.id}
                  title={project.title}
                  href={`/portfolio/${project.slug}`}
                  imageSrc={project.image ? `/storage/${project.image}` : '/images/placeholder.jpg'}
                  imageAlt={project.image_alt || project.title}
                  excerpt={project.description || ''}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-lg text-gray-600">
                  No portfolio projects found. Check back later for new content.
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PortfolioNew;
