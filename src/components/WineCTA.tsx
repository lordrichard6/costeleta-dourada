'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './WineCTA.module.css';

const wineNames = ['Cartuxa', 'Esporão', 'Pêra Manca', 'Borba'];

export default function WineCTA() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !muted;
      videoRef.current.muted = next;
      setMuted(next);
    }
  };

  return (
    <section ref={ref} className={styles.section}>

      {/* Background video with parallax */}
      <motion.div className={styles.videoWrap} style={{ y: videoY }}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/images/wine.mp4"
          autoPlay
          muted={muted}
          loop
          playsInline
        />
      </motion.div>

      {/* Layered overlays */}
      <div className={styles.overlay} aria-hidden />
      <div className={styles.grain} aria-hidden />

      {/* Content */}
      <div className={styles.inner}>

        {/* Top decorative line */}
        <motion.div
          className={styles.decorLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Wine names with ornaments */}
        <motion.p
          className={styles.wineNames}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {wineNames.map((name, i) => (
            <span key={name}>
              <span className={styles.ornament} aria-hidden>✦</span>
              <span className={styles.wineName}>{name}</span>
              {i === wineNames.length - 1 && (
                <span className={styles.ornament} aria-hidden>✦</span>
              )}
            </span>
          ))}
        </motion.p>

        {/* Heading */}
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 80, damping: 20 }}
        >
          Os melhores vinhos<br />do Alentejo, a copo
        </motion.h2>

        {/* Bottom decorative line */}
        <motion.div
          className={styles.decorLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'center' }}
        />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <Link href="/ementa#vinhos" className={styles.cta}>
            Ver Carta de Vinhos →
          </Link>
        </motion.div>

      </div>

      {/* Mute / unmute toggle */}
      <motion.button
        className={styles.muteBtn}
        onClick={toggleMute}
        aria-label={muted ? 'Ativar som' : 'Desativar som'}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {muted ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
      </motion.button>

    </section>
  );
}
