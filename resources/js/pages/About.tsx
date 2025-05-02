import PortfolioLayout from '@/layouts/portfolio-layout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import VideoOverlay from '../components/VideoOverlay';

const About = () => {
    const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
    const toggleOverlay = () => {
        setIsOverlayVisible(!isOverlayVisible);
    };
    return (
        <PortfolioLayout title="About Us">
            {/* Hero section starts */}
            <section className="relative overflow-hidden bg-[#e6e6e6] py-16 md:py-20">
                {/* Decorative background elements */}
                <motion.div
                    className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#4ecdc4] opacity-10 blur-3xl"
                    animate={{
                        x: [0, 30, 0],
                        y: [0, -30, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-[#0a2550] opacity-20 blur-3xl"
                    animate={{
                        x: [0, -20, 0],
                        y: [0, 20, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                />

                <div className="relative z-2 container">
                    <div className="min-[1220px]:grid min-[1220px]:grid-flow-row min-[1220px]:grid-cols-12 min-[1220px]:items-center min-[1220px]:[grid-column-gap:1.5rem]">
                        {/* Video Container */}
                        <div className="relative my-8 flex min-h-[420px] w-full items-center justify-center bg-white min-[1220px]:col-[span_7] min-[1220px]:min-h-[508px]">
                            <div className="absolute inset-0 bg-[url(https://img.youtube.com/vi/QtN10Eb3U0o/maxresdefault.jpg?h=503&fm=webp)] bg-cover bg-center opacity-50" />
                            {/* Button Container */}
                            <div className="relative flex w-full content-center justify-center">
                                <button
                                    className="hover:bg-opacity-90 z-2 m-auto inline-flex cursor-pointer items-center gap-3 rounded-md bg-[#0a2550] px-6 py-4 font-medium text-white [transition:all_.3s_ease-in-out] hover:bg-white hover:text-[#0a2550]"
                                    onClick={toggleOverlay}
                                >
                                    <svg className="size-5 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            d="M19.494 10.917 6.444 3.15A.984.984 0 0 0 5.933 3a.935.935 0 0 0-.928.938H5v16.125h.005c0 .515.417.937.928.937.192 0 .351-.066.525-.16l13.036-7.757a1.412 1.412 0 0 0 0-2.166Z"
                                        ></path>
                                    </svg>
                                    <span className="min-w-0 truncate">Watch our showreel</span>
                                </button>
                            </div>
                        </div>
                        <motion.div
                            className="min-[1220px]:col-[span_5]"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <h1 className="mb-6 text-5xl font-normal text-[#0a2550] md:text-7xl">We are Hexters</h1>
                            <p className="mb-6 text-[#0a2550]">
                                <strong>Hexters</strong> is a digital innovation studio that creates exceptional digital experiences. We craft
                                intuitive, engaging, and impactful solutions that elevate your brand and delight your users.
                            </p>
                        </motion.div>
                    </div>
                </div>
                <VideoOverlay isOverlayVisible={isOverlayVisible} toggleOverlay={toggleOverlay} />
            </section>
            {/* Hero section ends */}
            {/* About section starts */}
            <section className="bg-white py-16 md:py-20">
                <div className="container md:grid md:grid-flow-row md:grid-cols-[repeat(12,1fr)] md:[grid-column-gap:24px]">
                    <div className="md:col-[3/span_8]">
                        <h6 className="font-mono text-[0.688rem]/[1.5] font-bold text-[#4ecdc4] md:text-xs/[1.375]">About Us</h6>
                        <div className="mt-8 space-y-4 md:mt-12">
                            <h3 className="text-xl/[1.1] font-semibold text-[#0a2550] md:text-2xl/[1.08]">
                                We're an innovative digital studio specializing in web development.
                            </h3>
                            <p className="font-light text-[#0a2550]">
                                With a portfolio that includes projects across various sectors, our offering includes strategy, discovery, SEO, data
                                analytics, content strategy, UX design, digital design, product design, digital transformation, website and web app
                                development, QA, and ongoing support and maintenance. We specialize in the implementation of mid to large-scale
                                digital projects across leading platforms including Laravel, React, Vue, and other modern frameworks.
                            </p>
                            <p className="font-light text-[#0a2550]">
                                Our experience covers a broad range of industries, including e-commerce and retail, financial services, education,
                                health, professional services, property and construction, and technology startups.
                            </p>
                            <p className="font-light text-[#0a2550]">
                                We stay at the forefront of technology trends, riding the waves of growth and adaptation. Experience is a hallmark of
                                our offering, both in terms of the experience we hold, and the experiences we create. We bring together some of the
                                brightest minds in digital to craft experiences that are intuitive, engaging, impactful and enlightening.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* About section ends */}
            {/* Mission sections starts */}
            <section className="bg-[#e6e6e6] py-16 md:py-20">
                <div className="container md:grid md:grid-flow-row md:grid-cols-[repeat(12,1fr)] md:[grid-column-gap:24px]">
                    <div className="md:col-[3/span_8]">
                        <h6 className="font-mono text-[0.688rem]/[1.5] font-bold text-[#4ecdc4] md:text-xs/[1.375]">Our Mission</h6>
                        <div className="mt-8 space-y-4 md:mt-12">
                            <h3 className="text-xl/[1.1] font-semibold text-[#0a2550] md:text-2xl/[1.08]">
                                To make digital bright and the human experience brighter.
                            </h3>
                            <p className="font-light text-[#0a2550]">
                                What does this mean? It means making the websites we build perform quickly and flawlessly. It means helping our
                                clients navigate stakeholder sign-offs so they can win at their jobs and go home happy. It means giving our team the
                                freedom to work in a way that works for them. It means creating beautiful, functional digital products while
                                committing to carbon neutrality.
                            </p>
                            <p className="font-light text-[#0a2550]">Ultimately, it means creating experiences that excite and inspire.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Mission sections ends */}
            {/* Our Values section starts */}
            <section className="relative overflow-hidden bg-[#0a2550] py-16 md:py-20">
                <div className="relative z-2 container text-white">
                    <h5 className="relative mb-6 text-xs/[1.375] font-semibold">Who we are</h5>
                    <div className="grid w-full grid-flow-row grid-cols-2 gap-[32px_0] md:gap-[96px_24px]">
                        <div className="col-span-2 text-base font-light md:col-span-1 md:text-[1.313rem]/[1.375]">
                            <h2 className="mb-4 text-[1.625rem] leading-[1.08] font-normal md:text-[2.313rem]">Real</h2>
                            <p className="font-light">
                                We're authentic and down-to-earth, true to ourselves and honest to our clients. We say what we'll do, and we do what
                                we say.
                            </p>
                        </div>
                        <div className="col-span-2 text-base font-light md:col-span-1 md:text-[1.313rem]/[1.375]">
                            <h2 className="mb-4 text-[1.625rem] leading-[1.08] font-normal md:text-[2.313rem]">Solid</h2>
                            <p className="font-light">
                                We've been in the business for years. Everything we say and do is backed by solid experience and proven results.
                            </p>
                        </div>
                        <div className="col-span-2 text-base font-light md:col-span-1 md:text-[1.313rem]/[1.375]">
                            <h2 className="mb-4 text-[1.625rem] leading-[1.08] font-normal md:text-[2.313rem]">Human</h2>
                            <p className="font-light">
                                We put people first every time – in our business and our work. Creating genuinely human-centered experiences is what
                                drives us.
                            </p>
                        </div>
                        <div className="col-span-2 text-base font-light md:col-span-1 md:text-[1.313rem]/[1.375]">
                            <h2 className="mb-4 text-[1.625rem] leading-[1.08] font-normal md:text-[2.313rem]">Bright</h2>
                            <p className="font-light">
                                We aim to be the brightest minds in digital – intelligent, insightful and enlightening. We're always looking for new
                                ways to make a difference.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Our Values section ends */}
        </PortfolioLayout>
    );
};

export default About;
