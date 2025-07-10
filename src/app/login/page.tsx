'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import LiquidSandBackground from '@/components/Login/LiquidSandBackground';
import AnimatedButton from '@/components/Login/AnimatedButton';
import AnimatedInput from '@/components/Login/AnimatedInput';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Add your authentication logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <LiquidSandBackground />
      
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.23, 1, 0.32, 1],
            delay: 0.5 
          }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8 text-center"
          >
            <h1 className="font-command text-4xl font-bold cyan-glow mb-2">
              ScorpiusCore
            </h1>
            <p className="text-gray-400 text-sm">
              Access your war room
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            onSubmit={handleSubmit}
            className="glass-morphism rounded-2xl p-8 space-y-6 backdrop-blur-xl"
            style={{
              background: 'rgba(10, 10, 10, 0.4)',
              border: '1px solid rgba(0, 255, 247, 0.1)',
            }}
          >
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <AnimatedInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <AnimatedInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <AnimatedButton
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                'Access War Room'
              )}
            </AnimatedButton>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center"
            >
              <button
                type="button"
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-300 underline decoration-transparent hover:decoration-cyan-400"
              >
                Forgot your password?
              </button>
            </motion.div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
            className="mt-8 text-center text-xs text-gray-500"
          >
            Protected by quantum-grade encryption
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
