import Layout from '@/Layout';
import { Head, router } from '@inertiajs/react';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import FieldsetCheckboxes from '../components/FieldsetCheckboxes';
import Pagination from '../components/Pagination';

// Define interface for PortfolioProject from the database
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
}

// Define interface for the formatted project used in the component
interface FormattedProject {
    id: number;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    branding?: string;
    industry?: string;
    href: string;
    slug: string;
}

// Define interface for Branding and Industry
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

// Define interface for Props
interface Props {
    portfolioProjects: PortfolioProject[];
    brandings: any[];
    industries: any[];
    filters: {
        search: string;
        branding: string;
        industry: string;
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

const Portfolio = ({ portfolioProjects = [], brandings = [], industries = [], filters = { search: '', branding: '', industry: '' } }: Props) => {
    // Debug output
    console.log('Portfolio component received:', {
        portfolioProjects,
        brandings,
        industries,
        filters,
    });

    // Convert backend data to the format expected by the component
    const projects: FormattedProject[] = Array.isArray(portfolioProjects)
        ? portfolioProjects.map((project) => {
              console.log('Processing project:', project);
              return {
                  id: project.id,
                  title: project.title,
                  description: project.description || '',
                  image: project.image ? `/storage/${project.image}` : '/images/placeholder.jpg',
                  imageAlt: project.image_alt || project.title,
                  branding: project.branding ? project.branding.name : '',
                  industry: project.industry ? project.industry.name : '',
                  href: project.slug ? route('portfolio.show', { slug: project.slug }) : '',
                  slug: project.slug || '',
              };
          })
        : [];

    const [currentPage, setCurrentPage] = useState(1);
    // No slider state needed anymore
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const [selectedBrandings, setSelectedBrandings] = useState<string[]>(filters.branding ? filters.branding.split(',') : []);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>(filters.industry ? filters.industry.split(',') : []);
    const postsPerPage = 6;

    // Calculate the current posts to display
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = projects.slice(indexOfFirstPost, indexOfLastPost);

    // Calculate total pages
    const totalPages = Math.ceil(projects.length / postsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);

        // Create a params object with only non-empty values
        const params: Record<string, string | number> = {
            page: pageNumber,
        };

        if (searchTerm && searchTerm.trim() !== '') {
            params.search = searchTerm.trim();
        }

        if (selectedBrandings.length > 0) {
            // Filter out any empty values and join
            const filteredBrandings = selectedBrandings.filter((brand) => brand.trim() !== '');
            if (filteredBrandings.length > 0) {
                params.branding = filteredBrandings.join(',');
            }
        }

        if (selectedIndustries.length > 0) {
            // Filter out any empty values and join
            const filteredIndustries = selectedIndustries.filter((ind) => ind.trim() !== '');
            if (filteredIndustries.length > 0) {
                params.industry = filteredIndustries.join(',');
            }
        }

        // Save the current scroll position
        const currentScrollPosition = window.scrollY;

        router.post('/portfolio/filter', params, {
            preserveState: true,
            preserveScroll: true, // Keep the scroll position
            onSuccess: () => {
                // Force close all dropdowns after SPA reload
                document.querySelectorAll('fieldset legend').forEach((legend) => {
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
                        behavior: 'auto',
                    });
                }, 100);
            },
        });
    };

    // Handle portfolio item click - now navigates to the single project page
    const handlePortfolioItemClick = (project: FormattedProject) => {
        if (project.slug) {
            router.visit(route('portfolio.show', { slug: project.slug }));
        } else {
            console.error('Cannot navigate to project with undefined slug:', project);
        }
    };

    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Handle filter reset
    const handleReset = () => {
        setSearchTerm('');
        setSelectedBrandings([]);
        setSelectedIndustries([]);

        // Set a flag to scroll to the all-blogs section after the page reloads
        sessionStorage.setItem('portfolioFiltersApplied', 'true');

        router.post(
            '/portfolio/filter',
            {},
            {
                preserveState: true,
                preserveScroll: true, // Keep the scroll position
                onSuccess: () => {
                    // Force close all dropdowns after SPA reload
                    document.querySelectorAll('fieldset legend').forEach((legend) => {
                        const fieldset = legend.closest('fieldset');
                        const dropdown = fieldset?.querySelector('div[class*="absolute"]');
                        if (dropdown) {
                            dropdown.classList.add('invisible', 'h-0', 'p-0');
                            dropdown.classList.remove('absolute', 'top-0', 'z-[3]', 'flex', 'max-h-[335px]');
                        }
                    });
                },
            },
        );
    };

    // Apply filters
    const applyFilters = () => {
        // Create a params object with only non-empty values
        const params: Record<string, string> = {};

        if (searchTerm && searchTerm.trim() !== '') {
            params.search = searchTerm.trim();
        }

        if (selectedBrandings.length > 0) {
            // Filter out any empty values and join
            const filteredBrandings = selectedBrandings.filter((brand) => brand.trim() !== '');
            if (filteredBrandings.length > 0) {
                params.branding = filteredBrandings.join(',');
            }
        }

        if (selectedIndustries.length > 0) {
            // Filter out any empty values and join
            const filteredIndustries = selectedIndustries.filter((ind) => ind.trim() !== '');
            if (filteredIndustries.length > 0) {
                params.industry = filteredIndustries.join(',');
            }
        }

        // Log the params for debugging
        console.log('Applying filters with params:', params);

        // Set a flag to scroll to the all-blogs section after the page reloads
        sessionStorage.setItem('portfolioFiltersApplied', 'true');

        router.post('/portfolio/filter', params, {
            preserveState: true,
            preserveScroll: true, // Keep the scroll position
            onSuccess: () => {
                // Force close all dropdowns after SPA reload
                document.querySelectorAll('fieldset legend').forEach((legend) => {
                    const fieldset = legend.closest('fieldset');
                    const dropdown = fieldset?.querySelector('div[class*="absolute"]');
                    if (dropdown) {
                        dropdown.classList.add('invisible', 'h-0', 'p-0');
                        dropdown.classList.remove('absolute', 'top-0', 'z-[3]', 'flex', 'max-h-[335px]');
                    }
                });
            },
        });
    };

    // Handle filter changes
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentBrandingStr = selectedBrandings.join(',');
            const currentIndustryStr = selectedIndustries.join(',');
            const filterBrandingStr = filters.branding || '';
            const filterIndustryStr = filters.industry || '';

            if (searchTerm !== filters.search || currentBrandingStr !== filterBrandingStr || currentIndustryStr !== filterIndustryStr) {
                applyFilters();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, selectedBrandings, selectedIndustries]);

    // Handle scroll position after component mounts
    useEffect(() => {
        // Check if filters were applied and we need to scroll to the filter section
        if (sessionStorage.getItem('portfolioFiltersApplied')) {
            // Clear the flag
            sessionStorage.removeItem('portfolioFiltersApplied');

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
                            behavior: 'smooth',
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

    // Format branding items for dropdown
    const brandingItems = Array.isArray(brandings)
        ? brandings.map((branding) => ({
              id: branding.id ? branding.id.toString() : '',
              label: branding.name || '',
          }))
        : [];

    // Format industry items for dropdown
    const industryItems = Array.isArray(industries)
        ? industries.map((industry) => ({
              id: industry.id ? industry.id.toString() : '',
              label: industry.name || '',
          }))
        : [];

    return (
        <PortfolioLayout title="Portfolio">
            <section ref={allBlogsRef} id="all-blogs" className="py-16 md:py-20">
                <div className="container mx-auto w-full max-w-[1220px] px-6 py-0">
                    <div className="mb-48 text-center">
                        <h2 className="m-0 text-[1.8571428571rem] leading-[1.08] font-normal text-[#4ecdc4] md:text-[2.6428571429rem]">Portfolio</h2>
                        <p className="text-[1.1428571429rem]/[1.5] font-light text-white md:text-2xl/[1.375]">
                            Luminary has produced over 400 successful projects over two decades in the industry. Here are just a few examples of our
                            recent work.
                        </p>
                    </div>
                    <div className="mb-4 flex flex-wrap items-center justify-center gap-8 md:m-0 md:mx-auto md:mb-14">
                        <div className="w-full md:w-auto">
                            <input
                                className={`search h-12 w-full border-0 border-b border-[#4ecdc4] bg-[right_center] py-4 pr-8 pl-4 text-white ring-0 placeholder:text-white focus:border-[#4ecdc4] focus:outline-0`}
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Enter keywords"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                        <FieldsetCheckboxes
                            title="Branding"
                            items={brandingItems}
                            selectedItems={selectedBrandings}
                            onSelectionChange={(items) => setSelectedBrandings(items)}
                            minWidth={250}
                        />
                        <FieldsetCheckboxes
                            title="Industry"
                            items={industryItems}
                            selectedItems={selectedIndustries}
                            onSelectionChange={(items) => setSelectedIndustries(items)}
                            minWidth={250}
                        />
                        <button
                            className="group flex size-12 cursor-pointer items-center justify-center disabled:cursor-default"
                            onClick={handleReset}
                            disabled={!searchTerm && selectedBrandings.length === 0 && selectedIndustries.length === 0}
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
                    {projects.length > 0 ? (
                        currentPosts.map((post, index) => (
                            <div key={index}>
                                <BlogPostCard
                                    title={post.title}
                                    href={post.slug ? route('portfolio.show', { slug: post.slug }) : ''}
                                    imageSrc={post.image}
                                    imageAlt={post.imageAlt}
                                    excerpt={post.description}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3 py-10 text-center">
                            <p className="text-lg text-gray-600">
                                {searchTerm || selectedBrandings.length > 0 || selectedIndustries.length > 0
                                    ? 'No portfolio projects found matching your filters. Try adjusting your criteria.'
                                    : 'No portfolio projects found. Check back later for new content.'}
                            </p>
                            {(searchTerm || selectedBrandings.length > 0 || selectedIndustries.length > 0) && (
                                <button
                                    onClick={handleReset}
                                    className="mt-4 cursor-pointer rounded-md bg-[#4ecdc4] px-4 py-2 text-[#0a2550] transition-colors hover:bg-[#0a2550] hover:text-[#4ecdc4]"
                                >
                                    Clear All Filters
                                </button>
                            )}
                        </div>
                    )}
                </div>
                {projects.length > 0 && <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />}
            </section>
        </PortfolioLayout>
    );
};

export default Portfolio;
