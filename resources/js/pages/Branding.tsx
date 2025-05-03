import PortfolioLayout from '@/layouts/portfolio-layout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaBook, FaChartLine, FaLayerGroup, FaPalette } from 'react-icons/fa';

function Branding() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const brandingServices = [
        {
            title: 'Logo Design',
            description: 'Distinctive, memorable logos that capture your brand essence',
            icon: <FaPalette />,
        },
        {
            title: 'Brand Identity',
            description: 'Comprehensive visual systems that communicate your brand values',
            icon: <FaLayerGroup />,
        },
        {
            title: 'Brand Strategy',
            description: 'Strategic positioning to differentiate your brand in the market',
            icon: <FaChartLine />,
        },
        {
            title: 'Brand Guidelines',
            description: 'Detailed documentation to ensure consistent brand application',
            icon: <FaBook />,
        },
    ];

    return (
        <PortfolioLayout title="Branding Services">
            {/* Hero section - Updated to be different from Services.jsx */}
            <section className="bg-muted relative overflow-hidden py-32 text-white">
                <div className="relative z-5 container mx-auto px-8">
                    <div className="flex flex-col items-center md:flex-row">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="relative z-1 mb-12 text-center md:mb-0 md:w-1/2 md:pr-12 md:text-left"
                        >
                            <h1 className="title-text mb-6 text-5xl leading-tight font-normal md:text-7xl">
                                Craft Your <span className="text-primary">Brand Story</span>
                            </h1>
                            <p className="mb-10 max-w-xl text-xl text-white/90 md:text-2xl">
                                We transform ideas into powerful brand identities that resonate with your audience and stand the test of time.
                            </p>
                            <motion.div
                                className="relative z-10"
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href={route('contact')}
                                    className="bg-secondary relative z-10 inline-flex h-[56px] w-fit cursor-pointer items-center justify-center rounded-[80px] border-none px-8 font-medium text-white shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white hover:text-[var(--color-secondary)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
                                >
                                    Start Your Brand Journey
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="relative z-10 md:w-1/2"
                        >
                            <div className="relative z-20">
                                <img src="/images/branding.webp" alt="Branding Concept" className="relative z-20 rounded-2xl shadow-2xl" />
                                <motion.div
                                    className="bg-primary absolute -top-6 -right-6 z-10 h-24 w-24 rounded-full opacity-80"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                />
                                <motion.div
                                    className="bg-primary absolute -bottom-8 -left-8 z-10 h-32 w-32 rounded-full opacity-60"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                    }}
                                    transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <motion.div
                    className="bg-primary absolute top-0 right-0 z-0 h-96 w-96 rounded-full opacity-10 blur-3xl"
                    animate={{
                        y: [0, -30, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                />
                <motion.div
                    className="bg-primary absolute bottom-0 left-0 z-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                />
            </section>

            {/* Services section - Enhanced with more color and visual appeal */}
            <section className="bg-background relative overflow-hidden py-24">
                {/* Background image with blur effect */}
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: "url('/images/bg/image.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(8px)',
                    }}
                ></div>
                {/* Decorative elements */}
                <div className="bg-accent/10 absolute top-0 right-0 z-0 h-64 w-64 rounded-full blur-3xl"></div>
                <div className="bg-accent/10 absolute bottom-0 left-0 z-0 h-64 w-64 rounded-full blur-3xl"></div>

                <div className="relative z-10 container mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <span className="bg-primary text-primary-foreground mb-4 inline-block rounded-full px-4 py-1 text-sm font-medium">
                            Our Expertise
                        </span>
                        <h2 className="title-text text-primary mb-6 text-4xl font-normal md:text-5xl">
                            Branding Services That <span className="text-white">Stand Out</span>
                        </h2>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-xl/relaxed">
                            We craft distinctive brand identities that capture attention and create lasting connections with your audience.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {brandingServices.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group bg-card translate-y-0 scale-100 transform cursor-default overflow-hidden rounded-xl p-8 shadow-md transition-all duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-xl"
                            >
                                <div className="bg-accent mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white">
                                    {service.icon}
                                </div>
                                <h3 className="text-secondary mb-4 text-2xl font-semibold">{service.title}</h3>
                                <p className="text-foreground/80 text-lg/relaxed">{service.description}</p>
                                <div className="bg-accent mt-6 h-1 w-12 rounded-full transition-all duration-300 group-hover:w-20"></div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA section */}
            <section className="bg-accent relative py-20">
                <div className="relative z-5 container mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative z-1 mx-auto max-w-3xl text-center"
                    >
                        <h2 className="title-text text-secondary mb-6 text-4xl font-normal md:text-5xl">Ready to Build Your Brand?</h2>
                        <p className="text-muted mb-10 text-xl/relaxed">Let's create a powerful brand identity that connects with your audience</p>
                        <motion.div
                            className="relative z-10"
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={route('contact')}
                                className="bg-secondary hover:text-secondary relative z-10 inline-flex h-[56px] w-fit cursor-pointer items-center justify-center rounded-[80px] border-none px-8 font-medium text-white shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
                            >
                                Get Started
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PortfolioLayout>
    );
}

export default Branding;
