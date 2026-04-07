'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import styles from './reservas.module.css';

// ── Types ──────────────────────────────────────────────────────────

interface FormData {
  date: string;
  partySize: number | null;
  time: string;
  occasion: string;
  allergies: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

const INITIAL_FORM: FormData = {
  date: '',
  partySize: null,
  time: '',
  occasion: '',
  allergies: '',
  notes: '',
  name: '',
  email: '',
  phone: '',
  privacyConsent: false,
  marketingConsent: false,
};

const TIME_SLOTS = ['12:00', '13:00', '14:00', '19:00', '20:00', '21:00'];
const OCCASIONS = [
  'Aniversário',
  'Encontro Romântico',
  'Celebração em Família',
  'Sem Ocasião Especial',
];
const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// ── Step variants ──────────────────────────────────────────────────

function getVariants(direction: 1 | -1) {
  return {
    enter: { opacity: 0, x: direction * 60 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction * -60 },
  };
}

// ── Booking ref generator ──────────────────────────────────────────

function generateRef() {
  return 'CD-' + Math.floor(1000 + Math.random() * 9000);
}

// ── Component ─────────────────────────────────────────────────────

export default function ReservasPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [bookingRef] = useState(generateRef);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const update = (key: keyof FormData, value: string | number | boolean | null) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const goTo = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.date) newErrors.date = 'Por favor escolha uma data.';
    if (!form.partySize) newErrors.partySize = 'Por favor indique o número de pessoas.';
    if (!form.time) newErrors.time = 'Por favor escolha um horário.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) newErrors.name = 'Por favor indique o seu nome.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'Por favor indique um email válido.';
    if (!form.phone.trim()) newErrors.phone = 'Por favor indique o seu telefone.';
    if (!form.privacyConsent)
      newErrors.privacyConsent = 'É necessário aceitar a política de privacidade.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 3 && !validateStep3()) return;
    goTo(step + 1);
  };

  const today = new Date().toISOString().split('T')[0];

  const variants = getVariants(direction);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.backdrop} />

        <div className={styles.card}>
          {/* Progress bar */}
          <div className={styles.progress}>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={styles.progressStep}>
                <div
                  className={`${styles.progressDot} ${
                    step > s
                      ? styles.progressDotDone
                      : step === s
                      ? styles.progressDotActive
                      : ''
                  }`}
                >
                  {step > s ? '✓' : s}
                </div>
                {s < 4 && (
                  <div
                    className={`${styles.progressLine} ${step > s ? styles.progressLineDone : ''}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Steps */}
          <div className={styles.stepWrap}>
            <AnimatePresence mode="wait" custom={direction}>
              {/* Step 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  className={styles.step}
                >
                  <h2 className={styles.stepTitle}>Quando quer vir?</h2>
                  <p className={styles.stepSub}>
                    Escolha a data, o número de pessoas e o horário.
                  </p>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="date">
                      Data
                    </label>
                    <input
                      id="date"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                      className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                    />
                    {errors.date && <span className={styles.error}>{errors.date}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Número de pessoas</label>
                    <div className={styles.chipGrid}>
                      {PARTY_SIZES.map((n) => (
                        <button
                          key={n}
                          type="button"
                          className={`${styles.chip} ${form.partySize === n ? styles.chipActive : ''}`}
                          onClick={() => update('partySize', n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    {errors.partySize && (
                      <span className={styles.error}>{errors.partySize}</span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Horário</label>
                    <div className={styles.chipRow}>
                      {TIME_SLOTS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={`${styles.chip} ${form.time === t ? styles.chipActive : ''}`}
                          onClick={() => update('time', t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    {errors.time && <span className={styles.error}>{errors.time}</span>}
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  className={styles.step}
                >
                  <h2 className={styles.stepTitle}>Algum pedido especial?</h2>
                  <p className={styles.stepSub}>Tudo opcional — pode avançar sem preencher.</p>

                  <div className={styles.field}>
                    <label className={styles.label}>Ocasião</label>
                    <div className={styles.occasionGrid}>
                      {OCCASIONS.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          className={`${styles.chip} ${form.occasion === occ ? styles.chipActive : ''}`}
                          onClick={() =>
                            update('occasion', form.occasion === occ ? '' : occ)
                          }
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="allergies">
                      Alergias ou intolerâncias alimentares
                    </label>
                    <textarea
                      id="allergies"
                      className={styles.textarea}
                      placeholder="Ex: intolerância ao glúten, alergia a frutos secos…"
                      rows={3}
                      value={form.allergies}
                      onChange={(e) => update('allergies', e.target.value)}
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="notes">
                      Mais alguma informação para a equipa?
                    </label>
                    <textarea
                      id="notes"
                      className={styles.textarea}
                      placeholder="Qualquer pedido adicional que queira partilhar…"
                      rows={3}
                      value={form.notes}
                      onChange={(e) => update('notes', e.target.value)}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  className={styles.step}
                >
                  <h2 className={styles.stepTitle}>Os seus dados</h2>
                  <p className={styles.stepSub}>
                    Para confirmarmos a sua reserva por contacto directo.
                  </p>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">
                      Nome completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder="João Silva"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                    />
                    {errors.name && <span className={styles.error}>{errors.name}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="joao@email.com"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="phone">
                      Telefone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                      placeholder="+351 912 345 678"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                  </div>

                  <div className={styles.checkboxGroup}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={form.privacyConsent}
                        onChange={(e) => update('privacyConsent', e.target.checked)}
                      />
                      <span>
                        Aceito a{' '}
                        <Link href="/privacy" className={styles.privacyLink}>
                          política de privacidade
                        </Link>
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <span className={styles.error}>{errors.privacyConsent}</span>
                    )}

                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={form.marketingConsent}
                        onChange={(e) => update('marketingConsent', e.target.checked)}
                      />
                      <span>Aceito receber comunicações sobre novidades e promoções</span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 4 — Confirmation */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                  className={styles.step}
                >
                  <motion.div
                    className={styles.checkCircle}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                  >
                    ✓
                  </motion.div>

                  <h2 className={styles.stepTitle}>Reserva Confirmada</h2>
                  <p className={styles.stepSub}>
                    A sua reserva foi registada. Entraremos em contacto brevemente.
                  </p>

                  <div className={styles.summaryCard}>
                    <div className={styles.refRow}>
                      <span className={styles.refLabel}>Referência</span>
                      <span className={styles.refValue}>{bookingRef}</span>
                    </div>
                    <div className={styles.summaryDivider} />
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Data</span>
                      <span className={styles.summaryValue}>
                        {form.date
                          ? new Date(form.date + 'T12:00:00').toLocaleDateString('pt-PT', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : '—'}
                      </span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Horário</span>
                      <span className={styles.summaryValue}>{form.time}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Pessoas</span>
                      <span className={styles.summaryValue}>{form.partySize}</span>
                    </div>
                    {form.occasion && (
                      <div className={styles.summaryRow}>
                        <span className={styles.summaryLabel}>Ocasião</span>
                        <span className={styles.summaryValue}>{form.occasion}</span>
                      </div>
                    )}
                    <div className={styles.summaryRow}>
                      <span className={styles.summaryLabel}>Nome</span>
                      <span className={styles.summaryValue}>{form.name}</span>
                    </div>
                  </div>

                  <Link href="/" className={styles.backHomeBtn}>
                    Voltar à Página Principal
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          {step < 4 && (
            <div className={styles.navButtons}>
              {step > 1 && (
                <button className={styles.backBtn} onClick={() => goTo(step - 1)}>
                  ← Voltar
                </button>
              )}
              <button
                className={styles.nextBtn}
                onClick={handleNext}
              >
                {step === 3 ? 'Confirmar Reserva' : 'Continuar →'}
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
