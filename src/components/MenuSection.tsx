'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MenuSection.module.css';

const DAILY_SPECIALS = [
    { day: 'Segunda', dish: 'Cozido de Grão', price: '12€', desc: 'Grão cozido com carne de porco, enchidos regionais, batata e abóbora.', image: '/images/cozido-de-grao.webp' },
    { day: 'Terça', dish: 'Sopa de Cação', price: '14€', desc: 'Sopa aromática de cação com coentros, alho, pão alentejano e azeite.', image: '/images/sopa-de-cacao.webp' },
    { day: 'Quarta', dish: 'Migas com Entrecosto', price: '15€', desc: 'As tradicionais migas de pão com entrecosto frito em banha e alho.', image: '/images/migas-com-entrecosto.webp' },
    { day: 'Quinta', dish: 'Ensopado de Borrego', price: '16€', desc: 'Estufado rico de borrego servido sobre fatias de pão caseiro.', image: '/images/ensopado-de-borrego.webp' },
    { day: 'Sexta', dish: 'Bacalhau Dourado', price: '15€', desc: 'Bacalhau desfiado com batata palha, ovos e salsa.', image: '/images/bacalhau-dourado.webp' },
    { day: 'Sábado', dish: 'Carne de Porco à Alentejana', price: '18€', desc: 'O ex-libris da casa: carne marinada, amêijoas e batata frita.', image: '/images/carne-de-porco-alentejana.webp' },
];

const MENU_ITEMS = [
    {
        category: 'Pratos Tradicionais',
        items: [
            { name: 'Açorda Alentejana', description: 'Sopa de pão com alho, coentros, azeite e ovo escalfado.', price: '10€' },
            { name: 'Migas com Entrecosto', description: 'Pão alentejano tradicional com entrecosto frito.', price: '16€' },
            { name: 'Sopa de Tomate', description: 'Com enchidos, ovo e pão frito.', price: '12€' },
            { name: 'Sopa de Beldroegas', description: 'Com ovo escalfado e queijo de cabra fresco.', price: '11€' },
            { name: 'Cabeça de Xara', description: 'Entrada fria tradicional servida com picles caseiros.', price: '9€' }
        ]
    },
    {
        category: 'Pratos de Peixe',
        items: [
            { name: 'Bacalhau Dourado', description: 'Bacalhau desfiado com batata palha e ovos.', price: '15€' },
            { name: 'Polvo à Lagareiro', description: 'Polvo assado no forno com batata a murro e muito azeite.', price: '22€' },
            { name: 'Robalo Grelhado', description: 'Peixe fresco da costa grelhado no carvão.', price: '18€' },
            { name: 'Cação de Coentrada', description: 'O clássico inconfundível com vinagre e coentros.', price: '16€' },
            { name: 'Filetes de Polvo', description: 'Com arroz de feijão malandrinho.', price: '20€' }
        ]
    },
    {
        category: 'Pratos de Carne',
        items: [
            { name: 'Carne de Porco à Alentejana', description: 'Cubos de carne de porco fritos com amêijoas e batata.', price: '18€' },
            { name: 'Secretos de Porco Preto', description: 'Grelhados no carvão com sal e orégãos.', price: '19€' },
            { name: 'Ensopado de Borrego', description: 'Borrego tenro estufado com pão e hortelã.', price: '19€' },
            { name: 'Plumas de Porco Preto', description: 'Grelhadas simples com flor de sal.', price: '18€' },
            { name: 'Borrego Assado no Forno', description: 'Lentamente assado com batatinha nova.', price: '21€' }
        ]
    },
    {
        category: 'Para Crianças',
        items: [
            { name: 'Bitoque da Pequenada', description: 'Bife fininho com ovo, batata frita e arroz.', price: '9€' },
            { name: 'Panadinhos de Frango', description: 'Peito de frango panado com arroz de cenoura.', price: '9€' },
            { name: 'Robalinho Grelhado', description: 'Filete de robalo sem espinhas com puré.', price: '10€' }
        ]
    },
    {
        category: 'Sobremesas',
        items: [
            { name: 'Sericaia com Ameixa', description: 'O doce conventual mais famoso do Alentejo.', price: '6€' },
            { name: 'Pão de Rala', description: 'Doce de amêndoa e gila.', price: '5€' },
            { name: 'Encharcada', description: 'Doce de ovos tradicional.', price: '5€' },
            { name: 'Toucinho do Céu', description: 'Doce de amêndoa muito rico e húmido.', price: '6€' },
            { name: 'Mousse de Chocolate', description: 'Receita da avó, feita com chocolate 70%.', price: '5€' }
        ]
    },
    {
        category: 'Vegan',
        items: [
            { name: 'Aviso', description: 'Não temos pratos veganos. Aqui só servimos boa comida alentejana.', price: '' }
        ]
    },
    {
        category: 'Vinhos',
        className: styles.wineHeader,
        items: [
            { name: 'Cartuxa Colheita', description: 'Évora - Tinto encorpado e elegante.', price: '25€' },
            { name: 'Esporão Reserva', description: 'Reguengos - Clássico alentejano, rico e complexo.', price: '28€' },
            { name: 'Borba Rótulo Cortiça', description: 'Borba - Frutado e macio.', price: '14€' },
            { name: 'Pêra Manca Branco', description: 'Évora - Um dos melhores brancos de Portugal.', price: '55€' },
            { name: 'Vinho da Casa (Jarro)', description: 'Produção local de Estremoz.', price: '8€' }
        ]
    }
];

export default function MenuSection() {
    const [selectedSpecial, setSelectedSpecial] = useState<typeof DAILY_SPECIALS[0] | null>(null);
    const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

    const toggleCategory = (idx: number) => {
        setExpandedCategory(expandedCategory === idx ? null : idx);
    };

    return (
        <section id="menu" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.subtitle}>A Nossa Ementa</span>
                    <h2 className={styles.title}>Sabores da Terra</h2>
                </div>

                {/* PRATO DO DIA SECTION */}
                <div className={styles.specialsSection}>
                    <h3 className={styles.specialsTitle}>Prato do Dia</h3>
                    <div className={styles.weekGrid}>
                        {DAILY_SPECIALS.map((special, idx) => (
                            <motion.button
                                key={idx}
                                className={styles.dayCard}
                                whileHover={{ scale: 1.05, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedSpecial(special)}
                            >
                                <div className={styles.dayLabel}>{special.day}</div>
                                <Calendar size={24} className={styles.dayIcon} />
                                <div className={styles.clickHint}>Ver Prato</div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* MODAL */}
                <AnimatePresence>
                    {selectedSpecial && (
                        <div className={styles.modalOverlay} onClick={() => setSelectedSpecial(null)}>
                            <motion.div
                                className={styles.modalContent}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className={styles.modalTextContent}>
                                    <button className={styles.closeBtn} onClick={() => setSelectedSpecial(null)}>
                                        <X size={24} />
                                    </button>
                                    <h3 className={styles.modalDay}>{selectedSpecial.day}</h3>
                                    <h4 className={styles.modalDish}>{selectedSpecial.dish}</h4>
                                    <div className={styles.modalSeparator}></div>
                                    <p className={styles.modalDesc}>{selectedSpecial.desc}</p>
                                    <div className={styles.modalPrice}>{selectedSpecial.price}</div>
                                </div>
                                {selectedSpecial.image && (
                                    <div className={styles.modalImageWrapper}>
                                        <Image src={selectedSpecial.image} alt={selectedSpecial.dish} width={400} height={300} className={styles.modalImg} />
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* MENU ACCORDIONS  */}
                <div className={styles.accordionContainer}>
                    {MENU_ITEMS.map((cat, idx) => (
                        <div key={idx} className={styles.accordionItem}>
                            <button
                                className={`${styles.accordionHeader} ${cat.className || ''} ${expandedCategory === idx ? styles.activeHeader : ''}`}
                                onClick={() => toggleCategory(idx)}
                            >
                                <span className={styles.accordionTitle}>{cat.category}</span>
                                <span className={styles.accordionIcon}>{expandedCategory === idx ? '−' : '+'}</span>
                            </button>

                            <AnimatePresence>
                                {expandedCategory === idx && (
                                    <motion.div
                                        className={styles.accordionContent}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={styles.itemsList}>
                                            {cat.items.map((item, i) => (
                                                <div key={i} className={styles.menuItem}>
                                                    <div className={styles.itemRow}>
                                                        <h4 className={styles.itemName}>{item.name}</h4>
                                                        <span className={styles.itemPrice}>{item.price}</span>
                                                    </div>
                                                    <p className={styles.itemDesc}>{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
