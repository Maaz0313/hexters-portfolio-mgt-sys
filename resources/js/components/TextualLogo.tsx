import React from 'react';

interface TextualLogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

const TextualLogo: React.FC<TextualLogoProps> = ({ className = '', size = 'md'}) => {
    const sizeClasses = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl',
    };

    const taglineSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    return (
        <div className={`flex flex-col ${className}`}>
            <span
                className={`font-title ${sizeClasses[size]} leading-tight tracking-tight text-[#0a2550]`}
                style={{ fontFamily: 'var(--font-title)' }}
            >
                HEXTERS
            </span>
        </div>
    );
};

export default TextualLogo;
