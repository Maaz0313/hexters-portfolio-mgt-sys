import React, { useState, useRef, ReactNode, useEffect } from "react";
import BlogPostCard from "../components/BlogPostCard";
import FieldsetCheckboxes from "../components/FieldsetCheckboxes";
import Pagination from "../components/Pagination";
import { Head, router } from '@inertiajs/react';
import Layout from '@/Layout';

// Define interfaces
interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: string | null;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  type: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
}

interface Author {
  id: number;
  name: string;
}

interface Props {
  blogPosts: {
    data: BlogPost[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  latestPosts: BlogPost[];
  categories: Category[];
  tags: Tag[];
  authors: Author[];
  popularCategories: Category[];
  filters: {
    search: string;
    category: string;
    tag: string;
    author: string;
  };
}

// Define interface for PortfolioLayout props
interface PortfolioLayoutProps {
  children: ReactNode;
  title?: string;
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

const Blog = ({
  blogPosts = { data: [], current_page: 1, last_page: 1, per_page: 10, total: 0 },
  latestPosts = [],
  categories = [],
  tags = [],
  authors = [],
  // popularCategories is not used but kept for API compatibility
  popularCategories = [],
  filters = { search: '', category: '', tag: '', author: '' }
}: Props) => {
  // Format blog posts for display
  const formatBlogPost = (post: BlogPost) => ({
    href: `/blogs/${post.slug}`,
    imageSrc: post.featured_image ? `/storage/${post.featured_image}` : '/images/placeholder.jpg',
    imageAlt: post.title,
    readTime: Math.ceil((post.content?.length || 0) / 1000).toString(), // Rough estimate: 1000 chars = 1 min read
    title: post.title,
    excerpt: post.excerpt || '',
    authorImage: '/images/avatar-placeholder.jpg', // Placeholder for now
    authorName: post.user.name,
    date: new Date(post.published_at).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' }),
    category: post.category?.name || 'Uncategorized',
  });

  // Format latest posts
  const formattedLatestPosts = latestPosts.map(formatBlogPost);

  // Group posts by category for featured sections
  const postsByCategory = categories.reduce((acc, category) => {
    const categoryPosts = blogPosts.data
      .filter(post => post.category?.id === category.id)
      .slice(0, 3)
      .map(formatBlogPost);

    if (categoryPosts.length > 0) {
      acc[category.name] = categoryPosts;
    }

    return acc;
  }, {} as Record<string, ReturnType<typeof formatBlogPost>[]>);

  // Get top categories with posts
  const topCategories = Object.keys(postsByCategory).slice(0, 2);

  const [currentPage, setCurrentPage] = useState(blogPosts.current_page);
  const [searchTerm, setSearchTerm] = useState(filters.search);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (filters.category && filters.category.trim() !== '') {
      // Split by comma and filter out empty values
      return filters.category.split(',').filter(cat => cat.trim() !== '');
    }
    return [];
  });

  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    if (filters.tag && filters.tag.trim() !== '') {
      // Split by comma and filter out empty values
      return filters.tag.split(',').filter(tag => tag.trim() !== '');
    }
    return [];
  });
  const [selectedAuthor, setSelectedAuthor] = useState(filters.author);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    // Create a params object with only non-empty values
    const params: Record<string, string | number> = {
      page: pageNumber
    };

    if (searchTerm && searchTerm.trim() !== '') {
      params.search = searchTerm.trim();
    }

    if (selectedCategories.length > 0) {
      // Filter out any empty values and join
      const filteredCategories = selectedCategories.filter(cat => cat.trim() !== '');
      if (filteredCategories.length > 0) {
        params.category = filteredCategories.join(',');
      }
    }

    if (selectedTags.length > 0) {
      // Filter out any empty values and join
      const filteredTags = selectedTags.filter(tag => tag.trim() !== '');
      if (filteredTags.length > 0) {
        params.tag = filteredTags.join(',');
      }
    }

    if (selectedAuthor && selectedAuthor.trim() !== '') {
      params.author = selectedAuthor.trim();
    }

    // Save the current scroll position
    const currentScrollPosition = window.scrollY;

    router.post('/blogs/filter', params, {
      preserveState: true,
      preserveScroll: true, // Keep the scroll position
      onSuccess: () => {
        // Force close all dropdowns after SPA reload
        document.querySelectorAll('fieldset legend').forEach(legend => {
          const fieldset = legend.closest('fieldset');
          const dropdown = fieldset?.querySelector('div[class*="absolute"]');
          if (dropdown) {
            dropdown.classList.add('invisible', 'h-0', 'p-0');
            dropdown.classList.remove('absolute', 'top-0', 'z-[3]', 'flex', 'max-h-[335px]');
          }
        });

        // Restore the scroll position
        setTimeout(() => {
          window.scrollTo({
            top: currentScrollPosition,
            behavior: 'auto'
          });
        }, 100);
      }
    });
  };

  // Handle filter reset
  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedAuthor('');

    // Set a flag to scroll to the all-blogs section after the page reloads
    sessionStorage.setItem('blogFiltersApplied', 'true');

    router.post('/blogs/filter', {}, {
      preserveState: true,
      preserveScroll: true, // Keep the scroll position
      onSuccess: () => {
        // Force close all dropdowns after SPA reload
        document.querySelectorAll('fieldset legend').forEach(legend => {
          const fieldset = legend.closest('fieldset');
          const dropdown = fieldset?.querySelector('div[class*="absolute"]');
          if (dropdown) {
            dropdown.classList.add('invisible', 'h-0', 'p-0');
            dropdown.classList.remove('absolute', 'top-0', 'z-[3]', 'flex', 'max-h-[335px]');
          }
        });
      }
    });
  };

  // Apply filters
  const applyFilters = () => {
    // Create a params object with only non-empty values
    const params: Record<string, string> = {};

    if (searchTerm && searchTerm.trim() !== '') {
      params.search = searchTerm.trim();
    }

    if (selectedCategories.length > 0) {
      // Filter out any empty values and join
      const filteredCategories = selectedCategories.filter(cat => cat.trim() !== '');
      if (filteredCategories.length > 0) {
        params.category = filteredCategories.join(',');
      }
    }

    if (selectedTags.length > 0) {
      // Filter out any empty values and join
      const filteredTags = selectedTags.filter(tag => tag.trim() !== '');
      if (filteredTags.length > 0) {
        params.tag = filteredTags.join(',');
      }
    }

    if (selectedAuthor && selectedAuthor.trim() !== '') {
      params.author = selectedAuthor.trim();
    }

    // Log the params for debugging
    console.log('Applying filters with params:', params);

    router.post('/blogs/filter', params, {
      preserveState: true,
      preserveScroll: true, // Keep the scroll position
      onSuccess: () => {
        // Force close all dropdowns after SPA reload
        document.querySelectorAll('fieldset legend').forEach(legend => {
          const fieldset = legend.closest('fieldset');
          const dropdown = fieldset?.querySelector('div[class*="absolute"]');
          if (dropdown) {
            dropdown.classList.add('invisible', 'h-0', 'p-0');
            dropdown.classList.remove('absolute', 'top-0', 'z-[3]', 'flex', 'max-h-[335px]');
          }
        });

        // Store the current filter state in session storage
        sessionStorage.setItem('blogFiltersApplied', 'true');
      }
    });
  };

  // Handle filter changes
  useEffect(() => {
    // Don't trigger on initial render
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const currentCategoryStr = selectedCategories.join(',');
        const currentTagStr = selectedTags.join(',');
        const filterCategoryStr = filters.category || '';
        const filterTagStr = filters.tag || '';

        if (searchTerm !== filters.search ||
            currentCategoryStr !== filterCategoryStr ||
            currentTagStr !== filterTagStr ||
            selectedAuthor !== filters.author) {
          applyFilters();
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [searchTerm, selectedCategories, selectedTags, selectedAuthor]);

  // Debug log the current filter state
  useEffect(() => {
    console.log('Current filters:', {
      search: searchTerm,
      categories: selectedCategories,
      tags: selectedTags,
      author: selectedAuthor,
      blogPostsCount: blogPosts.data.length
    });
  }, [searchTerm, selectedCategories, selectedTags, selectedAuthor, blogPosts.data.length]);

  // Handle scroll position after component mounts
  useEffect(() => {
    // Check if filters were applied and we need to scroll to the filter section
    if (sessionStorage.getItem('blogFiltersApplied')) {
      // Clear the flag
      sessionStorage.removeItem('blogFiltersApplied');

      // Scroll to the all-blogs section with a delay to ensure the page is fully rendered
      const timer = setTimeout(() => {
        const element = allBlogsRef.current;
        if (element) {
          try {
            // Get the position of the all-blogs section
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetPosition = rect.top + scrollTop;

            // Scroll to the position
            window.scrollTo({
              top: targetPosition - 100, // Offset by 100px to show a bit of content above
              behavior: 'smooth'
            });

            console.log('Scrolled to all-blogs section after filter applied');
          } catch (error) {
            console.error('Error scrolling to element:', error);
          }
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, []);

  const allBlogsRef = useRef<HTMLElement | null>(null);

  // Handle scroll to "All Blog Posts" section
  const scrollToAllBlogs = (event: React.MouseEvent) => {
    event.preventDefault();
    if (allBlogsRef.current) {
      allBlogsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Format categories for dropdown
  const categoryItems = categories.map(category => ({
    id: category.slug,
    label: category.name
  }));

  // Format tags for dropdown
  const tagItems = tags.map(tag => ({
    id: tag.slug,
    label: tag.name
  }));

  // Format authors for dropdown - not currently used in UI but kept for future use
  // const authorItems = authors.map(author => ({
  //   id: author.id.toString(),
  //   label: author.name
  // }));

  return (
    <PortfolioLayout title="Blog">
      <section className="py-16 md:py-20">
        <div className="container flex flex-row justify-between">
          <h1 className="w-[70%] text-[34px]/[1.03] font-medium text-[#4ecdc4] max-md:w-4/5 md:text-[51px]/[1.04]">
            Our latest news and insights
          </h1>
          <a
            className="inline-flex max-h-[55px] items-center gap-3 self-end rounded-[80px] border-2 border-[#4ecdc4] bg-transparent px-4 py-2 text-base/[1.375] font-medium text-[#4ecdc4] shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 ease-[ease-in-out] hover:bg-[#4ecdc4] hover:text-[#0a2550] hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)] max-md:mt-6 max-md:self-start cursor-pointer"
            href="/blogs#all-blogs"
            onClick={scrollToAllBlogs}
          >
            <svg
              className="size-5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <polygon
                fill="currentColor"
                fillRule="evenodd"
                points="9.018 0 9.018 12.174 14.629 6.563 16.031 8.016 8.016 16.031 0 8.016 1.403 6.613 7.014 12.174 7.014 0"
                transform="translate(3.984 3.984)"
              ></polygon>
            </svg>
            All Blog Posts
          </a>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 md:py-20">
        <div className="container mb-12 flex justify-between max-lg:mb-8 max-lg:flex-col">
          <h4 className="text-[34px]/[1.03] font-medium text-[#4ecdc4] md:text-[51px]/[1.04]">
            Latest posts
          </h4>
          <div className="inline-flex items-center gap-1 max-lg:mt-6">
            <a
              href="/blogs#all-blogs"
              onClick={scrollToAllBlogs}
              className="cursor-pointer text-white underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-[#4ecdc4] hover:duration-200"
            >
              View more
            </a>
            <svg
              className="size-5 text-[#4ecdc4]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <polygon
                fill="currentColor"
                fillRule="evenodd"
                points="0 9.018 12.174 9.018 6.563 14.629 8.016 16.031 16.031 8.016 8.016 0 6.613 1.403 12.174 7.014 0 7.014"
                transform="translate(3.984 3.984)"
              ></polygon>
            </svg>
          </div>
        </div>
        <div className="container grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {formattedLatestPosts.map((post, index) => (
            <BlogPostCard key={index} {...post} />
          ))}
        </div>
      </section>

      {/* Category-specific sections */}
      {topCategories.map((categoryName, index) => (
        <section key={index} className="py-16 md:py-20">
          <div className="container mb-12 flex justify-between max-lg:mb-8 max-lg:flex-col">
            <h4 className="text-[34px]/[1.03] font-medium text-[#4ecdc4] md:text-[51px]/[1.04]">
              {categoryName}
            </h4>
            <div className="inline-flex items-center gap-1 max-lg:mt-6">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategories([categoryName]);

                  // Set a flag to scroll to the all-blogs section after the page reloads
                  sessionStorage.setItem('blogFiltersApplied', 'true');

                  router.post('/blogs/filter', { category: categoryName }, {
                    preserveState: true,
                    preserveScroll: true
                  });
                }}
                className="cursor-pointer text-white underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-[#4ecdc4] hover:duration-200"
              >
                View more
              </a>
              <svg
                className="size-5 text-[#4ecdc4]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <polygon
                  fill="currentColor"
                  fillRule="evenodd"
                  points="0 9.018 12.174 9.018 6.563 14.629 8.016 16.031 16.031 8.016 8.016 0 6.613 1.403 12.174 7.014 0 7.014"
                  transform="translate(3.984 3.984)"
                ></polygon>
              </svg>
            </div>
          </div>
          <div className="container grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {postsByCategory[categoryName].map((post, index) => (
              <BlogPostCard key={index} {...post} />
            ))}
          </div>
        </section>
      ))}

      {/* All Blog Posts Section */}
      <section ref={allBlogsRef} id="all-blogs" className="py-16 md:py-20">
        <div className="container mx-auto w-full max-w-[1220px] px-6 py-0">
          <div className="mb-48 text-center">
            <h2 className="m-0 text-[1.8571428571rem] leading-[1.08] font-normal text-[#4ecdc4] md:text-[2.6428571429rem]">
              All Blog Posts
            </h2>
            <p className="text-[1.1428571429rem]/[1.5] font-light text-white md:text-2xl/[1.375]">
              News and insights from our team.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 mb-4 md:m-0 md:mx-auto md:mb-14">
            <div className="w-full md:w-auto">
              <input
                className={`search h-12 w-full border-0 border-b border-[#4ecdc4] bg-[right_center] py-4 pr-8 pl-4 text-white placeholder:text-white ring-0 focus:outline-0 focus:border-[#4ecdc4]`}
                type="text"
                name="search"
                id="search"
                placeholder="Enter keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <FieldsetCheckboxes
              title="Categories"
              items={categoryItems}
              selectedItems={selectedCategories}
              onSelectionChange={(items) => setSelectedCategories(items)}
              minWidth={250}
            />
            <FieldsetCheckboxes
              title="Tags"
              items={tagItems}
              selectedItems={selectedTags}
              onSelectionChange={(items) => setSelectedTags(items)}
              minWidth={250}
            />
            <button
              className="flex size-12 items-center justify-center group disabled:cursor-default cursor-pointer"
              onClick={handleReset}
              disabled={!searchTerm && selectedCategories.length === 0 && selectedTags.length === 0 && !selectedAuthor}
            >
              <svg
                className="text-[#4ecdc4] [transition:color_.4s_ease] group-disabled:text-[#6d6873] group-disabled:[transition:color_.2s_ease]"
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="currentColor"
              >
                <g>
                  <rect fill="none" height="24" width="24"></rect>
                  <rect fill="none" height="24" width="24"></rect>
                  <rect fill="none" height="24" width="24"></rect>
                </g>
                <g>
                  <g></g>
                  <path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z"></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div className="container grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {blogPosts.data.length > 0 ? (
            blogPosts.data.map((post) => (
              <BlogPostCard key={post.id} {...formatBlogPost(post)} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-lg text-gray-600">
                {searchTerm || selectedCategories.length > 0 || selectedTags.length > 0 || selectedAuthor
                  ? "No blog posts found matching your filters. Try adjusting your criteria."
                  : "No blog posts found. Check back later for new content."}
              </p>
              {(searchTerm || selectedCategories.length > 0 || selectedTags.length > 0 || selectedAuthor) && (
                <button
                  onClick={handleReset}
                  className="mt-4 px-4 py-2 bg-[#4ecdc4] text-[#0a2550] rounded-md hover:bg-[#0a2550] hover:text-[#4ecdc4] transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
        {blogPosts.last_page > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={blogPosts.last_page}
            handlePageChange={handlePageChange}
          />
        )}
      </section>
    </PortfolioLayout>
  );
};

export default Blog;
