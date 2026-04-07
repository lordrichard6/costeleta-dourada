'use client';

import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        cleanup = () => {
          cancelAnimationFrame(rafId);
          lenis.destroy();
        };
      } catch {
        // Lenis not installed or failed to load — graceful degradation
        console.warn('Lenis smooth scroll not available, falling back to native scroll.');
      }
    };

    initLenis();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <MotionConfig
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}
