'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsapConfig';

export default function AdvancedCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: 'power2.out'
      });
      
      gsap.to(trail, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Element-specific cursor variants
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        setCursorVariant('button');
      } else if (target.classList.contains('glass-morphism')) {
        setCursorVariant('glass');
      } else if (target.classList.contains('cyan-glow')) {
        setCursorVariant('glow');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', handleElementHover);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  const getCursorStyle = () => {
    switch (cursorVariant) {
      case 'button':
        return 'w-8 h-8 bg-cyan-400 rounded-full mix-blend-difference';
      case 'glass':
        return 'w-6 h-6 border-2 border-cyan-400 rounded-full backdrop-blur-sm';
      case 'glow':
        return 'w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50';
      default:
        return 'w-5 h-5 bg-white rounded-full mix-blend-difference';
    }
  };

  return (
    <>
      <div 
        ref={cursorRef}
        className={`fixed pointer-events-none z-[100] transition-all duration-200 ${getCursorStyle()} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div 
        ref={trailRef}
        className={`fixed pointer-events-none z-[99] w-10 h-10 border border-cyan-400/30 rounded-full transition-opacity duration-300 ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
      />
    </>
  );
}
