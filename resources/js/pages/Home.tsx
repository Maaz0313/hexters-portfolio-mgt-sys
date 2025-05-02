import CubeGrid from '@/components/CubeGrid';
import PortfolioCard from '@/components/PortfolioCard';
import WaveBackground from '@/components/WaveBackground';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import Expertise from '../components/Expertise';
import StageItems from '../components/StageItem';
import VideoOverlay from '../components/VideoOverlay';
const words: string[] = ['minds', 'culture', 'structure', 'approach', 'results'];

function useWordCycle(words: string[], letterInterval: number = 100, pauseDuration: number = 2000) {
    const [index, setIndex] = useState(0);
    const [displayedLetters, setDisplayedLetters] = useState('');
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isDeleting) {
            if (displayedLetters.length > 0) {
                timer = setTimeout(() => {
                    setDisplayedLetters((prev) => prev.slice(0, -1));
                }, letterInterval);
            } else {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % words.length);
            }
        } else {
            if (displayedLetters.length < words[index].length) {
                timer = setTimeout(() => {
                    setDisplayedLetters(words[index].slice(0, displayedLetters.length + 1));
                }, letterInterval);
            } else {
                timer = setTimeout(() => setIsDeleting(true), pauseDuration);
            }
        }
        return () => clearTimeout(timer);
    }, [displayedLetters, isDeleting, index, words, letterInterval, pauseDuration]);

    return {
        displayedWord: displayedLetters,
        fullWord: words[index],
    };
}

interface HomeProps {
    latestPosts: {
        href: string;
        imageSrc: string;
        imageAlt: string;
        readTime: string;
        title: string;
        excerpt: string;
        authorImage: string;
        authorName: string;
        date: string;
    }[];
    featuredProjects: {
        id: number;
        title: string;
        description: string;
        image: string;
        imageAlt: string;
        branding?: string;
        industry?: string;
        href: string;
    }[];
}

const Home = () => {
    const { props } = usePage<{
        latestPosts?: HomeProps['latestPosts'];
        featuredProjects?: HomeProps['featuredProjects'];
    }>();
    const latestPosts = props.latestPosts || [];
    const featuredProjects = props.featuredProjects || [];

    const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
    };
    const { displayedWord, fullWord } = useWordCycle(words);

    return (
        <PortfolioLayout title="Home">
            {/* Hero section starts */}
            <section className="text-foreground relative overflow-hidden bg-[#0e2a5c] md:py-20">
                {/* Wave background pattern */}
                <WaveBackground />

                <div className="mx-auto w-full max-w-[1220px] px-6 py-0">
                    <div className="lg:grid lg:grid-flow-row lg:grid-cols-12 lg:gap-6">
                        <div className="flex flex-col justify-center lg:col-[span_6]">
                            <h1 className="title-text text-primary mb-6 text-7xl leading-tight font-bold md:leading-none lg:leading-tight">
                                Digital Innovation Studio
                            </h1>
                            <div className="bg-primary mb-6 h-1 w-full max-w-md"></div>
                            <p className="text-foreground m-0 text-[21px]/[28.883px] font-light">Crafting exceptional digital experiences</p>
                            <div className="mt-8">
                                <button
                                    onClick={toggleOverlay}
                                    aria-expanded={isOverlayVisible}
                                    className="bg-primary text-background hover:text-primary hover:bg-background hover:bg-opacity-90 inline-flex cursor-pointer items-center gap-3 rounded-md px-6 py-4 font-medium [transition:all_.3s_ease-in-out]"
                                >
                                    <svg className="size-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M19.494 10.917 6.444 3.15A.984.984 0 0 0 5.933 3a.935.935 0 0 0-.928.938H5v16.125h.005c0 .515.417.937.928.937.192 0 .351-.066.525-.16l13.036-7.757a1.412 1.412 0 0 0 0-2.166Z"
                                        ></path>
                                    </svg>
                                    <span className="min-w-0 truncate">Play showreel</span>
                                </button>
                            </div>
                        </div>
                        <div className="[grid-column:8/span_5] mt-0">
                            <div className="flex h-full items-center">
                                <img src="/images/hero-img.webp" alt="" sizes="(max-width: 479px) 432px, (max-width: 1023px) 975px, 474px" />
                            </div>
                        </div>
                    </div>
                </div>
                <VideoOverlay isOverlayVisible={isOverlayVisible} toggleOverlay={toggleOverlay} />
            </section>
            {/* Hero section ends */}
            {/* Services section starts */}
            <section className="bg-card relative flex min-h-[304px] flex-col items-center justify-center overflow-hidden py-16 md:py-20">
                <div className="relative z-2 container md:grid md:grid-flow-row md:grid-cols-[repeat(12,1fr)] md:max-lg:gap-6">
                    <div className="md:col-[span_6] md:flex md:flex-col md:justify-center lg:col-[span_7]">
                        <h4 className="text-card-foreground mb-6 text-2xl/[1.08] font-semibold">Why HeXters</h4>
                        <h2 className="title-text text-primary mb-10 text-7xl font-semibold">
                            Digital{' '}
                            <span className="relative inline-block">
                                <span className="invisible">{fullWord}</span>
                                <span className="absolute left-0 z-2">{displayedWord}</span>
                                <motion.div
                                    className="bg-primary absolute bottom-[2px] left-0 z-1 h-[5px]"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${(displayedWord.length / fullWord.length) * 100}%`,
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                            </span>
                        </h2>
                        <div>
                            <a
                                className="bg-primary hover:text-primary hover:bg-background text-background hover:bg-opacity-90 inline-block cursor-pointer rounded-md px-6 py-3 text-lg font-medium"
                                href="/about"
                            >
                                About Us
                            </a>
                        </div>
                    </div>
                    <div className="w-full max-[767px]:mt-12 md:col-[span_6] lg:col-[span_5]">
                        <img className="size-auto w-full" src="/images/Pattern.webp" alt="Services Pattern" width={520} height={520} />
                    </div>
                </div>
            </section>
            {/* Services section ends */}
            {/* Process section starts */}
            <section className="bg-background relative overflow-hidden md:py-20">
                <div className="container">
                    <div className="lg:grid lg:grid-flow-row lg:grid-cols-[repeat(12,1fr)] lg:[grid-column-gap:24px]">
                        <div className="flex flex-col justify-end lg:col-[span_5]">
                            <h2 className="title-text text-primary text-7xl font-medium">Our proven process for digital success</h2>
                            <div className="mt-10 lg:mt-16">
                                <a
                                    className="border-primary text-primary hover:bg-primary hover:text-secondary hover:bg-opacity-10 inline-block cursor-pointer rounded-md border bg-transparent px-6 py-3 text-lg font-medium"
                                    href="/process"
                                >
                                    See how we work
                                </a>
                            </div>
                        </div>
                        <div className="mt-12 flex flex-col gap-12 md:mt-20 md:gap-20 lg:col-[7/span_6] lg:mt-0">
                            <StageItems />
                        </div>
                    </div>
                    <div className="mt-20 md:mt-24 lg:mt-40 lg:grid lg:grid-flow-row lg:grid-cols-[repeat(12,1fr)] lg:[grid-column-gap:24px]">
                        <div className="lg:col-[span_3]">
                            <h2 className="text-foreground text-3xl leading-[1.08] font-medium md:text-4xl">
                                Using our expertise to elevate your brand in the digital space
                            </h2>
                        </div>
                        <div className="mt-14 flex flex-col gap-12 md:flex-row md:gap-6 lg:col-[span_9] lg:mt-0 lg:gap-8">
                            <Expertise />
                        </div>
                    </div>
                </div>
            </section>
            {/* Process section ends */}
            {/* Posts section starts */}
            <section className="bg-card py-16 md:py-20">
                <div className="mx-auto mb-12 flex w-full max-w-[1220px] justify-between px-6 py-0 max-lg:mb-8 max-lg:flex-col max-lg:flex-nowrap">
                    <h4 className="title-text text-primary text-[34px]/[1.03] font-medium md:text-[51px]/[1.04]">Latest posts</h4>
                    <div className="inline-flex items-center gap-1 max-lg:mt-6">
                        <Link
                            href={route('blogs')}
                            className="text-card-foreground hover:decoration-primary cursor-pointer font-light underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-[.4s] ease-[ease]"
                        >
                            View more
                        </Link>
                        <svg className="text-primary size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <polygon
                                fill="currentColor"
                                fillRule="evenodd"
                                points="0 9.018 12.174 9.018 6.563 14.629 8.016 16.031 16.031 8.016 8.016 0 6.613 1.403 12.174 7.014 0 7.014"
                                transform="translate(3.984 3.984)"
                            ></polygon>
                        </svg>
                    </div>
                </div>
                <div className="container grid grid-cols-[repeat(3,1fr)] gap-6 max-lg:grid-cols-[repeat(1,1fr)]">
                    {latestPosts && latestPosts.length > 0 ? (
                        latestPosts.map((post, index) => <BlogPostCard key={index} {...post} />)
                    ) : (
                        <div className="col-span-3 py-8 text-center">
                            <p className="text-card-foreground text-lg">We're working on some exciting blog posts. Check back soon!</p>
                        </div>
                    )}
                </div>
            </section>
            {/* Posts section ends */}
            {/* Portfolio section starts */}
            <section className="bg-background relative overflow-hidden py-16 md:py-20">
                <div className="container flex flex-col items-start gap-[72px]">
                    <div className="order-1 lg:max-w-[70%]">
                        <h4 className="text-foreground relative mb-6 text-[14px]/[1.25] font-semibold md:text-[16px]/[1.25]">Featured Projects</h4>
                        <h2 className="title-text text-primary relative text-[67px]/none font-medium md:text-[45px]/none">Our Latest Work</h2>
                        <p className="text-foreground relative mt-6 text-base/[1.5] font-light md:text-[21px]/[1.375]">
                            Explore our portfolio of successful projects.
                        </p>
                        <Link
                            className="bg-primary hover:text-primary text-background hover:bg-opacity-90 mt-6 inline-block cursor-pointer rounded-md px-6 py-3 text-lg font-medium hover:bg-[#0e326e]"
                            href={route('portfolio')}
                        >
                            View all projects
                        </Link>
                    </div>
                    <div className="order-2 grid justify-center [grid-gap:32px] lg:grid-cols-[1fr_1fr]">
                        {featuredProjects.length > 0 ? (
                            featuredProjects.map((project) => <PortfolioCard key={project.id} {...project} />)
                        ) : (
                            <div className="col-span-2 py-8 text-center">
                                <p className="text-card-foreground text-lg">We're working on some exciting projects. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cube grid background at the bottom */}
                <div className="relative z-0 h-[200px]">
                    <CubeGrid className="absolute right-0 bottom-0 left-0" />
                </div>
            </section>
            {/* Portfolio section ends */}
        </PortfolioLayout>
    );
};

export default Home;
