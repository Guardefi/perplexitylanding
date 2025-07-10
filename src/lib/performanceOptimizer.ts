import { useEffect, useRef } from 'react';

export function usePerformanceOptimizer() {
  const rafId = useRef<number>();

  useEffect(() => {
    let lastTime = 0;
    const targetFPS = 60;
    const interval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= interval) {
        // Perform animations
        lastTime = currentTime;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  // Reduce motion for users who prefer it
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01s');
      document.documentElement.classList.add('reduce-motion');
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('reduce-motion');
      } else {
        document.documentElement.classList.remove('reduce-motion');
      }
    };

    prefersReducedMotion.addEventListener('change', handleChange);
    
    return () => {
      prefersReducedMotion.removeEventListener('change', handleChange);
    };
  }, []);
}

// FPS Monitor for development
export function useFPSMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    let fps = 0;
    let lastTime = performance.now();
    let frames = 0;

    const fpsElement = document.createElement('div');
    fpsElement.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #00fff7;
      padding: 10px;
      font-family: monospace;
      font-size: 14px;
      z-index: 10000;
      border-radius: 4px;
    `;
    document.body.appendChild(fpsElement);

    const updateFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime));
        frames = 0;
        lastTime = currentTime;
        fpsElement.textContent = `FPS: ${fps}`;
      }
      
      requestAnimationFrame(updateFPS);
    };

    updateFPS();

    return () => {
      if (fpsElement && document.body.contains(fpsElement)) {
        document.body.removeChild(fpsElement);
      }
    };
  }, []);
}
