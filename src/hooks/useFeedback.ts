import { useCallback } from 'react';
import { Howl } from 'howler';

export function useFeedback() {
  const playSound = useCallback((src: string, volume = 0.2) => {
    const sound = new Howl({ src: [src], volume });
    sound.play();
  }, []);

  const vibrate = useCallback((duration = 20) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(duration);
    }
  }, []);

  const feedback = useCallback((soundSrc?: string, vibrateMs = 20) => {
    if (soundSrc) {
      playSound(soundSrc);
    }
    vibrate(vibrateMs);
  }, [playSound, vibrate]);

  return { playSound, vibrate, feedback };
}
