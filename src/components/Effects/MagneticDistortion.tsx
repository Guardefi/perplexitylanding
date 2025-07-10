'use client';
import { useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';

interface MagneticDistortionProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticDistortion({ 
  children, 
  strength = 20,
  className = '' 
}: MagneticDistortionProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    
    gsap.to(elementRef.current, {
      x: x * strength,
      y: y * strength,
      rotationY: x * 15,
      rotationX: -y * 15,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformOrigin: 'center center'
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(elementRef.current, { 
      x: 0, 
      y: 0, 
      rotationX: 0, 
      rotationY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)'
    });
  };
  
  return (
    <div 
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
