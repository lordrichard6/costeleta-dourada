import Link from 'next/link';
import styles from './legal.module.css';

export const metadata = {
    title: 'Termos e Condições | Costeleta Dourada',
    description: 'Termos e condições de utilização do website Costeleta Dourada.',
};

export default function TermsPage() {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <Link href="/" className={styles.backLink}>← Voltar ao início</Link>

                <h1 className={styles.title}>Termos e Condições</h1>
                <p className={styles.date}>Última atualização: Janeiro 2026</p>

                <section className={styles.section}>
                    <h2>1. Informações Gerais</h2>
                    <p>
                        O presente website é propriedade e operado por Costeleta Dourada, Lda.,
                        com sede em Praça do Giraldo 5, 7000-508 Évora, Portugal,
                        com o NIF 123456789.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Aceitação dos Termos</h2>
                    <p>
                        Ao aceder e utilizar este website, o utilizador aceita ficar vinculado
                        aos presentes Termos e Condições, bem como a todas as leis e regulamentos
                        aplicáveis.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>3. Reservas</h2>
                    <p>
                        As reservas efetuadas através deste website estão sujeitas a confirmação.
                        O restaurante reserva-se o direito de cancelar reservas em caso de
                        não comparência após 15 minutos da hora marcada.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>4. Propriedade Intelectual</h2>
                    <p>
                        Todo o conteúdo deste website, incluindo textos, imagens, logótipos e
                        design, é propriedade exclusiva de Costeleta Dourada e está protegido
                        por direitos de autor.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>5. Limitação de Responsabilidade</h2>
                    <p>
                        O Costeleta Dourada não se responsabiliza por quaisquer danos diretos
                        ou indiretos resultantes da utilização ou incapacidade de utilização
                        deste website.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>6. Lei Aplicável</h2>
                    <p>
                        Estes Termos e Condições são regidos pela lei portuguesa.
                        Qualquer litígio será submetido à jurisdição exclusiva dos
                        tribunais portugueses.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>7. Contacto</h2>
                    <p>
                        Para questões relacionadas com estes termos, contacte-nos através do
                        telefone +351 266 123 456 ou visite-nos em Praça do Giraldo 5, Évora.
                    </p>
                </section>
            </div>
        </main>
    );
}
