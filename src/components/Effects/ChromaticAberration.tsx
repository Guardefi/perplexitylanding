'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsapConfig';

interface ChromaticAberrationProps {
  children: React.ReactNode;
  intensity?: number;
}

export default function ChromaticAberration({ children, intensity = 5 }: ChromaticAberrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const redRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);
  const blueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse move chromatic effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      gsap.to(redRef.current, {
        x: x * intensity * 1.2,
        y: y * intensity * 0.6,
        duration: 0.3,
      });
      
      gsap.to(greenRef.current, {
        x: x * intensity * 0.8,
        y: y * intensity * 0.4,
        duration: 0.35,
      });
      
      gsap.to(blueRef.current, {
        x: x * intensity * 0.5,
        y: y * intensity * 0.3,
        duration: 0.4,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([redRef.current, greenRef.current, blueRef.current], {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div ref={containerRef} className="relative group">
      <div 
        ref={redRef} 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          filter: 'url(#red-channel)',
          mixBlendMode: 'screen' 
        }}
      >
        {children}
      </div>
      <div 
        ref={greenRef} 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          filter: 'url(#green-channel)',
          mixBlendMode: 'screen' 
        }}
      >
        {children}
      </div>
      <div 
        ref={blueRef} 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ 
          filter: 'url(#blue-channel)',
          mixBlendMode: 'screen' 
        }}
      >
        {children}
      </div>
      <div className="relative z-10">{children}</div>
      
      {/* SVG Filters for color channels */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="red-channel">
            <feColorMatrix type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          </filter>
          <filter id="green-channel">
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          </filter>
          <filter id="blue-channel">
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
