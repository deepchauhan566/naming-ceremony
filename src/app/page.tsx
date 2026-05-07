'use client';

import { useState, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/LoadingScreen';
import FallingPetals from '@/components/FallingPetals';
import MusicPlayer from '@/components/MusicPlayer';
import InvitationCard from '@/components/InvitationCard';

// Lazy load heavy components
const ParticleScene = lazy(() => import('@/components/ParticleScene'));

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="relative min-height-screen bg-soft-pink">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="content-overlay"
          >
            <div className="bg-orb orb-1" />
            <div className="bg-orb orb-2" />
            <div className="bg-orb orb-3" />

            {/* Background 3D Scene */}
            <div className="canvas-container">
              <Suspense fallback={null}>
                <ParticleScene />
              </Suspense>
            </div>

            {/* Falling Decoration */}
            <FallingPetals />

            {/* Background Music */}
            <MusicPlayer />

            <div className="relative z-10 py-12 md:py-20">
              <section className="hero-section">
                {/* Floating Elements */}
                <motion.div 
                  className="absolute top-10 left-10 text-4xl opacity-20 hidden md:block"
                  animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🎈
                </motion.div>
                <motion.div 
                  className="absolute top-20 right-10 text-4xl opacity-20 hidden md:block"
                  animate={{ y: [0, -20, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  🍼
                </motion.div>
                <motion.div 
                  className="absolute bottom-10 left-20 text-4xl opacity-20 hidden md:block"
                  animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  🧸
                </motion.div>

                <InvitationCard />
              </section>

              {/* Footer */}
              {/* <footer className="footer-section">
                <p className="text-elegant">© 2026 Chavhan Family • Crafted with love</p>
              </footer> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
