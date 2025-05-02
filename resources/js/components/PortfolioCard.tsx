import { Link } from '@inertiajs/react';
import React from 'react';

interface PortfolioCardProps {
    id: number;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    branding?: string;
    industry?: string;
    href: string;
    borderColor?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
    id,
    title,
    description,
    image,
    imageAlt,
    branding,
    industry,
    href,
    borderColor = 'border-border hover:border-primary',
}) => {
    // Extract the slug from the href if it exists
    const getSlug = () => {
        if (!href) return '';

        // Handle case where href is a full URL (contains http:// or https://)
        if (href.includes('http://') || href.includes('https://')) {
            // Extract the path part of the URL
            try {
                const url = new URL(href);
                const path = url.pathname;

                // Check if the path contains /portfolio/
                if (path.includes('/portfolio/')) {
                    return path.split('/portfolio/')[1];
                }
                return '';
            } catch (e) {
                console.error('Invalid URL:', href);
                return '';
            }
        }

        // If href is a relative URL like "/portfolio/project-title"
        if (href.startsWith('/portfolio/')) {
            return href.substring(11); // Remove '/portfolio/' prefix
        }

        // If href is already just the slug
        return href;
    };

    const slug = getSlug();

    return (
        <Link
            href={slug ? route('portfolio.show', { slug }) : href}
            className={`group flex h-full flex-col overflow-hidden rounded-lg border ${borderColor} bg-card transition-all duration-300 hover:shadow-md`}
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img src={image} alt={imageAlt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex grow flex-col p-6">
                <h3 className="text-card-foreground mb-2 text-xl font-semibold">{title}</h3>
                <p className="text-card-foreground/80 mb-4 line-clamp-2 text-sm">{description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                    {branding && (
                        <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                            {branding}
                        </span>
                    )}
                    {industry && (
                        <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                            {industry}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PortfolioCard;
