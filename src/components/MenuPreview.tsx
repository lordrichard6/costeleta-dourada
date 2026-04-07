'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion';
import SplitText from './SplitText';
import styles from './MenuPreview.module.css';

const featuredDishes = [
  {
    name: 'Carne de Porco à Alentejana',
    description: 'O ex-libris da casa: carne marinada com amêijoas e batata frita, perfumada com coentros frescos.',
    price: '18€',
    image: '/images/carne-de-porco-alentejana.webp',
    badge: 'Prato do Dia',
  },
  {
    name: 'Bacalhau Dourado',
    description: 'Bacalhau desfiado com batata palha crocante e ovos, salsa fresca e fio de azeite virgem.',
    price: '15€',
    image: '/images/bacalhau-dourado.webp',
    badge: null,
  },
  {
    name: 'Ensopado de Borrego',
    description: 'Borrego tenro estufado lentamente com hortelã e vinho branco, servido sobre pão caseiro.',
    price: '16€',
    image: '/images/ensopado-de-borrego.webp',
    badge: null,
  },
];

// X-axis parallax rates — left card drifts left, middle stays, right drifts right
const parallaxRates: [string, string][] = [
  ['-3%', '2%'],
  ['-1%', '1%'],
  ['3%', '-2%'],
];

function DishCard({
  dish,
  index,
  isInView,
  scrollYProgress,
}: {
  dish: (typeof featuredDishes)[0];
  index: number;
  isInView: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  // Derive X transform from the shared scrollYProgress — no extra scroll listeners
  const x = useTransform(scrollYProgress, [0, 1], parallaxRates[index]);

  return (
    // Outer div: parallax on X
    <motion.div
      className={`${styles.dishCardParallax} ${index === 1 ? styles.dishCardOffset : ''}`}
      style={{ x }}
    >
      {/* Inner div: entrance animation + hover lift — completely separate from parallax */}
      <motion.div
        className={styles.dishCard}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: index * 0.12 + 0.15, type: 'spring', stiffness: 80, damping: 20 }}
        whileHover={{ y: -6 }}
      >
        {/* Photo */}
        <div className={styles.dishImageWrap}>
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className={styles.img}
            sizes="(max-width: 640px) 100vw, 33vw"
          />

          {/* Copper gradient + hover micro-copy */}
          <div className={styles.imageOverlay} aria-hidden />
          <span className={styles.hoverCta} aria-hidden>Ver mais →</span>

          {/* Badge */}
          {dish.badge && (
            <span className={styles.badge}>{dish.badge}</span>
          )}
        </div>

        {/* Content */}
        <div className={styles.dishContent}>
          <h3 className={styles.dishName}>{dish.name}</h3>
          <p className={styles.dishDesc}>{dish.description}</p>
          <div className={styles.dishFooter}>
            <div className={styles.footerLine} aria-hidden />
            <span className={styles.dishPrice}>{dish.price}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MenuPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });

  // Single scroll listener shared across all cards
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

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
            <span className={styles.sectionNumber} aria-hidden="true">02</span>

            <motion.div
              className={styles.accentLine}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'left' }}
            />

            <span className={styles.eyebrow}>
              <span className={styles.eyebrowPrefix} aria-hidden>—</span>
              A Nossa Ementa
            </span>

            <h2 className={styles.heading}>
              <SplitText
                text="Sabores da Terra Alentejana"
                className={styles.headingText}
                delay={0.05}
              />
            </h2>
          </motion.div>

          <motion.p
            className={styles.headerBody}
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Cozinha tradicional alentejana preparada com ingredientes da nossa terra.
            Cada prato carrega quarenta anos de receitas transmitidas de geração em geração.
          </motion.p>
        </div>

        {/* Dish cards grid */}
        <div className={styles.dishes}>
          {featuredDishes.map((dish, index) => (
            <DishCard
              key={dish.name}
              dish={dish}
              index={index}
              isInView={isInView}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Full-width CTA strip */}
        <motion.div
          className={styles.ctaStrip}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link href="/ementa" className={styles.ctaInner}>
            <motion.span
              className={styles.ctaLabel}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
            >
              Ver Ementa Completa
            </motion.span>
            <motion.span
              className={styles.ctaDivider}
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.9, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.span
              className={styles.ctaArrow}
              initial={{ opacity: 0, x: -8 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
