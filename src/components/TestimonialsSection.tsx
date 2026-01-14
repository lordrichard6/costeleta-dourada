'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './TestimonialsSection.module.css';

const TESTIMONIALS = [
    {
        name: 'João Silva',
        quote: 'Uma experiência incrível! A carne de porco à alentejana estava divinal, tal como a minha avó fazia.',
        stars: 5
    },
    {
        name: 'Maria Santos',
        quote: 'Ambiente acolhedor e comida de chorar por mais. O melhor restaurante de Évora para quem procura tradição.',
        stars: 5
    },
    {
        name: 'António Costa',
        quote: 'Serviço impecável e pratos generosos. O ensopado de borrego é obrigatório!',
        stars: 5
    },
    {
        name: 'Sofia Martins',
        quote: 'A melhor Sericaia que já comi! Voltarei certamente com toda a família.',
        stars: 5
    },
    {
        name: 'Pedro Ferreira',
        quote: 'Vinhos excelentes e atendimento muito simpático. Recomendo vivamente.',
        stars: 5
    },
    {
        name: 'Ana Rodrigues',
        quote: 'O espaço é lindo e a comida superou as expectativas. Adorámos os pzinhos de entrada.',
        stars: 5
    }
];

export default function TestimonialsSection() {
    // Duplicate the list to create the infinite loop effect
    const extendedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>O que dizem os nossos clientes</h2>

                <div className={styles.scroller}>
                    <motion.div
                        className={styles.innerScroller}
                        animate={{ x: "-50%" }}
                        initial={{ x: "0%" }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 40
                        }}
                    >
                        {extendedTestimonials.map((t, idx) => (
                            <div key={idx} className={styles.card}>
                                <div className={styles.stars}>
                                    {[...Array(t.stars)].map((_, i) => (
                                        <Star key={i} size={20} fill="#C6A45C" stroke="#C6A45C" />
                                    ))}
                                </div>
                                <p className={styles.quote}>"{t.quote}"</p>
                                <span className={styles.author}>— {t.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
