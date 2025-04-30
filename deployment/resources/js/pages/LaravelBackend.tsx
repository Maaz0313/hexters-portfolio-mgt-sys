import React from "react";
import { motion } from "framer-motion";
import { FaLaravel, FaServer, FaShieldAlt, FaRocket, FaCode } from "react-icons/fa";

const LaravelBackend = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Service features
  const features = [
    {
      icon: <FaServer />,
      title: "Scalable Architecture",
      description: "Build robust applications that can handle growing user bases and increasing demands"
    },
    {
      icon: <FaShieldAlt />,
      title: "Security First",
      description: "Implement industry-standard security practices to protect your data and users"
    },
    {
      icon: <FaCode />,
      title: "Clean Code",
      description: "Maintainable, well-documented code following Laravel best practices"
    },
    {
      icon: <FaRocket />,
      title: "Performance Optimized",
      description: "Fast, responsive applications with optimized database queries and caching"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#300a44] to-[#4716ed] py-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center md:mb-0 md:w-1/2 md:text-left"
            >
              <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
                Laravel Backend Development
              </h1>
              <p className="mb-8 text-xl/relaxed text-white/90">
                Secure, scalable & maintainable backend solutions with Laravel's elegant syntax & powerful features
              </p>
              <motion.a
                href="/contact"
                className="inline-flex items-center justify-center w-fit h-[56px] px-8 rounded-[80px] border-none bg-white text-[#4716ed] font-medium shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-[#ffd400] hover:text-[#300a44] hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Quote
              </motion.a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full md:w-1/2"
            >
              <div className="relative mx-auto max-w-lg">
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-white/20"></div>
                <div className="relative z-10 overflow-hidden rounded-2xl bg-gradient-to-br from-[#4716ed]/80 to-[#300a44]/80 p-1">
                  <div className="flex items-center justify-center rounded-xl bg-[#300a44] p-8">
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
          className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-[#4716ed]/20"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-[#300a44]/10 to-[#4716ed]/15 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-[#4716ed]/20 blur-3xl"></div>
          <div className="absolute bottom-40 left-20 h-72 w-72 rounded-full bg-[#300a44]/20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 h-48 w-48 rounded-full bg-[#ffd400]/10 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-[#300a44]">
              Why Choose Laravel for Your Backend
            </h2>
            <p className="mx-auto max-w-2xl text-xl/relaxed text-[#18161a]/80">
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
                className="group rounded-xl bg-gradient-to-br from-white/80 to-purple-50/90 backdrop-blur-md p-8 border-l-4 border-[#4716ed] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-[#4716ed]/20"
              >
                <div className="mb-6 text-4xl text-[#4716ed] group-hover:text-[#300a44] transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl font-semibold text-[#300a44]">
                  {feature.title}
                </h3>
                <p className="text-[#18161a]/80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-[#300a44]/5 to-[#4716ed]/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-[#4716ed]/30 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 h-48 w-48 rounded-full bg-[#300a44]/30 animate-pulse"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-[#300a44]">
              Our Development Process
            </h2>
            <p className="mx-auto max-w-2xl text-xl/relaxed text-[#18161a]/80">
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
            <div className="absolute left-[15px] top-0 h-full w-[2px] bg-[#4716ed]/30 md:left-1/2 md:-ml-[1px]"></div>
            
            {/* Timeline items */}
            {[
              {
                title: "Requirements Analysis",
                description: "We work closely with you to understand your business needs and technical requirements"
              },
              {
                title: "Architecture Design",
                description: "Creating a scalable architecture tailored to your specific project requirements"
              },
              {
                title: "Development & Testing",
                description: "Implementing features with test-driven development to ensure quality"
              },
              {
                title: "Deployment & Support",
                description: "Smooth deployment and ongoing support to keep your application running optimally"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative mb-12 flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-grow md:w-1/2">
                  <div className={`relative rounded-xl bg-white p-6 shadow-lg ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                    <h3 className="mb-3 text-xl font-semibold text-[#300a44]">
                      {step.title}
                    </h3>
                    <p className="text-[#18161a]/80">
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#4716ed] text-white md:left-1/2 md:-ml-4">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#4716ed]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to Build Your Laravel Backend?
            </h2>
            <p className="mb-10 text-xl/relaxed text-white/90">
              Let's discuss how we can help you create a robust, scalable backend for your next project
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center justify-center w-fit h-[56px] px-8 rounded-[80px] border-none bg-white text-[#4716ed] font-medium shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-[#300a44] hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default LaravelBackend;


