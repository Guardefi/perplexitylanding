'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export default function PhysicsScrollElements() {
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const elements = elementsRef.current;

    elements.forEach((element, index) => {
      if (!element) return;

      // Create floating animation with physics
      gsap.set(element, {
        y: Math.random() * 200 - 100,
        x: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4
      });

      ScrollTrigger.create({
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: 1 + index * 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          
          gsap.to(element, {
            y: Math.sin(progress * Math.PI * 4) * 50,
            x: Math.cos(progress * Math.PI * 3) * 30,
            rotation: progress * 180 + (index * 45),
            duration: 0.3,
            ease: "none"
          });
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="h-[300vh] relative overflow-hidden">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) elementsRef.current[index] = el;
          }}
          className="absolute w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg shadow-lg shadow-cyan-400/30"
          style={{
            top: `${(index * 25) + 10}%`,
            left: `${(index % 3) * 30 + 20}%`,
          }}
        />
      ))}
    </div>
  );
}
