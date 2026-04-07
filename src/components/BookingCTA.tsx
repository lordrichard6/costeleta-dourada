'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import styles from './BookingCTA.module.css';

const HOURS = [
  { days: 'Seg – Sáb', times: '12h – 15h · 19h – 22h30' },
  { days: 'Domingo', times: 'Encerrado' },
];

export default function BookingCTA() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  // Subtle upward drift on the content as you scroll through
  const contentY = useTransform(scrollYProgress, [0, 1], ['2%', '-4%']);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !muted;
      videoRef.current.muted = next;
      setMuted(next);
    }
  };

  return (
    <section ref={ref} className={styles.section}>

      {/* Background video with parallax — symmetric inset on all sides */}
      <motion.div className={styles.videoWrap} style={{ y: videoY }}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/images/restaurant.mp4"
          autoPlay
          muted={muted}
          loop
          playsInline
        />
      </motion.div>

      {/* Overlays */}
      <div className={styles.overlay} aria-hidden />
      <div className={styles.grain} aria-hidden />

      {/* Ghost section number — z-index below grain */}
      <span className={styles.sectionNumber} aria-hidden>04</span>

      {/* Content with subtle scroll parallax */}
      <motion.div className={styles.container} style={{ y: contentY }}>

        {/* Copper accent line — grows from left, consistent with all sections */}
        <motion.div
          className={styles.accentLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'left' }}
        />

        <motion.span
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <span className={styles.eyebrowPrefix} aria-hidden>—</span>
          Faça a sua reserva
        </motion.span>

        {/* Heading waits for section to enter view */}
        {isInView && (
          <h2 className={styles.heading}>
            <SplitText
              text="A Sua Mesa Espera por Si"
              className={styles.headingText}
              delay={0.05}
            />
          </h2>
        )}

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          Reservas com confirmação imediata. Aberto de segunda a sábado.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className={styles.ctaWrap}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.45 }}
        >
          <Link href="/reservas" className={styles.primaryBtn}>
            Reservar Mesa →
          </Link>
          <Link href="/ementa" className={styles.secondaryBtn}>
            Ver Ementa
          </Link>
        </motion.div>

        {/* Phone */}
        <motion.p
          className={styles.contact}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          Ou ligue:{' '}
          <a href="tel:+351266123456" className={styles.phone}>
            +351 266 123 456
          </a>
        </motion.p>

        {/* Opening hours strip — animated entrance */}
        <motion.div
          className={styles.hours}
          initial={{ opacity: 0, scaleX: 0.92, y: 10 }}
          animate={isInView ? { opacity: 1, scaleX: 1, y: 0 } : { opacity: 0, scaleX: 0.92, y: 10 }}
          transition={{ delay: 0.7, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'center' }}
        >
          {HOURS.map((h) => (
            <div key={h.days} className={styles.hoursRow}>
              <span className={styles.hoursDays}>{h.days}</span>
              <span className={styles.hoursDot} aria-hidden />
              <span className={styles.hoursTimes}>{h.times}</span>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* Mute button */}
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
