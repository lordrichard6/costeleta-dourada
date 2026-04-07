'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './StatsStrip.module.css';

const stats = [
  { value: 40,   suffix: '',  separator: '',  label: 'Anos de História' },
  { value: 6,    suffix: '',  separator: '',  label: 'Pratos do Dia' },
  { value: 100,  suffix: '+', separator: '',  label: 'Lugares' },
  { value: 3000, suffix: '+', separator: '.', label: 'Refeições por Ano' },
];

function useCountUp(target: number, isInView: boolean, duration = 1.8) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, duration]);

  return count;
}

function formatNumber(n: number, separator: string): string {
  if (!separator) return String(n);
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

function StatItem({
  stat,
  index,
  isInView,
}: {
  stat: (typeof stats)[0];
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.value, isInView, 1.6 + index * 0.15);
  const display = `${formatNumber(count, stat.separator)}${stat.suffix}`;

  return (
    <motion.div
      className={styles.statItem}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 90, damping: 18 }}
      whileHover={{ y: -4 }}
    >
      {/* Decorative ornament */}
      <motion.span
        className={styles.icon}
        aria-hidden
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ delay: index * 0.12 + 0.2, duration: 0.4 }}
      >
        ✦
      </motion.span>

      <span className={styles.number}>{display}</span>
      <span className={styles.label}>{stat.label}</span>

      {/* Animated vertical divider — grows from centre */}
      {index < stats.length - 1 && (
        <motion.div
          className={styles.divider}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ delay: index * 0.12 + 0.5, duration: 0.5, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />
      )}
    </motion.div>
  );
}

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <div ref={ref} className={styles.strip}>
      {stats.map((stat, index) => (
        <StatItem key={stat.label} stat={stat} index={index} isInView={isInView} />
      ))}
    </div>
  );
}
