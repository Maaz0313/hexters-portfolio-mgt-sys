import React from "react";
import { FaChartLine, FaHashtag, FaFileAlt, FaChartBar } from "react-icons/fa";
import { motion } from "framer-motion";
import PortfolioLayout from "@/layouts/portfolio-layout";

const Marketing = () => {
  const services = [
    {
      icon: <FaChartLine />,
      title: "Social Media Optimization",
      description: "Strategic optimization of your social media presence to maximize engagement and reach."
    },
    {
      icon: <FaHashtag />,
      title: "Social Media Management",
      description: "Comprehensive management of your social platforms with consistent posting and community engagement."
    },
    {
      icon: <FaFileAlt />,
      title: "Content Strategy",
      description: "Data-driven content planning that aligns with your business goals and resonates with your audience."
    },
    {
      icon: <FaChartBar />,
      title: "Analytics & Reporting",
      description: "Detailed performance tracking with actionable insights to continuously improve your marketing efforts."
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
    <PortfolioLayout title="Digital Marketing Services">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-accent py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Digital Marketing Solutions
            </h1>
            <p className="mb-10 text-xl/relaxed text-white/90">
              Elevate your brand with cutting-edge digital marketing strategies that drive results and boost engagement
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
          className="absolute top-20 right-20 h-12 w-12 rounded-full bg-accent/30"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
        />
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-primary">
              Our Marketing Services
            </h2>
            <p className="mx-auto max-w-2xl text-xl/relaxed text-foreground/80">
              Comprehensive digital marketing solutions tailored to your business needs
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
                <div className="mb-6 text-4xl text-accent">
                  {service.icon}
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-primary">
                  {service.title}
                </h3>
                <p className="text-lg/relaxed text-foreground/80">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="mb-10 text-xl/relaxed text-white/90">
              Let's create a marketing strategy that drives real results for your business
            </p>
            <motion.a
              href="/contact"
              className="inline-flex h-[56px] w-fit items-center justify-center rounded-[80px] border-none px-8 font-medium shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
              style={{
                backgroundColor: "#1e3a6d",
                color: "white"
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "white",
                color: "#0a2550"
              }}
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

export default Marketing;






