import React from 'react';

interface GlassCardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, title, className = '' }) => {
    return (
        <div className={`glass-panel animate-cinematic ${className}`}>
            {title && <h2 className="text-2xl font-bold mb-10 text-white tracking-tight border-b border-cyan-500/10 pb-4">{title}</h2>}
            <div className="flex flex-col gap-6">
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
