import React from "react";
import { motion } from "framer-motion";
import { FaPalette, FaLayerGroup, FaChartLine, FaBook } from "react-icons/fa";

function Branding() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const brandingServices = [
    {
      title: "Logo Design",
      description: "Distinctive, memorable logos that capture your brand essence",
      icon: <FaPalette />
    },
    {
      title: "Brand Identity",
      description: "Comprehensive visual systems that communicate your brand values",
      icon: <FaLayerGroup />
    },
    {
      title: "Brand Strategy",
      description: "Strategic positioning to differentiate your brand in the market",
      icon: <FaChartLine />
    },
    {
      title: "Brand Guidelines",
      description: "Detailed documentation to ensure consistent brand application",
      icon: <FaBook />
    }
  ];

  return (
    <>
      {/* Hero section - Updated to be different from Services.jsx */}
      <section className="relative bg-gradient-to-br from-[#300a44] to-[#4716ed] py-32 text-white overflow-hidden">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="md:w-1/2 mb-12 md:mb-0 md:pr-12 text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Craft Your <span className="text-orange-400">Brand Story</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-xl">
                We transform ideas into powerful brand identities that resonate with your audience and stand the test of time.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#4716ed] font-medium py-4 px-8 rounded-full text-lg shadow-lg hover:bg-orange-400 hover:text-white transition-all duration-300"
              >
                Start Your Brand Journey
              </motion.a>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="md:w-1/2 relative"
            >
              <div className="relative z-10">
                <img 
                  src="/branding.webp" 
                  alt="Branding Concept" 
                  className="rounded-2xl shadow-2xl"
                />
                <motion.div 
                  className="absolute -top-6 -right-6 w-24 h-24 bg-orange-400 rounded-full opacity-80"
                  animate={{ 
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#300a44] rounded-full opacity-60"
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
          className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full opacity-10 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-80 h-80 bg-[#300a44] rounded-full opacity-20 blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </section>

      {/* Services section - Enhanced with more color and visual appeal */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-br from-[#eaedff] via-[#f5edff] to-[#fff0f5]">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#4716ed]/10 blur-3xl"></div>
        
        <div className="container relative z-10 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-[#4716ed] to-[#300a44] px-4 py-1 text-sm font-medium text-white">Our Expertise</span>
            <h2 className="mb-6 text-4xl font-bold text-[#300a44] md:text-5xl">Branding Services That <span className="text-[#4716ed]">Stand Out</span></h2>
            <p className="mx-auto max-w-2xl text-xl/relaxed text-[#18161a]/80">
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
                className="group translate-y-0 scale-100 transform cursor-default overflow-hidden rounded-xl bg-white p-8 shadow-md transition-all duration-300 ease-out hover:-translate-y-4 hover:scale-105 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4716ed] to-[#300a44] text-3xl text-white">
                  {service.icon}
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-[#300a44]">
                  {service.title}
                </h3>
                <p className="text-lg/relaxed text-[#18161a]/80">
                  {service.description}
                </p>
                <div className="mt-6 h-1 w-12 rounded-full bg-orange-400 transition-all duration-300 group-hover:w-20"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#4716ed] py-20">
        <div className="container mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ready to Build Your Brand?
            </h2>
            <p className="mb-10 text-xl/relaxed text-white/90">
              Let's create a powerful brand identity that connects with your audience
            </p>
            <motion.a
              href="/contact"
              className="inline-block rounded-[80px] bg-white px-8 py-5 text-lg/[1.375] font-medium text-[#4716ed] shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-[#300a44] hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)]"
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
}

export default Branding;









