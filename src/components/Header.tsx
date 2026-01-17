'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoWrapper}>
                        <Image src="/images/costeleta-logo.webp" alt="Costeleta Dourada" width={55} height={55} className={styles.logoImg} />
                        <span>Costeleta Dourada</span>
                    </div>
                </Link>

                <nav className={styles.desktopNav}>
                    <a href="#menu">Ementa</a>
                    <a href="#about">Sobre</a>
                    <a href="#book" className={styles.ctaButton}>Reservar</a>
                </nav>

                <button
                    className={styles.mobileToggle}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className={styles.mobileNav}>
                    <a href="#menu" onClick={() => setIsMobileMenuOpen(false)}>Ementa</a>
                    <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>Sobre</a>
                    <a href="#book" onClick={() => setIsMobileMenuOpen(false)}>Reservar</a>
                </div>
            )}
        </header>
    );
}
