'use client';
import { useRef } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function HolographicCard({ children, className = '' }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
      className={`relative p-6 bg-transparent border border-cyan-400/30 rounded-lg backdrop-blur-sm overflow-hidden ${className}`}
    >
      {/* Holographic gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-lg" />
      
      {/* Animated scan line */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(0,255,247,0.1)_50%,transparent_60%)] animate-pulse" />
      
      {/* Mouse-following gradient */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 247, 0.2), transparent)',
        }}
      />
      
      {/* Holographic shimmer */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -skew-x-12 animate-shimmer" />
      </div>
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
