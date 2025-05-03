import Layout from '@/Layout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import React, { ReactNode } from 'react';
import { FaCalendarAlt, FaFacebookF, FaLinkedinIn, FaTag, FaTwitter, FaUser } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';

// Define interfaces for props
interface PortfolioLayoutProps {
    children: ReactNode;
    title?: string;
}

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    featured_image: string | null;
    thumbnail_image: string | null;
    published_at: string;
    user: {
        name: string;
    };
    category: {
        name: string;
        slug: string;
    } | null;
    tags: Array<{
        id: number;
        name: string;
        slug: string;
    }>;
}

interface BlogSingleProps {
    blogPost: BlogPost;
    relatedPosts: BlogPost[];
    popularPosts: BlogPost[];
}

// Define a local PortfolioLayout component
const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ children, title }) => {
    return (
        <>
            {title && <Head title={title} />}
            <Layout>{children}</Layout>
        </>
    );
};

const BlogSingle: React.FC<BlogSingleProps> = ({ blogPost, relatedPosts, popularPosts }) => {
    if (!blogPost) {
        return (
            <PortfolioLayout title="Error">
                <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
                    <div className="border-accent rounded-xl border bg-[#0f2d5e] p-6 text-white shadow-lg">
                        <h2 className="title-text mb-4 text-2xl font-normal">Blog Post Not Found</h2>
                        <p className="text-white/90">
                            The blog post you're looking for could not be found. It may have been removed or the URL might be incorrect.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={route('blogs')}
                                className="bg-accent text-accent-foreground hover:bg-opacity-90 inline-flex items-center rounded-md px-4 py-2 transition-colors"
                            >
                                Return to Blog
                            </Link>
                        </div>
                    </div>
                </div>
            </PortfolioLayout>
        );
    }

    return (
        <PortfolioLayout title={blogPost.title}>
            {/* Post Header */}
            <div className="bg-[#081d40] pt-8 pb-4 md:pt-12 md:pb-6">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="title-text text-4xl font-normal text-white md:text-5xl lg:text-6xl">{blogPost.title}</h1>
                </div>
            </div>

            <div className="bg-[#081d40] pt-6 pb-8 md:pt-8 md:pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Featured Image */}
                    {blogPost.featured_image && (
                        <div className="mb-10 overflow-hidden rounded-xl shadow-lg">
                            <img
                                src={`/storage/${blogPost.featured_image}`}
                                alt={blogPost.title}
                                className="h-auto w-full object-cover"
                                style={{ maxHeight: '600px' }}
                            />
                        </div>
                    )}

                    {/* Post Meta Information */}
                    <div className="mb-10">
                        <div className="flex flex-wrap items-center gap-6 text-sm text-white">
                            <div className="flex items-center">
                                <FaUser className="text-accent mr-2" />
                                <span>{blogPost.user.name}</span>
                            </div>
                            <div className="flex items-center">
                                <FaCalendarAlt className="text-accent mr-2" />
                                <span>{format(new Date(blogPost.published_at), 'MMMM d, yyyy')}</span>
                            </div>
                            {blogPost.category && (
                                <div className="flex items-center">
                                    <FaTag className="text-accent mr-2" />
                                    <Link
                                        href={route('blogs', { category: blogPost.category.slug })}
                                        className="hover:text-accent transition-colors duration-200"
                                    >
                                        {blogPost.category.name}
                                    </Link>
                                </div>
                            )}
                            <div className="ml-auto flex items-center">
                                <span className="mr-3 flex items-center gap-1">
                                    <FiShare2 className="text-accent" />
                                    <span>Share:</span>
                                </span>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-accent text-accent-foreground mx-1 inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blogPost.title)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-accent text-accent-foreground mx-1 inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-accent text-accent-foreground mx-1 inline-flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110"
                                >
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Author Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-xl bg-[#0f2d5e] p-6 shadow-lg">
                                <div className="mb-6 flex items-center">
                                    <div className="bg-accent text-accent-foreground mr-4 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold">
                                        {blogPost.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-primary font-bold">{blogPost.user.name}</h3>
                                        <p className="text-muted-foreground text-sm">Author</p>
                                    </div>
                                </div>
                                <p className="mb-4 text-sm text-white/90">Author of this blog post.</p>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="rounded-xl bg-[#0f2d5e] p-8 shadow-lg">
                                <div
                                    className="prose prose-lg prose-invert prose-headings:font-sans prose-headings:text-white prose-p:text-white/90 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-img:rounded-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: blogPost.content || '' }}
                                />

                                {/* Tags */}
                                {blogPost.tags && blogPost.tags.length > 0 && (
                                    <div className="border-border mt-10 border-t pt-6">
                                        <h3 className="mb-4 text-xl font-bold text-white">Tags</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {blogPost.tags.map((tag) => (
                                                <Link
                                                    key={tag.id}
                                                    href={route('blog.tag', { slug: tag.slug })}
                                                    className="bg-muted text-secondary  bg-primary hover:bg-muted hover:text-primary rounded-full px-4 py-2 text-sm transition-colors duration-200"
                                                >
                                                    {tag.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts && relatedPosts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="title-text mb-8 text-3xl font-normal text-white">Related Posts</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {relatedPosts.map((relatedPost) => (
                                    <div
                                        key={relatedPost.id}
                                        className="overflow-hidden rounded-xl bg-[#0f2d5e] shadow-lg transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
                                    >
                                        <Link href={route('blog.show', { slug: relatedPost.slug })}>
                                            <div className="overflow-hidden">
                                                {relatedPost.thumbnail_image ? (
                                                    <img
                                                        src={`/storage/${relatedPost.thumbnail_image}`}
                                                        alt={relatedPost.title}
                                                        className="h-52 w-full object-cover transition-transform duration-500 hover:scale-110"
                                                    />
                                                ) : relatedPost.featured_image ? (
                                                    <img
                                                        src={`/storage/${relatedPost.featured_image}`}
                                                        alt={relatedPost.title}
                                                        className="h-52 w-full object-cover transition-transform duration-500 hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="bg-muted flex h-52 w-full items-center justify-center">
                                                        <span className="text-muted-foreground">No image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="mb-3 text-xl font-bold text-white">{relatedPost.title}</h3>
                                                <p className="mb-4 line-clamp-2 text-white/90">{relatedPost.excerpt || ''}</p>
                                                <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                    <span>{format(new Date(relatedPost.published_at), 'MMMM d, yyyy')}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Popular Posts */}
                    {popularPosts && popularPosts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="title-text mb-8 text-3xl font-normal text-white">Popular Posts</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {popularPosts.map((popularPost) => (
                                    <div
                                        key={popularPost.id}
                                        className="overflow-hidden rounded-xl bg-[#0f2d5e] shadow-lg transition-all duration-300 hover:translate-y-[-5px] hover:shadow-xl"
                                    >
                                        <Link href={route('blog.show', { slug: popularPost.slug })}>
                                            <div className="overflow-hidden">
                                                {popularPost.thumbnail_image ? (
                                                    <img
                                                        src={`/storage/${popularPost.thumbnail_image}`}
                                                        alt={popularPost.title}
                                                        className="h-52 w-full object-cover transition-transform duration-500 hover:scale-110"
                                                    />
                                                ) : popularPost.featured_image ? (
                                                    <img
                                                        src={`/storage/${popularPost.featured_image}`}
                                                        alt={popularPost.title}
                                                        className="h-52 w-full object-cover transition-transform duration-500 hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="bg-muted flex h-52 w-full items-center justify-center">
                                                        <span className="text-muted-foreground">No image</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                <h3 className="mb-3 text-xl font-bold text-white">{popularPost.title}</h3>
                                                <p className="mb-4 line-clamp-2 text-white/90">{popularPost.excerpt || ''}</p>
                                                <div className="text-muted-foreground flex items-center justify-between text-sm">
                                                    <span>{format(new Date(popularPost.published_at), 'MMMM d, yyyy')}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PortfolioLayout>
    );
};

export default BlogSingle;
