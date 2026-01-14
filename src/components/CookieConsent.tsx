'use client';

import { useState, useEffect } from 'react';
import styles from './CookieConsent.module.css';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.banner}>
            <div className={styles.content}>
                <p className={styles.text}>
                    Utilizamos cookies para melhorar a sua experiência no nosso site.
                    Ao continuar a navegar, concorda com a nossa{' '}
                    <a href="/privacy" className={styles.link}>Política de Privacidade</a>.
                </p>
                <div className={styles.buttons}>
                    <button className={styles.decline} onClick={declineCookies}>
                        Recusar
                    </button>
                    <button className={styles.accept} onClick={acceptCookies}>
                        Aceitar
                    </button>
                </div>
            </div>
        </div>
    );
}
