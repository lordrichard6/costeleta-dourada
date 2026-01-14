import Link from 'next/link';
import styles from '../terms/legal.module.css';

export const metadata = {
    title: 'Política de Privacidade | Costeleta Dourada',
    description: 'Política de privacidade e proteção de dados do Costeleta Dourada.',
};

export default function PrivacyPage() {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <Link href="/" className={styles.backLink}>← Voltar ao início</Link>

                <h1 className={styles.title}>Política de Privacidade</h1>
                <p className={styles.date}>Última atualização: Janeiro 2026</p>

                <section className={styles.section}>
                    <h2>1. Responsável pelo Tratamento</h2>
                    <p>
                        Costeleta Dourada, Lda. é o responsável pelo tratamento dos dados
                        pessoais recolhidos através deste website, em conformidade com o
                        Regulamento Geral sobre a Proteção de Dados (RGPD).
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Dados Recolhidos</h2>
                    <p>Recolhemos os seguintes dados pessoais:</p>
                    <ul>
                        <li>Nome completo (para reservas)</li>
                        <li>Endereço de email (para confirmações)</li>
                        <li>Número de telefone (para contacto)</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Finalidade do Tratamento</h2>
                    <p>Os dados são utilizados exclusivamente para:</p>
                    <ul>
                        <li>Gestão e confirmação de reservas</li>
                        <li>Contacto em caso de alterações</li>
                        <li>Envio de informações sobre o restaurante (com consentimento)</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>4. Cookies</h2>
                    <p>
                        Este website utiliza cookies essenciais para o seu funcionamento.
                        Pode configurar o seu navegador para recusar cookies, embora isso
                        possa afetar algumas funcionalidades.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>5. Direitos do Titular</h2>
                    <p>Tem o direito de:</p>
                    <ul>
                        <li>Aceder aos seus dados pessoais</li>
                        <li>Solicitar a retificação de dados incorretos</li>
                        <li>Solicitar a eliminação dos seus dados</li>
                        <li>Opor-se ao tratamento dos seus dados</li>
                        <li>Apresentar reclamação à CNPD</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>6. Retenção de Dados</h2>
                    <p>
                        Os dados pessoais são conservados apenas durante o período
                        necessário para as finalidades para as quais foram recolhidos,
                        ou conforme exigido por lei.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>7. Contacto</h2>
                    <p>
                        Para exercer os seus direitos ou esclarecer dúvidas sobre
                        esta política, contacte-nos através do telefone +351 266 123 456
                        ou visite-nos em Praça do Giraldo 5, Évora.
                    </p>
                </section>
            </div>
        </main>
    );
}
