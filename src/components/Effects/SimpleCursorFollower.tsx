'use client';
import { useEffect, useRef } from 'react';

export default function SimpleCursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current && glowRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        
        // Delayed glow follow
        setTimeout(() => {
          if (glowRef.current) {
            glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
          }
        }, 100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div 
        ref={glowRef}
        className="fixed -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none z-40"
        style={{ transition: 'transform 0.3s ease-out' }}
      >
        <div className="w-full h-full bg-cyan-400/20 rounded-full blur-xl animate-pulse" />
      </div>
      <div 
        ref={cursorRef}
        className="fixed -translate-x-1/2 -translate-y-1/2 w-20 h-20 pointer-events-none z-40"
      >
        <div className="w-full h-full border-2 border-cyan-400 rounded-full animate-spin-slow" />
      </div>
    </>
  );
}
