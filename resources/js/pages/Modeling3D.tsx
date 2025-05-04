import PortfolioLayout from '@/layouts/portfolio-layout';
import { motion } from 'framer-motion';
import {
    FaBuilding,
    FaBullhorn,
    FaCube,
    FaGamepad,
    FaGraduationCap,
    FaIndustry,
    FaLightbulb,
    FaObjectGroup,
    FaShoppingCart,
    FaVrCardboard,
} from 'react-icons/fa';

const Modeling3D = () => {
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
            icon: <FaCube />,
            title: '3D Product Modeling',
            description: 'Detailed 3D models of products for visualization, marketing, and manufacturing',
        },
        {
            icon: <FaObjectGroup />,
            title: 'Architectural Visualization',
            description: 'Photorealistic 3D renderings of architectural spaces and structures',
        },
        {
            icon: <FaVrCardboard />,
            title: 'Interactive 3D',
            description: 'Interactive 3D models for web, AR/VR applications, and product configurators',
        },
        {
            icon: <FaLightbulb />,
            title: 'Concept Development',
            description: 'Transforming sketches and ideas into detailed 3D concept models',
        },
    ];

    return (
        <PortfolioLayout title="3D Modeling Services">
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
                            <h1 className="title-text text-secondary mb-6 text-5xl font-normal md:text-6xl">3D Modeling Services</h1>
                            <p className="text-secondary/90 mb-8 text-xl/relaxed">
                                Bring your ideas to life with professional 3D modeling and visualization services
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
                                        <FaCube className="text-secondary text-9xl" />
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
                        <h2 className="title-text text-primary mb-6 text-4xl font-normal">Our 3D Modeling Services</h2>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-xl/relaxed">
                            Comprehensive 3D modeling solutions for visualization, design, and production
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

            {/* Process Section */}
            <section className="bg-muted py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="title-text mb-6 text-4xl font-normal text-white">Our 3D Modeling Process</h2>
                        <p className="mx-auto max-w-2xl text-xl/relaxed text-white/80">
                            A systematic approach to creating high-quality 3D models and visualizations
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { step: '01', title: 'Concept', description: 'Understanding requirements and developing initial concepts' },
                            { step: '02', title: 'Modeling', description: 'Creating detailed 3D models with accurate proportions' },
                            { step: '03', title: 'Texturing', description: 'Adding materials, textures, and surface details' },
                            { step: '04', title: 'Rendering', description: 'Producing final high-quality images or animations' },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative rounded-xl bg-white/10 p-8 backdrop-blur-sm"
                            >
                                <span className="bg-accent absolute -top-5 -left-5 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold text-white">
                                    {item.step}
                                </span>
                                <h3 className="mb-4 text-2xl font-semibold text-white">{item.title}</h3>
                                <p className="text-white/80">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Applications Section */}
            <section className="bg-background py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="title-text text-primary mb-6 text-4xl font-normal">Applications of 3D Modeling</h2>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-xl/relaxed">
                            Our 3D modeling services can be applied across various industries and use cases
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: <FaIndustry />,
                                title: 'Product Design & Manufacturing',
                                description: 'Detailed models for prototyping and production',
                            },
                            {
                                icon: <FaBullhorn />,
                                title: 'Marketing & Advertising',
                                description: 'Photorealistic product renders for marketing materials',
                            },
                            {
                                icon: <FaBuilding />,
                                title: 'Architecture & Real Estate',
                                description: 'Visualizations of buildings and interior spaces',
                            },
                            {
                                icon: <FaGamepad />,
                                title: 'Entertainment & Gaming',
                                description: 'Character and environment models for games and animation',
                            },
                            {
                                icon: <FaShoppingCart />,
                                title: 'E-commerce',
                                description: '3D product configurators and interactive product displays',
                            },
                            {
                                icon: <FaGraduationCap />,
                                title: 'Education & Training',
                                description: 'Interactive 3D models for educational purposes',
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-card rounded-xl p-6 shadow-md"
                            >
                                <div className="text-accent mb-4 flex items-center">
                                    <div className="mr-3 text-3xl">{item.icon}</div>
                                    <h3 className="text-primary text-xl font-semibold">{item.title}</h3>
                                </div>
                                <p className="text-foreground/80">{item.description}</p>
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
                        <h2 className="title-text mb-6 text-4xl font-normal text-stone-200">Ready to Bring Your Ideas to Life in 3D?</h2>
                        <p className="mb-10 text-xl/relaxed text-stone-200/90">
                            Let's discuss how our 3D modeling services can help visualize your next project
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

export default Modeling3D;
