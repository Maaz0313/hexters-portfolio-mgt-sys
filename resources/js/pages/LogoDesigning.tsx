import PortfolioLayout from '@/layouts/portfolio-layout';
import { motion } from 'framer-motion';
import { FaLayerGroup, FaLightbulb, FaPalette, FaRocket } from 'react-icons/fa';

const LogoDesigning = () => {
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
            icon: <FaPalette />,
            title: 'Custom Logo Design',
            description: 'Unique, memorable logos that capture your brand essence and stand out in the market',
        },
        {
            icon: <FaLayerGroup />,
            title: 'Logo Variations',
            description: 'Multiple formats and variations for different applications and platforms',
        },
        {
            icon: <FaLightbulb />,
            title: 'Concept Development',
            description: 'Strategic concept exploration to find the perfect visual representation of your brand',
        },
        {
            icon: <FaRocket />,
            title: 'Brand Integration',
            description: 'Seamless integration of your logo into your overall brand identity system',
        },
    ];

    return (
        <PortfolioLayout title="Logo Design Services">
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
                            <h1 className="title-text text-secondary mb-6 text-5xl font-normal md:text-6xl">Logo Design Services</h1>
                            <p className="text-secondary/90 mb-8 text-xl/relaxed">
                                Distinctive, memorable logos that capture your brand essence and create lasting impressions
                            </p>
                            <motion.a
                                href="/contact"
                                className="bg-secondary text-white hover:text-secondary inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-medium shadow-lg transition-all duration-300 hover:bg-white"
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
                                    <div className="bg-primary/80 flex items-center justify-center rounded-xl p-8">
                                        <FaPalette className="text-secondary text-9xl" />
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
                        <h2 className="title-text text-primary mb-6 text-4xl font-normal">Our Logo Design Services</h2>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-xl/relaxed">
                            Comprehensive logo design solutions tailored to your brand identity needs
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
                        <h2 className="title-text mb-6 text-4xl font-normal text-white">Our Logo Design Process</h2>
                        <p className="mx-auto max-w-2xl text-xl/relaxed text-white/80">
                            A strategic approach to creating logos that perfectly represent your brand
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            { step: '01', title: 'Discovery', description: 'Understanding your brand, values, and target audience' },
                            { step: '02', title: 'Concept', description: 'Creating multiple design concepts based on research' },
                            { step: '03', title: 'Refinement', description: 'Perfecting your chosen concept with detailed adjustments' },
                            { step: '04', title: 'Delivery', description: 'Providing final files in all necessary formats' },
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
                        <h2 className="title-text text-stone-200 mb-6 text-4xl font-normal">Ready to Create Your Perfect Logo?</h2>
                        <p className="text-stone-200/90 mb-10 text-xl/relaxed">
                            Let's discuss how we can help you create a logo that perfectly represents your brand
                        </p>
                        <motion.a
                            href="/contact"
                            className="bg-secondary text-white hover:text-secondary inline-block rounded-full px-8 py-4 text-lg font-medium shadow-lg transition-all duration-300 hover:bg-white"
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

export default LogoDesigning;
