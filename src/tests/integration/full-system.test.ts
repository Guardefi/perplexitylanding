import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import HomePage from '@/app/page';

describe('ScorpiusCore Full System Integration', () => {
  beforeEach(() => {
    // Mock WebGL context
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      getExtension: jest.fn(),
      getParameter: jest.fn(),
      createShader: jest.fn(),
      shaderSource: jest.fn(),
      compileShader: jest.fn(),
      createProgram: jest.fn(),
      attachShader: jest.fn(),
      linkProgram: jest.fn(),
      useProgram: jest.fn(),
      createBuffer: jest.fn(),
      bindBuffer: jest.fn(),
      bufferData: jest.fn(),
      enable: jest.fn(),
      clearColor: jest.fn(),
      clear: jest.fn(),
      viewport: jest.fn(),
    }));
    
    // Mock audio context
    window.AudioContext = jest.fn().mockImplementation(() => ({
      createOscillator: jest.fn(() => ({
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
        frequency: { setValueAtTime: jest.fn() },
      })),
      createGain: jest.fn(() => ({
        connect: jest.fn(),
        gain: { setValueAtTime: jest.fn() },
      })),
      destination: {},
      currentTime: 0,
    }));

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  test('Complete scroll journey works', async () => {
    render(<HomePage />);
    
    // Test initial load
    expect(screen.getByText('ScorpiusCore')).toBeInTheDocument();
    
    // Test scroll interactions
    act(() => {
      fireEvent.scroll(window, { target: { scrollY: 1000 } });
    });
    
    await waitFor(() => {
      // Check if scroll-triggered elements appear
      const elements = screen.getAllByText(/Defense|Security|Protection/i);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test('3D elements render without errors', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    render(<HomePage />);
    
    await waitFor(() => {
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  test('GSAP animations initialize properly', async () => {
    render(<HomePage />);
    
    // Check if GSAP elements are present
    const animatedElements = document.querySelectorAll('[data-gsap]');
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  test('Performance metrics stay within bounds', async () => {
    const startTime = performance.now();
    render(<HomePage />);
    const renderTime = performance.now() - startTime;
    
    // Initial render should be under 100ms
    expect(renderTime).toBeLessThan(100);
  });
});
