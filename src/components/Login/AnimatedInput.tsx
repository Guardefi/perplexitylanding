'use client';
import { motion } from 'framer-motion';
import { InputHTMLAttributes, forwardRef } from 'react';

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 
            bg-war-room-abyss/50 
            border border-gray-700 
            rounded-lg 
            text-white 
            placeholder-gray-500
            focus:border-cyan-400 
            focus:outline-none 
            focus:ring-2 
            focus:ring-cyan-400/20
            transition-all duration-300
            ${className}
          `}
          {...props}
        />
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          whileFocus={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: 'radial-gradient(circle at center, rgba(0, 255, 247, 0.1) 0%, transparent 70%)',
          }}
        />
      </div>
    );
  }
);

AnimatedInput.displayName = 'AnimatedInput';

export default AnimatedInput;
