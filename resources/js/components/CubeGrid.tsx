import React from 'react';

interface CubeGridProps {
  className?: string;
}

const CubeGrid: React.FC<CubeGridProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="absolute bottom-0 left-0 right-0 h-[300px] w-full perspective-[800px]">
        <div className="absolute bottom-0 left-0 right-0 h-full w-full transform-style-3d rotate-x-[60deg]">
          {/* Generate a grid of cubes */}
          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: 120 }).map((_, i) => {
              // Random height for each cube
              const height = Math.floor(Math.random() * 40) + 10;
              return (
                <div
                  key={i}
                  className="relative h-10 w-10 transform-style-3d"
                  style={{
                    transform: `translateZ(${height}px)`,
                    opacity: 0.1 + Math.random() * 0.4,
                  }}
                >
                  <div className="absolute inset-0 bg-gray-400 dark:bg-gray-600"></div>
                  <div className="absolute left-0 top-0 h-full w-full transform-origin-right rotate-y-90 bg-gray-300 dark:bg-gray-500"></div>
                  <div className="absolute bottom-0 left-0 h-full w-full transform-origin-top rotate-x-90 bg-gray-500 dark:bg-gray-700"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubeGrid;
