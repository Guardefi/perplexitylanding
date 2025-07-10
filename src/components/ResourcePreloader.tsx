'use client';
import { useEffect, useState } from 'react';

export default function ResourcePreloader() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const preloadResources = async () => {
      const resources = [
        // Critical fonts
        '/fonts/command.woff2',
        '/fonts/terminal.woff2',
        
        // Critical images
        '/images/scorpius-logo.webp',
        '/textures/nebula1.webp',
        '/textures/nebula2.webp',
        
        // Audio files
        '/sounds/ambient-space.mp3',
        '/sounds/ui-hover.mp3',
        '/sounds/transition.mp3'
      ];

      let loaded = 0;
      const total = resources.length;

      const loadResource = async (url: string) => {
        try {
          if (url.match(/\.(webp|png|jpg)$/)) {
            const img = new Image();
            img.src = url;
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
          } else if (url.match(/\.(woff2|woff)$/)) {
            const font = new FontFace('PreloadFont', `url(${url})`);
            await font.load();
          } else {
            await fetch(url);
          }
          
          loaded++;
          setLoadingProgress((loaded / total) * 100);
        } catch (error) {
          console.warn(`Failed to preload ${url}:`, error);
        }
      };

      await Promise.all(resources.map(loadResource));
      
      // Signal that critical resources are loaded
      document.documentElement.classList.add('resources-loaded');
      
      // Remove loading screen after a smooth transition
      setTimeout(() => {
        document.documentElement.classList.add('loading-complete');
      }, 300);
    };

    preloadResources();
  }, []);

  return (
    <div className="fixed inset-0 z-[200] bg-war-room-void flex items-center justify-center transition-opacity duration-500 loading-screen">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-6xl font-command cyan-glow animate-pulse">
            ScorpiusCore
          </div>
          <div className="text-sm text-gray-400 mt-2">Initializing War Room...</div>
        </div>
        
        <div className="w-64 h-2 bg-war-room-abyss rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-600 transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        
        <div className="text-xs text-gray-500 mt-2">{Math.round(loadingProgress)}%</div>
      </div>
    </div>
  );
}
