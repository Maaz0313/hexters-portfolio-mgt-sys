import React, { ReactNode } from "react";
import { FaLaravel, FaCode, FaDatabase, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import { Head } from '@inertiajs/react';
import Layout from '@/Layout';

// Define interface for PortfolioLayout props
interface PortfolioLayoutProps {
  children: ReactNode;
  title?: string;
}

// Define a local PortfolioLayout component
const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ children, title }) => {
  return (
    <>
      {title && <Head title={title} />}
      <Layout>{children}</Layout>
    </>
  );
};

const Services = () => {
  const features = [
    {
      icon: <FaLaravel />,
      title: "Laravel Backend",
      description:
        "Secure, scalable & maintainable backend development with Laravel's elegant syntax & powerful features",
    },
    {
      icon: <FaCode />,
      title: "API Development",
      description:
        "RESTful API development with comprehensive documentation & seamless integration capabilities",
    },
    {
      icon: <FaDatabase />,
      title: "Database Architecture",
      description:
        "Optimized database design with Eloquent ORM for efficient data management & scalability",
    },
    {
      icon: <FaRocket />,
      title: "Performance Optimization",
      description:
        "Enhanced application performance with caching, queue management & optimization techniques",
    },
  ];

  const platforms = [
    {
      name: "Shopify",
      icon: "/images/icon-shopify.png",
      features: [
        "Custom Theme Development",
        "App Integration",
        "Store Optimization",
        "Multi-currency Support",
      ],
    },
    {
      name: "Amazon",
      icon: "/images/icon-amazon.png",
      features: [
        "Marketplace Setup",
        "Product Optimization",
        "Inventory Management",
        "Analytics Integration",
      ],
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
    <PortfolioLayout title="Our Services">
      {/* Branding section starts */}
      <section className="relative py-28">
        {/* Background image with blur effect */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: "url('/images/bg/image.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)"
          }}
        ></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 z-0 bg-black opacity-30"></div>
        <div className="container relative z-10 mx-auto flex flex-col items-center space-y-12 px-8 md:flex-row md:space-y-0 md:space-x-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:w-1/2 md:text-left"
          >
            <h1 className="mb-6 text-6xl/tight font-bold text-foreground">
              Branding Services
            </h1>
            <p className="mb-10 max-w-xl text-xl/relaxed font-medium text-foreground">
              We help you create a strong brand identity that resonates with
              your audience and leaves a lasting impression in the market.
            </p>
            <a
              href="branding"
              className="cta-btn inline-flex h-[56px] w-fit items-center justify-center px-8"
            >
              Learn More
              <motion.span
                className="ml-2"
                initial={{ x: 1 }}
                animate={{ x: [1, 5, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto max-w-lg md:w-1/2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-accent opacity-10 blur-2xl" />
            <img
              src="/images/branding.webp"
              alt="Branding Illustration"
              className="relative h-auto w-full rounded-3xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>
      {/* Branding section ends */}

      {/* Marketing section starts */}
      <section className="relative overflow-hidden py-24" style={{ backgroundColor: "#1e3a6d" }}>
        <div className="relative container mx-auto px-6">
          <div className="flex flex-col items-center gap-16 md:flex-row">
            {/* Content Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full space-y-8 text-white md:w-1/2"
            >
              <h2 className="text-5xl/tight font-bold md:text-7xl" style={{ color: "white" }}>
                Transform Your Digital Presence
              </h2>
              <p className="max-w-xl text-xl/relaxed" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                Elevate your brand with cutting-edge digital marketing
                strategies that drive results and boost engagement.
              </p>

              {/* Service Cards */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-10 grid gap-5 sm:grid-cols-2"
              >
                {[
                  "Social Media Optimization",
                  "Social Media",
                  "Content Strategy",
                  "Analytics",
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex cursor-default items-center rounded-xl p-5 backdrop-blur-xs transition-transform duration-300 hover:scale-105"
                    style={{
                      backgroundColor: "rgba(10, 37, 80, 0.3)",
                      backdropFilter: "blur(4px)"
                    }}
                    whileHover={{
                      backgroundColor: "rgba(10, 37, 80, 0.4)"
                    }}
                  >
                    <h3 className="text-xl font-semibold" style={{ color: "#4ecdc4" }}>{service}</h3>
                  </motion.div>
                ))}
              </motion.div>

              <motion.a
                href="/marketing"
                className="mt-6 inline-flex h-[56px] w-fit items-center justify-center rounded-[80px] border-none px-8 font-medium shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
                style={{
                  backgroundColor: "#0a2550",
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

            {/* Illustration Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative w-full md:w-1/2"
            >
              <motion.div
                className="relative mx-auto max-w-lg"
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-accent/30"></div>
                <img
                  src="/images/marketing.webp"
                  alt="Digital Marketing Illustration"
                  className="relative z-10 h-auto w-full rounded-2xl shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-1 left-10 h-20 w-20 rounded-full bg-orange-400/20"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.div
          className="absolute top-20 right-20 h-12 w-12 rounded-full bg-accent/20"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
        />
      </section>
      {/* Marketing section ends */}

      {/* Ecommerce section starts */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-950 via-blue-900 to-blue-800 py-20">
        <div className="relative container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">
              Unified E-commerce Solutions
            </h2>
            <p className="text-lg text-blue-100">
              Maximize your online presence with our integrated Shopify and
              Amazon solutions
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-xs transition-transform duration-300 hover:scale-105"
              >
                <div className="mb-6 flex items-center">
                  <img
                    src={platform.icon}
                    alt={`${platform.name} icon`}
                    className="mr-2 size-16"
                  />
                  <h3 className="text-2xl font-semibold text-white">
                    {platform.name} Integration
                  </h3>
                </div>

                <ul className="space-y-3">
                  {platform.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-white/90"
                    >
                      <span className="mr-3 h-2 w-2 rounded-full bg-white/70" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={`/${platform.name.toLowerCase()}`}
                  className="mt-6 inline-block rounded-full bg-blue-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-500"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 h-20 w-20 animate-pulse rounded-full bg-blue-400/20" />
        <div className="absolute bottom-10 left-10 h-16 w-16 animate-pulse rounded-full bg-blue-300/20" />
      </section>
      {/* Ecommerce section ends */}

      {/* WebDev section starts */}
      <section className="relative overflow-hidden py-28" style={{ backgroundColor: "#0a2550" }}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="mx-auto mb-6 max-w-4xl text-5xl font-bold md:text-6xl" style={{ color: "#4ecdc4" }}>
              Full-Stack Web Development
              <span style={{ color: "#4ecdc4" }}> with Laravel</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl/relaxed" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              Leverage the power of Laravel's robust backend framework combined
              with modern frontend technologies for exceptional web experiences
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
                className="group translate-y-0 scale-100 transform cursor-default rounded-xl p-8 backdrop-blur-lg transition-all duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              >
                <div className="mb-6 text-5xl transition-colors duration-300" style={{ color: "#4ecdc4" }}>
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-2xl font-semibold" style={{ color: "#0a2550" }}>
                  {feature.title}
                </h3>
                <p className="text-lg/relaxed" style={{ color: "rgba(10, 37, 80, 0.8)" }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Added CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <motion.a
              href="/laravel"
              className="inline-flex h-[56px] w-fit items-center justify-center rounded-[80px] border-none px-8 text-lg font-medium shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
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
              Explore Laravel Development
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="ml-2"
              >
                <polygon
                  fill="currentColor"
                  fillRule="evenodd"
                  points="0 9.018 12.174 9.018 6.563 14.629 8.016 16.031 16.031 8.016 8.016 0 6.613 1.403 12.174 7.014 0 7.014"
                  transform="translate(3.984 3.984)"
                ></polygon>
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-accent/10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-orange-400/10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
      </section>
      {/* WebDev section ends */}

      {/* CTA section starts */}
      <section className="relative overflow-hidden bg-accent py-20">
        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl" style={{ color: "#0a2550" }}>
              Ready to Start Your Next Project?
            </h2>
            <p className="mb-10 text-xl/relaxed" style={{ color: "rgba(10, 37, 80, 0.9)" }}>
              Let's collaborate to create exceptional digital experiences that
              drive results
            </p>
            <motion.a
              href="/contact"
              className="inline-block rounded-[80px] border-none px-8 py-5 text-lg/[1.375] font-medium shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
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
              Get in Touch
            </motion.a>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/Pattern.webp')",
            backgroundSize: "cover",
          }}
          animate={{
            x: [0, -20, 0],
            y: [0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        />
      </section>
      {/* CTA section ends */}
    </PortfolioLayout>
  );
};

export default Services;

