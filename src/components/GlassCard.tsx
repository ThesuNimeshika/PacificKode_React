import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, title, className = '' }) => {
    return (
        <div className={`glass-panel p-8 mb-8 animate-fade-in ${className}`}>
            {title && <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">{title}</h2>}
            {children}
        </div>
    );
};

export default GlassCard;
