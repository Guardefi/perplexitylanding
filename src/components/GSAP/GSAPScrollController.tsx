'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export default function GSAPScrollController() {
  const containerRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const object = objectRef.current;
    
    if (!container || !object) return;

    // Smooth object transformation during scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        pin: false,
      }
    })
    .to(object, {
      x: "50vw",
      y: "-20vh", 
      rotation: 360,
      scale: 0.8,
      duration: 1,
      ease: "power2.inOut"
    })
    .to(object, {
      x: "-30vw",
      y: "10vh",
      rotation: 180,
      scale: 1.2,
      duration: 1,
      ease: "power2.inOut"
    })
    .to(object, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      duration: 1,
      ease: "power2.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="h-[400vh] relative">
      <div 
        ref={objectRef}
        className="fixed top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg shadow-2xl shadow-cyan-400/50"
      />
    </div>
  );
}
