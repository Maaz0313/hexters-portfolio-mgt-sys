import PortfolioLayout from '@/layouts/portfolio-layout';
import { motion } from 'framer-motion';
import { FaCode, FaLaravel, FaRocket, FaServer, FaShieldAlt } from 'react-icons/fa';

const LaravelBackend = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    // Service features
    const features = [
        {
            icon: <FaServer />,
            title: 'Scalable Architecture',
            description: 'Build robust applications that can handle growing user bases and increasing demands',
        },
        {
            icon: <FaShieldAlt />,
            title: 'Security First',
            description: 'Implement industry-standard security practices to protect your data and users',
        },
        {
            icon: <FaCode />,
            title: 'Clean Code',
            description: 'Maintainable, well-documented code following Laravel best practices',
        },
        {
            icon: <FaRocket />,
            title: 'Performance Optimized',
            description: 'Fast, responsive applications with optimized database queries and caching',
        },
    ];

    return (
        <PortfolioLayout title="Laravel Backend Development">
            {/* Hero Section */}
            <section className="from-primary to-accent relative overflow-hidden bg-gradient-to-br py-28">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 text-center md:mb-0 md:w-1/2 md:text-left"
                        >
                            <h1 className="title-text mb-6 text-5xl font-normal text-white md:text-6xl">Laravel Backend Development</h1>
                            <p className="mb-8 text-xl/relaxed text-white/90">
                                Secure, scalable & maintainable backend solutions with Laravel's elegant syntax & powerful features
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
                                    className="bg-primary text-primary-foreground relative z-10 inline-flex h-[56px] w-fit cursor-pointer items-center justify-center rounded-[80px] border-none px-8 font-medium shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white hover:text-[var(--color-primary)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
                                >
                                    Get a Quote
                                </Link>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative w-full md:w-1/2"
                        >
                            <div className="relative mx-auto max-w-lg">
                                <div className="absolute inset-0 animate-pulse rounded-2xl bg-white/20"></div>
                                <div className="from-accent/80 to-primary/80 relative z-10 overflow-hidden rounded-2xl bg-gradient-to-br p-1">
                                    <div className="bg-primary flex items-center justify-center rounded-xl p-8">
                                        <FaLaravel className="text-9xl text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-20 right-20 h-32 w-32 rounded-full bg-white/5"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                />
                <motion.div
                    className="bg-accent/20 absolute bottom-10 left-10 h-24 w-24 rounded-full"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            </section>

            {/* Features Section */}
            <section className="from-primary/10 to-accent/15 relative overflow-hidden bg-gradient-to-br py-20">
                {/* Decorative background elements */}
                <div className="absolute inset-0 z-0">
                    <div className="bg-accent/20 absolute top-20 right-10 h-64 w-64 rounded-full blur-3xl"></div>
                    <div className="bg-primary/20 absolute bottom-40 left-20 h-72 w-72 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/3 h-48 w-48 rounded-full bg-[#ffd400]/10 blur-3xl"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="title-text text-secondary mb-6 text-4xl font-normal">Why Choose Laravel for Your Backend</h2>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-xl/relaxed">
                            Laravel provides a robust foundation for your web applications with elegant syntax and powerful features
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group border-accent hover:to-accent/20 rounded-xl border-l-4 bg-gradient-to-br from-white/80 to-purple-50/90 p-8 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-white hover:shadow-xl"
                            >
                                <div className="text-accent group-hover:text-primary mb-6 text-4xl transition-colors duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-primary mb-4 text-xl font-semibold">{feature.title}</h3>
                                <p className="text-foreground/80">{feature.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Process Section */}
            <section className="from-primary/5 to-accent/5 relative overflow-hidden bg-gradient-to-br py-20">
                <div className="absolute top-0 left-0 h-full w-full opacity-10">
                    <div className="bg-accent/30 absolute top-10 right-10 h-64 w-64 animate-pulse rounded-full"></div>
                    <div className="bg-primary/30 absolute bottom-20 left-20 h-48 w-48 animate-pulse rounded-full"></div>
                </div>
                <div className="relative z-10 container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="title-text text-secondary mb-6 text-4xl font-normal">Our Development Process</h2>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-xl/relaxed">
                            We follow a structured approach to deliver high-quality Laravel backend solutions
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative mx-auto max-w-4xl"
                    >
                        {/* Timeline line */}
                        <div className="bg-accent/30 absolute top-0 left-[15px] h-full w-[2px] md:left-1/2 md:-ml-[1px]"></div>

                        {/* Timeline items */}
                        {[
                            {
                                title: 'Requirements Analysis',
                                description: 'We work closely with you to understand your business needs and technical requirements',
                            },
                            {
                                title: 'Architecture Design',
                                description: 'Creating a scalable architecture tailored to your specific project requirements',
                            },
                            {
                                title: 'Development & Testing',
                                description: 'Implementing features with test-driven development to ensure quality',
                            },
                            {
                                title: 'Deployment & Support',
                                description: 'Smooth deployment and ongoing support to keep your application running optimally',
                            },
                        ].map((step, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className={`relative mb-12 flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="flex-grow md:w-1/2">
                                    <div className={`relative rounded-xl bg-white p-6 shadow-lg ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                                        <h3 className="text-primary mb-3 text-xl font-semibold">{step.title}</h3>
                                        <p className="text-foreground/80">{step.description}</p>
                                    </div>
                                </div>

                                {/* Timeline dot */}
                                <div className="bg-accent absolute top-6 left-0 flex h-8 w-8 items-center justify-center rounded-full text-white md:left-1/2 md:-ml-4">
                                    {index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-accent py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <h2 className="title-text mb-6 text-4xl font-normal text-white">Ready to Build Your Laravel Backend?</h2>
                        <p className="mb-10 text-xl/relaxed text-white/90">
                            Let's discuss how we can help you create a robust, scalable backend for your next project
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
                                className="bg-primary text-primary-foreground relative z-10 inline-flex h-[56px] w-fit cursor-pointer items-center justify-center rounded-[80px] border-none px-8 font-medium shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white hover:text-[var(--color-primary)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
                            >
                                Get in Touch
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </PortfolioLayout>
    );
};

export default LaravelBackend;
