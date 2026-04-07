'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SplitText from '@/components/SplitText';
import styles from './sobre.module.css';

const values = [
  {
    number: '01',
    title: 'Ingredientes Locais',
    description:
      'Trabalhamos diretamente com produtores do Alentejo. O nosso porco preto vem de Barrancos, o borrego do campo de Évora, o azeite da família Sobral em Moura. A proximidade garante frescura e apoia a economia local.',
  },
  {
    number: '02',
    title: 'Receitas de Família',
    description:
      'A nossa carta é um arquivo vivo. Cada prato tem uma história — a açorda da avó Lurdes, o ensopado do tio Manuel, a sericaia que a bisavó trazia das festas da aldeia. Preservar estas receitas é o nosso dever.',
  },
  {
    number: '03',
    title: 'Hospitalidade Alentejana',
    description:
      'No Alentejo não se recebe pela metade. A mesa farta, o vinho a copo, o tempo para conversar — esta generosidade está inscrita na nossa forma de trabalhar. Cada cliente é família.',
  },
];

const team = [
  {
    name: 'Manuel Costa',
    role: 'Chef Executivo',
    description: '30 anos na cozinha. Filho dos fundadores, guardião das receitas originais.',
  },
  {
    name: 'Ana Ferreira',
    role: 'Sommelier',
    description: 'Especialista em vinhos alentejanos. Curadoria da nossa carta desde 2012.',
  },
  {
    name: 'João Alves',
    role: 'Chefe de Sala',
    description: '15 anos de hospitalidade. O rosto caloroso que o recebe todos os dias.',
  },
];

export default function SobrePage() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const histRef = useRef<HTMLElement>(null);
  const filosRef = useRef<HTMLElement>(null);
  const filosVideoRef = useRef<HTMLVideoElement>(null);
  const [filosMuted, setFilosMuted] = useState(true);
  const teamRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const histInView = useInView(histRef, { once: true, margin: '0px 0px -80px 0px' });
  const filosInView = useInView(filosRef, { once: true, margin: '0px 0px -80px 0px' });
  const teamInView = useInView(teamRef, { once: true, margin: '0px 0px -80px 0px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '0px 0px -60px 0px' });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%']);

  const { scrollYProgress: histScrollProgress } = useScroll({
    target: histRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(histScrollProgress, [0, 1], ['-6%', '6%']);

  const { scrollYProgress: filosScrollProgress } = useScroll({
    target: filosRef,
    offset: ['start end', 'end start'],
  });
  const filosVideoY = useTransform(filosScrollProgress, [0, 1], ['0%', '-12%']);
  const filosContentY = useTransform(filosScrollProgress, [0, 1], ['2%', '-4%']);

  const { scrollYProgress: teamScrollProgress } = useScroll({
    target: teamRef,
    offset: ['start end', 'end start'],
  });
  const teamY0 = useTransform(teamScrollProgress, [0, 1], ['0%', '-5%']);
  const teamY1 = useTransform(teamScrollProgress, [0, 1], ['-3%', '4%']);
  const teamY2 = useTransform(teamScrollProgress, [0, 1], ['0%', '-7%']);
  const teamCardYs = [teamY0, teamY1, teamY2];

  const toggleFilosMute = () => {
    if (filosVideoRef.current) {
      const next = !filosMuted;
      filosVideoRef.current.muted = next;
      setFilosMuted(next);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !muted;
      videoRef.current.muted = next;
      setMuted(next);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* 1. Hero quote */}
        <section ref={heroRef} className={styles.heroSection}>

          {/* Background video with parallax */}
          <motion.div className={styles.heroVideoWrap} style={{ y: videoY }}>
            <video
              ref={videoRef}
              className={styles.heroVideo}
              src="/images/restaurant.mp4"
              autoPlay
              muted={muted}
              loop
              playsInline
            />
          </motion.div>

          {/* Overlays */}
          <div className={styles.heroOverlay} aria-hidden />
          <div className={styles.heroGrain} aria-hidden />

          {/* Content */}
          <motion.div className={styles.heroInner} style={{ y: contentY }}>

            {/* Eyebrow */}
            <motion.span
              className={styles.heroEyebrow}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className={styles.heroEyebrowPrefix} aria-hidden>—</span>
              Sobre Nós
            </motion.span>

            {/* Top divider */}
            <motion.div
              className={styles.heroDivider}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'center' }}
            />

            {/* Quote */}
            <motion.blockquote
              className={styles.heroQuote}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, type: 'spring', stiffness: 80, damping: 20 }}
            >
              &ldquo;Cozinhamos com o coração.<br />Servimos com orgulho.&rdquo;
            </motion.blockquote>

            {/* Bottom divider */}
            <motion.div
              className={styles.heroDivider}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'center' }}
            />

            {/* Attribution */}
            <motion.p
              className={styles.heroAttribution}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <span className={styles.heroAttributionDash}>—</span>
              Família Costa, fundadores
            </motion.p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className={styles.heroScrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <div className={styles.scrollDot} />
            <span className={styles.scrollLabel}>Scroll</span>
          </motion.div>

          {/* Mute button */}
          <motion.button
            className={styles.heroMuteBtn}
            onClick={toggleMute}
            aria-label={muted ? 'Ativar som' : 'Desativar som'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
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

        {/* 2. História */}
        <section ref={histRef} className={styles.historiaSection}>
          <div className={styles.historiaContainer}>
            <motion.div
              className={styles.historiaText}
              initial={{ opacity: 0, x: -40 }}
              animate={histInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            >
              {/* Accent line */}
              <motion.div
                className={styles.historiaAccentLine}
                initial={{ scaleX: 0 }}
                animate={histInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: 'left' }}
              />

              <span className={styles.eyebrow}>Desde 1985</span>

              <h2 className={styles.historiaHeading}>
                {histInView && (
                  <SplitText text="Uma família, uma paixão." className={styles.splitHeading} delay={0.05} />
                )}
              </h2>

              <motion.p
                className={`${styles.bodyText} ${styles.historiaParagraphFirst}`}
                initial={{ opacity: 0, y: 16 }}
                animate={histInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Em 1985, António e Lurdes Costa abriram as portas do que era então uma
                tasca modesta na Rua dos Mercadores, em Évora. Não havia ambições de grandeza.
                Havia vontade de cozinhar bem e de acolher bem. Naqueles primeiros anos,
                a ementa cabia num quadro de ardósia. Hoje, os ingredientes são os mesmos.
              </motion.p>

              <motion.p
                className={styles.bodyText}
                initial={{ opacity: 0, y: 16 }}
                animate={histInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                Com o tempo, a reputação cresceu mais depressa do que as paredes. Passámos
                para o espaço actual — maior, mas com o mesmo espírito. O filho Manuel tomou
                conta da cozinha, preservando cada receita com o mesmo cuidado com que o pai
                as escreveu num caderno de capa verde que ainda hoje existe.
              </motion.p>

              <motion.p
                className={styles.bodyText}
                initial={{ opacity: 0, y: 16 }}
                animate={histInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Quarenta anos depois, a Costeleta Dourada é uma das casas mais reconhecidas
                do Alentejo. Não por acidente — mas porque nunca deixámos de acreditar que
                cozinha honesta, feita com ingredientes locais e servida com calor, é
                tudo o que um bom restaurante precisa de ser.
              </motion.p>
            </motion.div>

            <motion.div
              className={styles.historiaImage}
              initial={{ opacity: 0, x: 40 }}
              animate={histInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.1 }}
            >
              <div className={styles.historiaImgFrame}>
                <motion.div className={styles.historiaImgParallax} style={{ y: imageY }}>
                  <Image
                    src="/images/hero_bg.webp"
                    alt="O restaurante Costeleta Dourada"
                    fill
                    className={styles.historiaImg}
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. Filosofia */}
        <section ref={filosRef} className={styles.filosofiaSection}>

          {/* Background video with parallax */}
          <motion.div className={styles.filosofiaVideoWrap} style={{ y: filosVideoY }}>
            <video
              ref={filosVideoRef}
              className={styles.filosofiaVideo}
              src="/images/kitchen.mp4"
              autoPlay
              muted={filosMuted}
              loop
              playsInline
            />
          </motion.div>

          {/* Overlays */}
          <div className={styles.filosofiaOverlay} aria-hidden />
          <div className={styles.filosofiaGrain} aria-hidden />

          {/* Content */}
          <motion.div className={styles.filosofiaContainer} style={{ y: filosContentY }}>
            <motion.div
              className={styles.filosofiaHeader}
              initial={{ opacity: 0, y: 24 }}
              animate={filosInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={styles.filosofiaAccentLine}
                initial={{ scaleX: 0 }}
                animate={filosInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: 'left' }}
              />
              <span className={styles.eyebrow}>A Nossa Filosofia</span>
              <h2 className={styles.sectionHeading}>Três princípios, uma cozinha.</h2>
            </motion.div>
            <div className={styles.valuesGrid}>
              {values.map((value, index) => (
                <motion.div
                  key={value.number}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 32 }}
                  animate={filosInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                  transition={{ delay: index * 0.12, type: 'spring', stiffness: 90, damping: 20 }}
                  whileHover={{ y: -6 }}
                >
                  <span className={styles.valueNumber}>{value.number}</span>
                  <div className={styles.valueDivider} />
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDesc}>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mute button */}
          <motion.button
            className={styles.filosMuteBtn}
            onClick={toggleFilosMute}
            aria-label={filosMuted ? 'Ativar som' : 'Desativar som'}
            initial={{ opacity: 0 }}
            animate={filosInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {filosMuted ? (
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

        {/* 4. Equipa */}
        <section ref={teamRef} className={styles.teamSection}>
          <div className={styles.teamContainer}>
            <motion.div
              className={styles.teamHeader}
              initial={{ opacity: 0, y: 24 }}
              animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={styles.teamAccentLine}
                initial={{ scaleX: 0 }}
                animate={teamInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: 'left' }}
              />
              <span className={styles.eyebrow}>A Nossa Equipa</span>
              <h2 className={styles.sectionHeading}>
                {teamInView && (
                  <SplitText text="As pessoas por detrás do sabor." className={styles.splitHeading} delay={0.05} />
                )}
              </h2>
            </motion.div>
            <div className={styles.teamGrid}>
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  className={styles.teamCardParallax}
                  style={{ y: teamCardYs[index] }}
                >
                  <motion.div
                    className={styles.teamCard}
                    initial={{ opacity: 0, y: 32 }}
                    animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                    transition={{ delay: index * 0.12, type: 'spring', stiffness: 90, damping: 20 }}
                    whileHover={{ y: -6 }}
                  >
                    <div className={styles.teamAvatar}>
                      <span className={styles.teamInitial}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className={styles.teamName}>{member.name}</h3>
                    <span className={styles.teamRole}>{member.role}</span>
                    <div className={styles.teamRoleDivider} />
                    <p className={styles.teamDesc}>{member.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CTA */}
        <section ref={ctaRef} className={styles.ctaSection}>
          <div className={styles.ctaInner}>

            {/* Accent line — grows from centre to match centred layout */}
            <motion.div
              className={styles.ctaAccentLine}
              initial={{ scaleX: 0 }}
              animate={ctaInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: 'center' }}
            />

            {/* Eyebrow */}
            <motion.span
              className={styles.ctaEyebrow}
              initial={{ opacity: 0, y: 12 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className={styles.ctaEyebrowPrefix} aria-hidden>—</span>
              Uma visita inesquecível
            </motion.span>

            {/* Heading */}
            <motion.h2
              className={styles.ctaHeading}
              initial={{ opacity: 0, y: 24 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 80, damping: 20 }}
            >
              Venha Conhecer-nos
            </motion.h2>

            {/* Subtext */}
            <motion.p
              className={styles.ctaSub}
              initial={{ opacity: 0, y: 12 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              A mesa está posta. Só falta você.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className={styles.ctaBtnWrap}
              initial={{ opacity: 0, y: 16 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/reservas" className={styles.ctaBtn}>
                Reservar Mesa
                <svg
                  className={styles.ctaBtnArrow}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/ementa" className={styles.ctaSecondaryBtn}>
                Ver Ementa
              </Link>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
