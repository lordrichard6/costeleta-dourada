'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import SplitText from './SplitText';
import styles from './AboutTeaser.module.css';

export default function AboutTeaser() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });

  // Scroll parallax on the image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageX = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>

        {/* Image panel (left) */}
        <motion.div
          className={styles.imagePanel}
          initial={{ opacity: 0, x: -48 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -48 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
        >
          <motion.div className={styles.imageParallax} style={{ x: imageX }}>
            <div className={styles.imageFrame}>
              {/* Decorative corner accents */}
              <span className={`${styles.corner} ${styles.cornerTL}`} aria-hidden />
              <span className={`${styles.corner} ${styles.cornerTR}`} aria-hidden />
              <span className={`${styles.corner} ${styles.cornerBL}`} aria-hidden />
              <span className={`${styles.corner} ${styles.cornerBR}`} aria-hidden />

              <div className={styles.imageInner}>
                <Image
                  src="/images/hero_bg.webp"
                  alt="Interior do restaurante Costeleta Dourada, Évora"
                  width={800}
                  height={960}
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </motion.div>
          <span className={styles.sectionNumber} aria-hidden="true">01</span>
        </motion.div>

        {/* Text panel (right) */}
        <motion.div
          className={styles.textPanel}
          initial={{ opacity: 0, x: 48 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 48 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
        >
          {/* Copper accent line */}
          <motion.div
            className={styles.accentLine}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ transformOrigin: 'left' }}
          />

          <span className={styles.eyebrow}>
            <span className={styles.eyebrowPrefix} aria-hidden>—</span>
            A Nossa História
          </span>

          <h2 className={styles.heading}>
            <SplitText
              text="Quarenta anos de tradição alentejana"
              className={styles.headingText}
              delay={0.04}
            />
          </h2>

          <p className={styles.body}>
            Nascemos em 1985 numa rua tranquila de Évora, com uma missão simples: cozinhar
            como se faz em casa. A família Costa trouxe as receitas da avó, os ingredientes
            da terra e a hospitalidade que só o Alentejo sabe dar.
          </p>

          {/* Pull quote */}
          <blockquote className={styles.pullQuote}>
            "Cozinhamos com o coração. Servimos com orgulho."
          </blockquote>

          <p className={styles.body}>
            Ao longo de quatro décadas, a Costeleta Dourada tornou-se uma referência
            incontornável da cozinha regional. Servimos porco preto do Alentejo, borrego
            criado na nossa terra, e vinhos das melhores adegas da região — com o mesmo
            orgulho com que sempre o fizemos.
          </p>

          <Link href="/sobre" className={styles.link}>
            <span>Conhecer a Nossa História</span>
            <span className={styles.linkArrow}> →</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
