import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layout';
import { format } from 'date-fns';
import BlogPostCard from '@/components/BlogPostCard';

interface PortfolioProject {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  image_alt: string | null;
  branding: string | null;
  industry: string | null;
  completion_date: string | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
}

interface Props {
  portfolioProject: PortfolioProject;
  relatedProjects: PortfolioProject[];
}

const PortfolioSingle = ({ portfolioProject, relatedProjects }: Props) => {
  return (
    <Layout>
      <Head title={portfolioProject.title} />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#300A44] mb-6">{portfolioProject.title}</h1>
          
          {portfolioProject.image && (
            <div className="relative w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden mb-8">
              <img 
                src={`/storage/${portfolioProject.image}`} 
                alt={portfolioProject.image_alt || portfolioProject.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {/* Description */}
            <div className="prose max-w-none mb-12">
              <h2 className="text-2xl font-bold text-[#300A44] mb-4">Project Overview</h2>
              <p className="text-lg text-gray-700">{portfolioProject.description}</p>
            </div>
          </div>
          
          <div className="md:col-span-1">
            {/* Project Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-[#300A44] mb-4">Project Details</h3>
              
              <div className="space-y-4">
                {portfolioProject.branding && (
                  <div>
                    <span className="font-semibold text-gray-700 block">Branding:</span>
                    <span className="text-gray-600">{portfolioProject.branding}</span>
                  </div>
                )}
                
                {portfolioProject.industry && (
                  <div>
                    <span className="font-semibold text-gray-700 block">Industry:</span>
                    <span className="text-gray-600">{portfolioProject.industry}</span>
                  </div>
                )}
                
                {portfolioProject.completion_date && (
                  <div>
                    <span className="font-semibold text-gray-700 block">Completed:</span>
                    <span className="text-gray-600">
                      {format(new Date(portfolioProject.completion_date), 'MMMM d, yyyy')}
                    </span>
                  </div>
                )}
                
                <div>
                  <span className="font-semibold text-gray-700 block">Created by:</span>
                  <span className="text-gray-600">{portfolioProject.user.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#300A44] mb-8">Related Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <BlogPostCard
                  key={project.id}
                  title={project.title}
                  href={`/portfolio/${project.slug}`}
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
