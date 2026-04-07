'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';
import SplitText from './SplitText';
import styles from './TestimonialsSection.module.css';

const AGGREGATE_SCORE = 4.9;
const AGGREGATE_COUNT = '200+';

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'João Silva',
    quote: 'Uma experiência incrível! A carne de porco à alentejana estava divinal, tal como a minha avó fazia.',
    stars: 5,
    source: 'Google',
  },
  {
    id: 't2',
    name: 'Maria Santos',
    quote: 'Ambiente acolhedor e comida de chorar por mais. O melhor restaurante de Évora para quem procura tradição.',
    stars: 5,
    source: 'Google',
  },
  {
    id: 't3',
    name: 'António Costa',
    quote: 'Serviço impecável e pratos generosos. O ensopado de borrego é obrigatório!',
    stars: 5,
    source: 'TripAdvisor',
  },
  {
    id: 't4',
    name: 'Sofia Martins',
    quote: 'A melhor Sericaia que já comi! Voltarei certamente com toda a família.',
    stars: 5,
    source: 'Google',
  },
  {
    id: 't5',
    name: 'Pedro Ferreira',
    quote: 'Vinhos excelentes e atendimento muito simpático. Recomendo vivamente.',
    stars: 5,
    source: 'TripAdvisor',
  },
  {
    id: 't6',
    name: 'Ana Rodrigues',
    quote: 'O espaço é lindo e a comida superou as expectativas. Adorámos os pãezinhos de entrada.',
    stars: 5,
    source: 'Google',
  },
];

// Alternating Y parallax rates per column
const parallaxRates: [string, string][] = [
  ['0%', '-5%'],
  ['2%', '-3%'],
  ['0%', '-6%'],
];

const SOURCE_COLORS: Record<string, string> = {
  Google: '#4285F4',
  TripAdvisor: '#34E0A1',
};

function StarIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function TestimonialCard({
  testimonial,
  index,
  isInView,
  scrollYProgress,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
  index: number;
  isInView: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const initial = testimonial.name.charAt(0).toUpperCase();
  const colIndex = index % 3;
  const isSecondRow = index >= 3;
  const sourceColor = SOURCE_COLORS[testimonial.source] ?? 'var(--accent)';

  const y = useTransform(scrollYProgress, [0, 1], parallaxRates[colIndex]);

  return (
    <motion.div
      className={`${styles.cardParallax} ${isSecondRow ? styles.cardRowOffset : ''}`}
      style={{ y }}
    >
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 36 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 80, damping: 20 }}
        whileHover={{ y: -6 }}
      >
        {/* Decorative giant left double quotation mark — actual Unicode char, not escape */}
        <span className={styles.quoteDecor} aria-hidden>{'\u201C'}</span>

        {/* Stars */}
        <div className={styles.stars} aria-label={`${testimonial.stars} de 5 estrelas`}>
          {Array.from({ length: testimonial.stars }).map((_, i) => (
            <span key={i} className={styles.star}>
              <StarIcon />
            </span>
          ))}
        </div>

        {/* Quote */}
        <blockquote className={styles.quote}>
          {testimonial.quote}
        </blockquote>

        {/* Footer: avatar + name + source pill */}
        <div className={styles.cardFooter}>
          <div className={styles.avatar} aria-hidden>
            {initial}
          </div>
          <div className={styles.attribution}>
            <span className={styles.authorName}>{testimonial.name}</span>
            <span className={styles.sourcePill}>
              <span
                className={styles.sourceDot}
                style={{ background: sourceColor }}
                aria-hidden
              />
              {testimonial.source}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Drive aggregate stars from the actual score
  const aggregateStarCount = Math.round(AGGREGATE_SCORE);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>

        {/* Split header */}
        <div className={styles.header}>
          <motion.div
            className={styles.headerLeft}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className={styles.accentLine}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'left' }}
            />

            <span className={styles.eyebrow}>
              <span className={styles.eyebrowPrefix} aria-hidden>—</span>
              O que dizem os nossos clientes
            </span>

            <h2 className={styles.heading}>
              <SplitText
                text="Experiências que ficam na memória"
                className={styles.headingText}
                delay={0.05}
              />
            </h2>
          </motion.div>

          {/* Aggregate review stats */}
          <motion.div
            className={styles.headerRight}
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className={styles.aggregateScore}>{AGGREGATE_SCORE.toFixed(1)}</div>
            <div className={styles.aggregateStars} aria-label={`${AGGREGATE_SCORE} de 5 estrelas`}>
              {Array.from({ length: aggregateStarCount }).map((_, i) => (
                <span key={i} className={styles.aggregateStar}>
                  <StarIcon size={15} />
                </span>
              ))}
            </div>
            <p className={styles.aggregateLabel}>Avaliação média</p>

            {/* Count badge */}
            <span className={styles.aggregateCountBadge}>
              {AGGREGATE_COUNT} avaliações
            </span>

            {/* Source pills */}
            <div className={styles.aggregateSources}>
              {Object.entries(SOURCE_COLORS).map(([src, color]) => (
                <motion.span
                  key={src}
                  className={styles.aggregateSourcePill}
                  whileHover={{ borderColor: color, scale: 1.03 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className={styles.sourceDot} style={{ background: color }} aria-hidden />
                  {src}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className={styles.grid}>
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isInView={isInView}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
