import PortfolioLayout from '@/layouts/portfolio-layout';
import { motion } from 'framer-motion';
import { FaPencilAlt, FaRegFileAlt, FaRegImage, FaRegLightbulb } from 'react-icons/fa';

const Sketching2D = () => {
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
    const services = [
        {
            icon: <FaPencilAlt />,
            title: 'Concept Sketching',
            description: 'Rapid visualization of ideas through expressive hand-drawn or digital sketches',
        },
        {
            icon: <FaRegLightbulb />,
            title: 'Ideation & Exploration',
            description: 'Creative exploration of multiple design directions through sketching techniques',
        },
        {
            icon: <FaRegImage />,
            title: 'Detailed Illustrations',
            description: 'Highly detailed 2D illustrations for products, environments, or characters',
        },
        {
            icon: <FaRegFileAlt />,
            title: 'Technical Drawings',
            description: 'Precise technical drawings and diagrams for manufacturing or documentation',
        },
    ];

    return (
        <PortfolioLayout title="2D Sketching Services">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-28" style={{ backgroundColor: '#0a2550' }}>
                <div className="from-primary/90 to-primary absolute inset-0 bg-gradient-to-br opacity-80"></div>
                <div className="relative z-10 container mx-auto px-6">
                    <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 text-center md:mb-0 md:w-1/2 md:text-left"
                        >
                            <h1 className="title-text text-secondary mb-6 text-5xl font-normal md:text-6xl">2D Sketching Services</h1>
                            <p className="text-secondary/90 mb-8 text-xl/relaxed">
                                Transform your ideas into visual concepts with our professional 2D sketching and illustration services
                            </p>
                            <motion.a
                                href="/contact"
                                className="bg-secondary hover:text-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-white"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Started
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative w-full md:w-1/2"
                        >
                            <div className="relative mx-auto max-w-lg">
                                <div className="bg-secondary/20 absolute inset-0 animate-pulse rounded-2xl"></div>
                                <div className="from-secondary/30 to-secondary/10 relative z-10 overflow-hidden rounded-2xl bg-gradient-to-br p-1">
                                    <div className="bg-secondary/80 flex items-center justify-center rounded-xl p-8">
                                        <FaPencilAlt className="text-secondary text-9xl" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="bg-background py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="title-text text-primary mb-6 text-4xl font-normal">Our 2D Sketching Services</h2>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-xl/relaxed">
                            Comprehensive sketching and illustration solutions for all your visual communication needs
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="group bg-card rounded-xl p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="text-accent mb-6 text-4xl">{service.icon}</div>
                                <h3 className="text-primary mb-4 text-2xl font-semibold">{service.title}</h3>
                                <p className="text-foreground/80 text-lg/relaxed">{service.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Applications Section */}
            <section className="bg-muted py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="title-text mb-6 text-4xl font-normal text-white">Applications of 2D Sketching</h2>
                        <p className="mx-auto max-w-2xl text-xl/relaxed text-white/80">
                            Our sketching services can be applied across various industries and projects
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {[
                            { icon: <FaTools />, title: 'Product Design', description: 'Concept sketches for new products and design iterations' },
                            {
                                icon: <FaFilm />,
                                title: 'Storyboarding',
                                description: 'Visual narratives for animations, films, and marketing campaigns',
                            },
                            {
                                icon: <FaBuilding />,
                                title: 'Architectural Visualization',
                                description: 'Conceptual sketches of architectural ideas and spaces',
                            },
                            {
                                icon: <FaUserAlt />,
                                title: 'Character Design',
                                description: 'Original character designs for games, animations, and branding',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start space-x-4 rounded-xl bg-white/10 p-6 backdrop-blur-sm"
                            >
                                <div className="bg-secondary flex h-12 w-12 items-center justify-center rounded-full text-white">{item.icon}</div>
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                                    <p className="text-white/80">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#304c74] py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <h2 className="title-text mb-6 text-4xl font-normal text-stone-200">Ready to Visualize Your Ideas?</h2>
                        <p className="mb-10 text-xl/relaxed text-stone-200/90">
                            Let's bring your concepts to life through professional 2D sketching and illustration
                        </p>
                        <motion.a
                            href="/contact"
                            className="bg-secondary hover:text-secondary inline-block rounded-full px-8 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:bg-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get in Touch
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </PortfolioLayout>
    );
};

export default Sketching2D;
