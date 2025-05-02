import { Link } from '@inertiajs/react';
import React from 'react';

// Define interface for BlogPostCard props
interface BlogPostCardProps {
    title: string;
    href: string;
    imageSrc: string;
    imageAlt: string;
    excerpt: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    authorImage?: string;
    authorName?: string;
    date?: string;
    readTime?: string;
    borderColor?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
    title,
    href,
    imageSrc,
    imageAlt,
    excerpt,
    onClick,
    authorImage,
    authorName,
    date,
    readTime,
    borderColor,
}) => {
    // Extract the slug from the href if it exists
    const getSlug = () => {
        if (!href) return '';

        // If href is a full URL like "/blogs/post-title" or "/blog/post-title"
        if (href.startsWith('/blogs/')) {
            return href.substring(7); // Remove '/blogs/' prefix
        } else if (href.startsWith('/blog/')) {
            return href.substring(6); // Remove '/blog/' prefix
        }

        // If href is already just the slug
        return href;
    };

    const slug = getSlug();

    // Determine if this is a blog post or a portfolio item
    const isBlogPost = href && href.includes('/blogs/');
    const isPortfolio = href && href.includes('/portfolio/');

    // Extract portfolio slug if applicable
    const getPortfolioSlug = () => {
        if (!href || !isPortfolio) return '';

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

        // Handle relative URL
        if (href.startsWith('/portfolio/')) {
            return href.substring(11); // Remove '/portfolio/' prefix
        }

        return href;
    };

    const portfolioSlug = getPortfolioSlug();

    return (
        <div
            className={`group flex h-full flex-col overflow-hidden rounded-lg border ${borderColor || 'border-border hover:border-primary'} transition-[border-color] delay-0 duration-[.4s] ease-[ease]`}
        >
            {isBlogPost ? (
                // Use Inertia Link for blog posts
                <Link href={slug ? route('blog.show', { slug: slug }) : href} className="block cursor-pointer">
                    <div className="relative pb-[56.25%]">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="absolute inset-0 h-full w-full object-cover transition-transform delay-0 duration-[.4s] ease-[ease] group-hover:scale-105 group-hover:duration-[.2s]"
                        />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-primary mb-4 text-xl font-medium">{title}</h3>
                        <p className="text-card-foreground mb-4">{excerpt}</p>
                        <div className="mt-auto">
                            <span className="text-primary inline-flex items-center">
                                Read more
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </Link>
            ) : isPortfolio ? (
                // Use Inertia Link with route helper for portfolio items
                <Link href={portfolioSlug ? route('portfolio.show', { slug: portfolioSlug }) : href} className="block cursor-pointer">
                    <div className="relative pb-[56.25%]">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="absolute inset-0 h-full w-full object-cover transition-transform delay-0 duration-[.4s] ease-[ease] group-hover:scale-105 group-hover:duration-[.2s]"
                        />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-primary mb-4 text-xl font-medium">{title}</h3>
                        <p className="text-card-foreground mb-4">{excerpt}</p>
                        <div className="mt-auto">
                            <span className="text-primary inline-flex items-center">
                                View details
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </Link>
            ) : (
                // Use regular Link for other items
                <Link href={href} className="block cursor-pointer">
                    <div className="relative pb-[56.25%]">
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className="absolute inset-0 h-full w-full object-cover transition-transform delay-0 duration-[.4s] ease-[ease] group-hover:scale-105 group-hover:duration-[.2s]"
                        />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-primary mb-4 text-xl font-medium">{title}</h3>
                        <p className="text-card-foreground mb-4">{excerpt}</p>
                        <div className="mt-auto">
                            <span className="text-primary inline-flex items-center">
                                View details
                                <svg
                                    className="ml-2 h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default BlogPostCard;
