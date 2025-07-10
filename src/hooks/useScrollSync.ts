import { useEffect, useState } from 'react';

export function useScrollSync() {
  const [scroll, setScroll] = useState(0);
  
  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScroll(Math.min(Math.max(scrollPercent, 0), 1));
      
      // Update progress bar
      const progressBar = document.querySelector('.h-full.bg-cyan-400') as HTMLElement;
      if (progressBar) {
        progressBar.style.width = `${scrollPercent * 100}%`;
      }
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return scroll;
}

// Export additional scroll utilities
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollPosition;
}

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    };
    
    window.addEventListener('scroll', updateScrollDirection, { passive: true });
    
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection, lastScrollY]);
  
  return scrollDirection;
}
