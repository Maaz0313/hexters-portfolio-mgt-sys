import PortfolioLayout from '@/layouts/portfolio-layout';
import { motion } from 'framer-motion';
import { FaChartLine, FaGlobe, FaPalette, FaPlug, FaShopify } from 'react-icons/fa';

const Shopify = () => {
    const services = [
        {
            icon: <FaPalette />,
            title: 'Custom Theme Development',
            description: 'Unique, responsive Shopify themes tailored to your brand identity and business requirements.',
        },
        {
            icon: <FaPlug />,
            title: 'App Integration',
            description: 'Seamless integration of third-party apps and custom functionality to enhance your store.',
        },
        {
            icon: <FaChartLine />,
            title: 'Store Optimization',
            description: "Performance and conversion optimization to maximize your store's effectiveness and sales.",
        },
        {
            icon: <FaGlobe />,
            title: 'Multi-currency Support',
            description: 'Expand your reach globally with comprehensive multi-currency and language support.',
        },
    ];

    // Animation variants
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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    return (
        <PortfolioLayout title="Shopify Development">
            <section className="bg-muted relative overflow-hidden py-32">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <div className="mb-8 flex justify-center">
                            <div className="relative">
                                <FaShopify className="text-7xl text-white" />
                            </div>
                        </div>
                        <h1 className="title-text mb-6 text-5xl font-normal text-white md:text-6xl">Shopify Development Solutions</h1>
                        <p className="mb-10 text-xl/relaxed text-white/90">
                            Create stunning, high-converting Shopify stores that drive sales and delight customers
                        </p>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute bottom-10 left-10 h-20 w-20 rounded-full bg-white/20"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.div
                    className="absolute top-20 right-20 h-12 w-12 rounded-full bg-white/20"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                />
            </section>

            <section className="bg-background py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="title-text text-primary mb-6 text-4xl font-normal">Our Shopify Services</h2>
                        <p className="text-foreground/80 mx-auto max-w-2xl text-xl/relaxed">
                            Comprehensive Shopify solutions to help your e-commerce business thrive
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

            {/* CTA section */}
            <section className="bg-accent py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <h2 className="title-text text-accent-foreground mb-6 text-4xl font-normal">Ready to Launch Your Shopify Store?</h2>
                        <p className="text-accent-foreground/90 mb-10 text-xl/relaxed">
                            Let's create a Shopify experience that converts visitors into loyal customers
                        </p>
                        <motion.a
                            href="/contact"
                            className="bg-secondary inline-flex h-[56px] w-fit items-center justify-center rounded-[80px] border-none px-8 font-medium text-white shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
                            whileHover={{ scale: 1.05, backgroundColor: 'white', color: 'var(--color-secondary)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </PortfolioLayout>
    );
};

export default Shopify;
