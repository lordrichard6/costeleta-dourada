'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import styles from './Footer.module.css';

// Static year — evaluated once at module load, same on server and client, no hydration mismatch
const CURRENT_YEAR = new Date().getFullYear();

const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Ementa', href: '/ementa' },
  { label: 'Reservas', href: '/reservas' },
];

const SCHEDULE = [
  { day: 'Segunda — Sábado', times: ['12:00 – 15:00', '19:00 – 22:30'] },
  { day: 'Domingo', times: ['Encerrado'] },
];

const COLS = ['contactos', 'horario', 'mapa'] as const;

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <footer ref={ref} className={styles.footer}>

      {/* Wordmark row */}
      <motion.div
        className={styles.wordmarkRow}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className={styles.wordmarkEyebrow}>Évora, Alentejo · Desde 1985</span>
        {/* Decorative wordmark — not a heading, semantically it's a brand flourish */}
        <p className={styles.wordmark}>Costeleta Dourada</p>
        <motion.div
          className={styles.wordmarkLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'center' }}
        />
      </motion.div>

      {/* Copper separator between wordmark and grid */}
      <div className={styles.sectionSep}>
        <motion.div
          className={styles.sectionSepLine}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* 3-column grid */}
      <div className={styles.grid}>

        {/* Col 1 — Contactos */}
        <motion.div
          className={styles.col}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.15 + 0 * 0.1, duration: 0.6 }}
        >
          <h3 className={styles.colHeading}>Contactos</h3>
          <ul className={styles.colList}>
            <li>
              <a href="tel:+351266123456" className={styles.colLink}>
                +351 266 123 456
              </a>
            </li>
            <li>
              <a
                href="https://maps.google.com/?q=Praça+do+Giraldo+5,+Évora"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.colLink}
              >
                Praça do Giraldo 5, Évora
              </a>
            </li>
            <li>
              <a href="mailto:reservas@costeletadourada.pt" className={styles.colLink}>
                reservas@costeletadourada.pt
              </a>
            </li>
          </ul>
          <div className={styles.socials}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Facebook"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* TripAdvisor — compass icon, universally understood as travel/review */}
            <a
              href="https://tripadvisor.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="TripAdvisor"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Col 2 — Horário */}
        <motion.div
          className={styles.col}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.15 + 1 * 0.1, duration: 0.6 }}
        >
          <h3 className={styles.colHeading}>Horário</h3>
          <ul className={styles.colList}>
            {SCHEDULE.map((item) => (
              <li key={item.day} className={styles.scheduleItem}>
                <span className={styles.scheduleDay}>{item.day}</span>
                <div className={styles.scheduleTimes}>
                  {item.times.map((t) => (
                    <span
                      key={t}
                      className={`${styles.scheduleTime} ${t === 'Encerrado' ? styles.closed : ''}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Col 3 — Encontre-nos */}
        <motion.div
          className={styles.col}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.15 + 2 * 0.1, duration: 0.6 }}
        >
          <h3 className={styles.colHeading}>Encontre-nos</h3>
          <div className={styles.mapWrap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.09!2d-7.9097!3d38.5719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1f28a77c8a1b8d%3A0x4c1e3d0c1c6b2e4f!2sPra%C3%A7a+do+Giraldo%2C+%C3%89vora!5e0!3m2!1spt!2spt!4v1700000000000"
              width="100%"
              height="180"
              style={{ border: 0, borderRadius: 'var(--radius)', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Costeleta Dourada — Praça do Giraldo, Évora"
            />
          </div>
        </motion.div>
      </div>

      {/* Divider — inner element carries the animation, not the padded wrapper */}
      <div className={styles.dividerWrap}>
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      {/* Bottom bar */}
      <motion.div
        className={styles.bottom}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <p className={styles.copyright}>
          &copy; {CURRENT_YEAR} Costeleta Dourada. Todos os direitos reservados.
        </p>

        <nav className={styles.bottomNav} aria-label="Rodapé">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.bottomNavLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.bottomRight}>
          <div className={styles.legalLinks}>
            <Link href="/terms" className={styles.legalLink}>Termos</Link>
            <Link href="/privacy" className={styles.legalLink}>Privacidade</Link>
          </div>
          <a
            href="https://lopes2tech.ch"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.credit}
          >
            Website por Lopes2Tech
          </a>
        </div>
      </motion.div>

    </footer>
  );
}
