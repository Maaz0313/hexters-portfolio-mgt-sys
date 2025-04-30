import React from "react";
import { Link } from '@inertiajs/react';

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
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  href,
  imageSrc,
  imageAlt,
  excerpt,
  onClick
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If onClick prop is provided, prevent default navigation and call onClick
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  // Extract the slug from the href if it exists
  const getSlug = () => {
    if (!href) return '';

    // If href is a full URL like "/blog/post-title"
    if (href.startsWith('/blog/')) {
      return href.substring(6); // Remove '/blog/' prefix
    }

    // If href is already just the slug
    return href;
  };

  const slug = getSlug();

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#AC9DB4] transition-[border-color] delay-0 duration-[.4s] ease-[ease] hover:border-[#4716ED] hover:duration-[.2s]">
      {onClick ? (
        // Use a div with onClick for portfolio items
        <div onClick={onClick} className="block cursor-pointer">
          <div className="relative pb-[56.25%]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover transition-transform delay-0 duration-[.4s] ease-[ease] group-hover:scale-105 group-hover:duration-[.2s]"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-4 text-xl font-medium text-[#300A44]">{title}</h3>
            <p className="mb-4 text-[#524E57]">{excerpt}</p>
            <div className="mt-auto">
              <span className="inline-flex items-center text-[#4716ED]">
                View project
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      ) : (
        // Use Inertia Link for normal navigation
        <Link href={route('blog.show', { slug: slug })} className="block">
          <div className="relative pb-[56.25%]">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover transition-transform delay-0 duration-[.4s] ease-[ease] group-hover:scale-105 group-hover:duration-[.2s]"
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-4 text-xl font-medium text-[#300A44]">{title}</h3>
            <p className="mb-4 text-[#524E57]">{excerpt}</p>
            <div className="mt-auto">
              <span className="inline-flex items-center text-[#4716ED]">
                Read more
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
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

