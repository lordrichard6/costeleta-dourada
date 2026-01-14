import Link from 'next/link';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <div className={styles.logoWatermark}>
                <Image
                    src="/images/costeleta-logo.png"
                    alt=""
                    width={600}
                    height={600}
                    className={styles.watermarkImage}
                />
            </div>
            <div className={styles.content}>
                <span className={styles.subtitle}>Desde 1985</span>
                <h1 className={styles.title}>Costeleta Dourada</h1>
                <p className={styles.description}>
                    O sabor autêntico do Alentejo. <br />
                    Onde a tradição encontra a excelência.
                </p>
                <div className={styles.actions}>
                    <Link href="#book" className={styles.primaryBtn}>
                        Reservar Mesa
                    </Link>
                    <Link href="#menu" className={styles.secondaryBtn}>
                        Ver Menu
                    </Link>
                </div>
            </div>
        </section>
    );
}
