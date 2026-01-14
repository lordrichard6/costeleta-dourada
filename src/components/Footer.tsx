import Link from 'next/link';
import { Facebook, Instagram, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3 className={styles.heading}>Costeleta Dourada</h3>
                    <p className={styles.text}>Tradição Alentejana desde 1985.</p>
                    <div className={styles.socials}>
                        <Link href="#"><Facebook size={24} /></Link>
                        <Link href="#"><Instagram size={24} /></Link>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.heading}>Contactos</h3>
                    <div className={styles.contactItem}>
                        <Phone size={18} />
                        <span>+351 266 123 456</span>
                    </div>
                    <div className={styles.contactItem}>
                        <MapPin size={18} />
                        <span>Praça do Giraldo 5, Évora</span>
                    </div>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.heading}>Horário</h3>
                    <p className={styles.text}>Terça - Domingo</p>
                    <p className={styles.text}>12:00 - 15:00</p>
                    <p className={styles.text}>19:00 - 22:30</p>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Costeleta Dourada. Todos os direitos reservados.
            </div>
        </footer>
    );
}
