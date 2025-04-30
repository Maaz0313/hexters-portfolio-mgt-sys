import React from "react";
import { FaAmazon, FaStore, FaSearch, FaBoxes, FaChartBar } from "react-icons/fa";
import { motion } from "framer-motion";

const Amazon = () => {
  const services = [
    {
      icon: <FaStore />,
      title: "Marketplace Setup",
      description: "Complete Amazon seller account setup and optimization for maximum visibility and sales."
    },
    {
      icon: <FaSearch />,
      title: "Product Optimization",
      description: "Strategic product listing optimization with SEO-focused titles, bullets, and descriptions."
    },
    {
      icon: <FaBoxes />,
      title: "Inventory Management",
      description: "Efficient inventory tracking and management systems to prevent stockouts and overstock."
    },
    {
      icon: <FaChartBar />,
      title: "Analytics Integration",
      description: "Comprehensive analytics setup to track performance and make data-driven decisions."
    }
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
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-900 to-orange-500 py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-8 flex justify-center">
              <FaAmazon className="text-7xl text-white" />
            </div>
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Amazon Marketplace Solutions
            </h1>
            <p className="mb-10 text-xl/relaxed text-white/90">
              Maximize your sales potential on the world's largest online marketplace
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-10 left-10 h-20 w-20 rounded-full bg-orange-400/20"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="absolute top-20 right-20 h-12 w-12 rounded-full bg-orange-300/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
        />
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-orange-900">
              Our Amazon Services
            </h2>
            <p className="mx-auto max-w-2xl text-xl/relaxed text-[#18161a]/80">
              Comprehensive Amazon marketplace solutions to help your products stand out and sell
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
                className="group rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 text-4xl text-orange-600">
                  {service.icon}
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-orange-900">
                  {service.title}
                </h3>
                <p className="text-lg/relaxed text-[#18161a]/80">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-orange-50 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-orange-900">
              Ready to Dominate Amazon?
            </h2>
            <p className="mb-10 text-xl/relaxed text-[#18161a]/80">
              Let's create an Amazon strategy that drives visibility, sales, and growth
            </p>
            <motion.a
              href="/contact"
              className="inline-flex h-[56px] w-fit items-center justify-center rounded-[80px] border-none bg-orange-600 px-8 font-medium text-white shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-orange-700 hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Amazon;
