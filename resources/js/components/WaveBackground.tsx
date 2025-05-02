import React from 'react';

interface WaveBackgroundProps {
  className?: string;
}

const WaveBackground: React.FC<WaveBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute right-0 top-0 z-0 h-full w-1/2 overflow-hidden ${className}`}>
      <svg
        className="wave-animation-slow absolute right-0 top-0 h-full w-full"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="var(--color-accent)" strokeOpacity="0.1" strokeWidth="2">
          {/* Generate multiple wave paths */}
          {Array.from({ length: 20 }).map((_, i) => (
            <path
              key={i}
              d={`M${i * 40},0 Q${i * 40 + 20},${100 + i * 20} ${i * 40},${200 + i * 20} T${i * 40},${400 + i * 20} T${i * 40},${600 + i * 20} T${i * 40},800`}
            />
          ))}
        </g>
      </svg>
      <svg
        className="wave-animation-medium absolute right-0 top-0 h-full w-full"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" stroke="var(--color-accent)" strokeOpacity="0.05" strokeWidth="1.5">
          {/* Generate multiple wave paths with different pattern */}
          {Array.from({ length: 25 }).map((_, i) => (
            <path
              key={i}
              d={`M${i * 30 + 15},0 Q${i * 30 + 30},${80 + i * 15} ${i * 30 + 15},${160 + i * 15} T${i * 30 + 15},${320 + i * 15} T${i * 30 + 15},${480 + i * 15} T${i * 30 + 15},800`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default WaveBackground;
