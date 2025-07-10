'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export default function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;
    if (!container || !scrollContainer) return;

    const sections = scrollContainer.querySelectorAll('.scroll-section');
    const totalWidth = sections.length * window.innerWidth;

    gsap.set(scrollContainer, { width: totalWidth });

    // Main horizontal scroll animation
    const horizontalScroll = gsap.to(scrollContainer, {
      x: -totalWidth + window.innerWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Individual section animations
    sections.forEach((section, index) => {
      const content = section.querySelector('.content');
      
      gsap.fromTo(content, 
        { 
          opacity: 0, 
          y: 100,
          rotationY: 45,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          scrollTrigger: {
            trigger: section,
            containerAnimation: horizontalScroll,
            start: 'left 80%',
            end: 'right 20%',
            scrub: 1,
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const modules = [
    { title: 'Quantum Core', desc: 'Central processing unit', color: 'from-cyan-400 to-blue-600', icon: '⚛️' },
    { title: 'Neural Network', desc: 'AI decision matrix', color: 'from-purple-400 to-pink-600', icon: '🧠' },
    { title: 'Defense Grid', desc: 'Protective barriers', color: 'from-green-400 to-teal-600', icon: '🛡️' },
    { title: 'Warp Drive', desc: 'FTL capabilities', color: 'from-orange-400 to-red-600', icon: '🚀' }
  ];

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-gradient-to-b from-war-room-void to-war-room-abyss">
      <div ref={scrollRef} className="flex h-full">
        {modules.map((module, index) => (
          <div key={index} className="scroll-section w-screen h-full flex items-center justify-center perspective-1000">
            <div className="content text-center max-w-2xl transform-gpu">
              <div className={`relative w-64 h-64 mx-auto mb-8`}>
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${module.color} opacity-20 blur-xl animate-pulse`} />
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${module.color} opacity-30 flex items-center justify-center`}>
                  <span className="text-8xl">{module.icon}</span>
                </div>
              </div>
              <h2 className="text-6xl font-command font-bold cyan-glow mb-4">
                {module.title}
              </h2>
              <p className="text-xl text-gray-300">{module.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
