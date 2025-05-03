import { useEffect, useState } from 'react';

interface ProgressBarProps {
    isAnimating: boolean;
    color?: string;
    height?: number;
}

const ProgressBar = ({ isAnimating, color = 'var(--color-accent)', height = 3 }: ProgressBarProps) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        if (isAnimating) {
            // Reset width to 0
            setWidth(0);

            // Quickly move to 30%
            timeout = setTimeout(() => {
                setWidth(30);

                // Slowly progress to 90%
                interval = setInterval(() => {
                    setWidth((prevWidth) => {
                        if (prevWidth >= 90) {
                            clearInterval(interval);
                            return 90;
                        }

                        // Gradually slow down the progress
                        const increment = Math.max(0.5, 10 * (1 - prevWidth / 100));
                        return prevWidth + increment;
                    });
                }, 200);
            }, 50);
        } else if (width > 0) {
            // Complete the progress bar when animation is stopped
            setWidth(100);

            // Reset after animation completes
            timeout = setTimeout(() => {
                setWidth(0);
            }, 500);
        }

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [isAnimating]);

    return (
        <div className="pointer-events-none fixed top-0 left-0 z-50 w-full" style={{ height: `${height}px` }}>
            <div
                className="h-full transition-all duration-300 ease-out"
                style={{
                    width: `${width}%`,
                    backgroundColor: color,
                    transitionProperty: 'width, opacity',
                    opacity: width > 0 ? 1 : 0,
                    boxShadow: `0 0 8px ${color}`,
                }}
            />
        </div>
    );
};

export default ProgressBar;
