import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define interfaces for the component props and project type
interface Project {
  id?: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  branding?: string;
  industry?: string;
}

interface PortfolioSliderProps {
  isOpen: boolean;
  onClose: () => void;
  currentProject: Project | null;
  projects: Project[];
}

const PortfolioSlider: React.FC<PortfolioSliderProps> = ({ isOpen, onClose, currentProject, projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentProject) {
      const index = projects.findIndex(
        (project) => project.title === currentProject.title,
      );
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [currentProject, projects]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !currentProject) return null;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + projects.length) % projects.length,
    );
  };

  const project: Project = projects[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md"
          style={{ backgroundColor: "rgba(48, 10, 68, 0.75)" }}
        >
          {/* Navigation buttons - positioned at middle-left and middle-right of screen */}
          <button
            onClick={handlePrev}
            className="fixed top-1/2 left-6 z-20 -translate-y-1/2 transform cursor-pointer rounded-full border-2 border-[#4716ED] bg-white p-4 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#4716ED]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="fixed top-1/2 right-6 z-20 -translate-y-1/2 transform cursor-pointer rounded-full border-2 border-[#4716ED] bg-white p-4 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#4716ED]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Close button - positioned at top-right of screen */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 z-20 cursor-pointer rounded-full bg-[#4716ED] p-3 text-white shadow-lg transition-colors duration-300 hover:bg-[#300A44]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col rounded-xl bg-white shadow-2xl"
          >
            {/* Content with scrollbar */}
            <div className="custom-scrollbar flex-grow overflow-y-auto">
              <div className="p-4">
                <div className="relative w-full overflow-hidden rounded-t-lg pb-[56.25%]">
                  <motion.img
                    key={project.image}
                    initial={{ opacity: 0.8, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={project.image}
                    alt={project.imageAlt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <div className="p-8">
                  <motion.h2
                    key={`title-${currentIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="mb-4 text-3xl font-bold text-[#300A44]"
                  >
                    {project.title}
                  </motion.h2>
                  <motion.p
                    key={`desc-${currentIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mb-4 text-lg text-gray-700"
                  >
                    {project.description}
                  </motion.p>

                  {/* Project details */}
                  <motion.div
                    key={`details-${currentIndex}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    className="mb-6 flex flex-wrap gap-4"
                  >
                    {project.branding && (
                      <div className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                        <span className="mr-1 font-bold">Branding:</span> {project.branding}
                      </div>
                    )}
                    {project.industry && (
                      <div className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800">
                        <span className="mr-1 font-bold">Industry:</span> {project.industry}
                      </div>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="mb-8"
                  >
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Pagination indicator */}
            <div className="absolute right-0 bottom-6 left-0 flex justify-center">
              <div className="rounded-full bg-[#300A44]/80 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
                {currentIndex + 1} / {projects.length}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioSlider;

