import { useCallback } from 'react';
import { Howl } from 'howler';

export const useSound = (src: string, vol = 0.25) => {
  const sound = new Howl({ src: [src], volume: vol });
  return useCallback(() => {
    sound.play();
    // Add haptic feedback for mobile
    if (window.navigator.vibrate) {
      window.navigator.vibrate(20);
    }
  }, [sound]);
};

export const useFeedback = (src: string) => {
  const sound = new Howl({ src: [src], volume: 0.2 });
  return useCallback(() => {
    sound.play();
    window.navigator.vibrate?.(20);
  }, [sound]);
};

// Simple haptic helper
export const vibrate = (ms = 20) => window.navigator.vibrate?.(ms);
