import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults for consistent feel
gsap.defaults({
  duration: 0.8,
  ease: "power2.out"
});

// ScrollTrigger global settings
ScrollTrigger.defaults({
  toggleActions: "play none none reverse",
  scroller: "body"
});

// Smooth scroll configuration
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  ignoreMobileResize: true
});

export { gsap, ScrollTrigger };
