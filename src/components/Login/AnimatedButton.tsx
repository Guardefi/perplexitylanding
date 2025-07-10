'use client';
import { motion } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className = '', variant = 'primary', ...props }, ref) => {
    const baseStyles = 'py-3 px-6 rounded-lg font-bold transition-all duration-300';
    const variants = {
      primary: 'bg-cyan-400 text-black hover:bg-cyan-300 btn-glow',
      secondary: 'bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black'
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
