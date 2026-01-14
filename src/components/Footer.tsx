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
                        <Link href="#" aria-label="Facebook"><Facebook size={24} /></Link>
                        <Link href="#" aria-label="Instagram"><Instagram size={24} /></Link>
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
                    <p className={styles.text}>Segunda - Sábado</p>
                    <p className={styles.text}>12:00 - 15:00</p>
                    <p className={styles.text}>19:00 - 22:30</p>
                </div>

                <div className={styles.column}>
                    <h3 className={styles.heading}>Localização</h3>
                    <div className={styles.mapWrapper}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3115.0977!2d-7.9097!3d38.5719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDM0JzE5LjMiTiA3wrA1NCczNC45Ilc!5e0!3m2!1spt-PT!2spt!4v1234567890"
                            width="100%"
                            height="150"
                            style={{ border: 0, borderRadius: '4px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Localização do Costeleta Dourada"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.legalLinks}>
                    <Link href="/terms">Termos e Condições</Link>
                    <Link href="/privacy">Política de Privacidade</Link>
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Costeleta Dourada. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}

