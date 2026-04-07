'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import styles from './Hero.module.css';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoX = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const textX = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !muted;
      videoRef.current.muted = next;
      setMuted(next);
    }
  };

  return (
    <section ref={sectionRef} className={styles.hero}>

      {/* Left panel — content */}
      <div className={styles.leftPanel}>
        {/* Grain texture on left panel */}
        <div className={styles.leftGrain} aria-hidden />

        {/* Logo watermark — decorative, behind text */}
        <div className={styles.logoWatermark} aria-hidden>
          <Image
            src="/images/costeleta-logo.webp"
            alt=""
            width={400}
            height={400}
            className={styles.logoWatermarkImg}
            priority
          />
        </div>

        <motion.div className={styles.leftInner} style={{ x: textX }}>
          {/* Decorative copper accent line */}
          <motion.div
            className={styles.accentLine}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />

          <motion.span className={styles.eyebrow} {...fadeUp(0.25)}>
            Évora, Alentejo — Desde 1985
          </motion.span>

          <h1 className={styles.title} aria-label="Costeleta Dourada">
            <SplitText text="Costeleta" className={styles.titleLine} delay={0.06} />
            <SplitText
              text="Dourada"
              className={`${styles.titleLine} ${styles.titleLineAccent}`}
              delay={0.06}
            />
          </h1>

          <motion.p className={styles.subtitle} {...fadeUp(0.65)}>
            Onde a tradição encontra a excelência
          </motion.p>

          <motion.div className={styles.actions} {...fadeUp(0.8)}>
            <Link href="/reservas" className={styles.primaryBtn}>
              Reservar Mesa →
            </Link>
            <Link href="/ementa" className={styles.secondaryBtn}>
              Ver Ementa
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className={styles.scrollDot} />
          <span className={styles.scrollLabel}>Scroll</span>
        </motion.div>
      </div>

      {/* Copper divider */}
      <motion.div
        className={styles.divider}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ transformOrigin: 'top' }}
      />

      {/* Right panel — video with parallax */}
      <div className={styles.rightPanel}>
        <motion.div className={styles.videoWrap} style={{ x: videoX }}>
          <video
            ref={videoRef}
            className={styles.heroVideo}
            src="/images/hero.mp4"
            autoPlay
            muted={muted}
            loop
            playsInline
          />
        </motion.div>

        {/* Dark gradient overlay on video */}
        <div className={styles.videoOverlay} aria-hidden />

        {/* Mute / unmute toggle */}
        <motion.button
          className={styles.muteBtn}
          onClick={toggleMute}
          aria-label={muted ? 'Ativar som' : 'Desativar som'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {muted ? (
            /* muted icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            /* sound-on icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </motion.button>
      </div>
    </section>
  );
}
