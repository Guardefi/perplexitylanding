/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'war-room': {
          void: '#0a0a0a',
          abyss: '#1a1a1a',
          charcoal: '#2a2a2a',
          steel: '#3a3a3a',
        },
        'cyber-cyan': {
          dim: '#004d4d',
          base: '#008b8b',
          bright: '#00d4d4',
          intense: '#00ffff',
        },
      },
      fontFamily: {
        command: ['Orbitron', 'sans-serif'],
        terminal: ['Share Tech Mono', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 255, 247, 0.5)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 255, 247, 0.8)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
