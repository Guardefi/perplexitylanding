'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface Photo {
  src: string;
  alt: string;
}

interface ScrollFlipPhotosProps {
  photos: Photo[];
}

export default function ScrollFlipPhotos({ photos }: ScrollFlipPhotosProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={ref} className="relative h-[200vh]">
      {photos.map((photo, i) => {
        const start = i / photos.length;
        const end = (i + 1) / photos.length;
        const rotateY = useTransform(scrollYProgress, [start, end], [90, 0]);
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

        return (
          <motion.div
            key={i}
            style={{
              opacity,
              rotateY,
              transformStyle: 'preserve-3d',
              perspective: 800,
            }}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="block w-3/4 max-w-lg rounded-lg shadow-lg"
              style={{ backfaceVisibility: 'hidden' }}
            />
          </motion.div>
        );
      })}
    </section>
  );
}
