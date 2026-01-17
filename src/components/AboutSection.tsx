'use client';

import Image from 'next/image';
import styles from './AboutSection.module.css';

export default function AboutSection() {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.container}>
                {/* Left Side: Logo with Glow */}
                <div className={styles.imageWrapper}>
                    <div className={styles.glow}></div>
                    <Image
                        src="/images/costeleta-logo.webp"
                        alt="Costeleta Dourada Logo"
                        width={380}
                        height={380}
                        className={styles.logo}
                    />
                </div>

                {/* Right Side: Text */}
                <div className={styles.textContent}>
                    <h2 className={styles.title}>A Nossa História</h2>
                    <p className={styles.description}>
                        O Costeleta Dourada nasceu do amor pela terra e pelos sabores autênticos do Alentejo.
                        Situado no coração de Évora, oferecemos uma experiência gastronómica que honra as receitas
                        dos nossos avós, preparadas com os melhores ingredientes locais. O nosso ambiente rústico
                        e acolhedor é o cenário perfeito para desfrutar da verdadeira hospitalidade alentejana.
                    </p>
                </div>
            </div>
        </section>
    );
}
