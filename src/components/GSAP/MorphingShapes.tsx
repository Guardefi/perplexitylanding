'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsapConfig';

export default function MorphingShapes() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    // Define shape morphing sequence
    const shapes = {
      square: "M50,50 L150,50 L150,150 L50,150 Z",
      hexagon: "M100,25 L175,75 L175,125 L100,175 L25,125 L25,75 Z",
      circle: "M100,25 C140,25 175,60 175,100 C175,140 140,175 100,175 C60,175 25,140 25,100 C25,60 60,25 100,25 Z",
      star: "M100,25 L125,75 L175,75 L137.5,112.5 L150,175 L100,150 L50,175 L62.5,112.5 L25,75 L75,75 Z"
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top center",
        end: "bottom center",
        scrub: 2,
      }
    });

    // Animate through shapes
    tl.to(path, {
      attr: { d: shapes.hexagon },
      duration: 1,
      ease: "power2.inOut"
    })
    .to(path, {
      attr: { d: shapes.circle },
      duration: 1,
      ease: "power2.inOut"
    })
    .to(path, {
      attr: { d: shapes.star },
      duration: 1,
      ease: "power2.inOut"
    })
    .to(path, {
      attr: { d: shapes.square },
      duration: 1,
      ease: "power2.inOut"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="h-[200vh] flex items-center justify-center">
      <svg ref={svgRef} width="200" height="200" viewBox="0 0 200 200" className="transform scale-150">
        <path
          ref={pathRef}
          d="M50,50 L150,50 L150,150 L50,150 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,247,0.8)]"
        />
      </svg>
    </div>
  );
}
