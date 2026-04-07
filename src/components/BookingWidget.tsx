'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import styles from './BookingWidget.module.css';

export default function BookingWidget() {
    const [step, setStep] = useState<'CHECK' | 'DETAILS' | 'CONFIRMED'>('CHECK');
    const [loading, setLoading] = useState(false);
    const [availability, setAvailability] = useState(0);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        phone: false
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user types
        if (errors[field as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: !formData.name.trim(),
            email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
            phone: !formData.phone.trim() || formData.phone.length < 9
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(Boolean);
    };

    // Simulation of availability check
    const checkAvailability = () => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setLoading(false);
            // Random availability between 60% and 90%
            setAvailability(Math.floor(Math.random() * (90 - 60 + 1)) + 60);
            setStep('DETAILS');
        }, 1500);
    };

    const confirmBooking = () => {
        if (!validateForm()) return;

        setLoading(true);
        setTimeout(() => {
            setAvailability(100);
            setLoading(false);
            setStep('CONFIRMED');
        }, 2000);
    };

    const resetBooking = () => {
        setStep('CHECK');
        setFormData({ name: '', email: '', phone: '' });
        setErrors({ name: false, email: false, phone: false });
    };

    return (
        <section id="book" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.info}>
                        <span className={styles.subtitle}>Reservas</span>
                        <h2 className={styles.title}>Garanta a Sua Mesa</h2>
                        <p className={styles.text}>
                            Devido à elevada procura, recomendamos que faça a sua reserva com antecedência.
                            Preencha os dados abaixo para verificar a disponibilidade.
                        </p>
                    </div>

                    <div className={styles.widget}>
                        {step !== 'CONFIRMED' ? (
                            <div className={styles.form}>
                                {/* Step 1: Booking Details */}
                                <div style={{ display: step === 'CHECK' ? 'block' : 'none' }}>
                                    <div className={styles.inputGroup}>
                                        <label>Data</label>
                                        <div className={styles.inputWrapper}>
                                            <Calendar className={styles.icon} size={18} />
                                            <input type="date" className={styles.input} />
                                        </div>
                                    </div>

                                    <div className={styles.row}>
                                        <div className={styles.inputGroup}>
                                            <label>Pessoas</label>
                                            <div className={styles.inputWrapper}>
                                                <Users className={styles.icon} size={18} />
                                                <select className={styles.input}>
                                                    {[2, 3, 4, 5, 6, 8, 10].map(n => <option key={n} value={n}>{n} Pessoas</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className={styles.inputGroup}>
                                            <label>Hora</label>
                                            <div className={styles.inputWrapper}>
                                                <Clock className={styles.icon} size={18} />
                                                <select className={styles.input}>
                                                    <option>12:00</option>
                                                    <option>13:00</option>
                                                    <option>14:00</option>
                                                    <option>19:00</option>
                                                    <option>20:00</option>
                                                    <option>21:00</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className={styles.checkButton}
                                        onClick={checkAvailability}
                                        disabled={loading}
                                    >
                                        {loading ? 'Verificando...' : 'Verificar Disponibilidade'}
                                    </button>
                                </div>

                                {/* Step 2: Contact Details */}
                                {step === 'DETAILS' && (
                                    <motion.div
                                        className={styles.detailsForm}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                    >
                                        <div className={styles.availabilityHeader}>
                                            <div className={styles.capacityLabel}>
                                                <span>Disponibilidade</span>
                                                <span className={styles.percent}>{availability}% livre</span>
                                            </div>
                                            <div className={styles.progressBarBg}>
                                                <motion.div
                                                    className={styles.progressBarFill}
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${availability}%` }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                />
                                            </div>
                                        </div>

                                        <h3 className={styles.formTitle}>Os seus dados</h3>

                                        <div className={styles.inputGroup}>
                                            <label>Nome Completo *</label>
                                            <input
                                                type="text"
                                                className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
                                                placeholder="Ex: João Silva"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                            />
                                            {errors.name && <span className={styles.errorMessage}>Nome obrigatório</span>}
                                        </div>

                                        <div className={styles.inputGroup}>
                                            <label>Email *</label>
                                            <input
                                                type="email"
                                                className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
                                                placeholder="Ex: joao@email.com"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                            />
                                            {errors.email && <span className={styles.errorMessage}>Email inválido</span>}
                                        </div>

                                        <div className={styles.inputGroup}>
                                            <label>Telemóvel *</label>
                                            <input
                                                type="tel"
                                                className={`${styles.input} ${errors.phone ? styles.errorInput : ''}`}
                                                placeholder="Ex: 912 345 678"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                            />
                                            {errors.phone && <span className={styles.errorMessage}>Contacto obrigatório</span>}
                                        </div>

                                        <div className={styles.actions}>
                                            <button
                                                className={styles.backButton}
                                                onClick={() => setStep('CHECK')}
                                            >
                                                Voltar
                                            </button>
                                            <button
                                                className={styles.bookButton}
                                                onClick={confirmBooking}
                                                disabled={loading}
                                            >
                                                {loading ? 'A Confirmar...' : 'Confirmar Reserva'}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <motion.div
                                className={styles.successMessage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className={styles.successIcon}>
                                    <CheckCircle size={64} />
                                </div>
                                <h3>Reserva Confirmada!</h3>
                                <p>Obrigado, {formData.name.split(' ')[0]}.</p>
                                <p>A sua reserva foi registada com sucesso.</p>
                                <button className={styles.resetButton} onClick={resetBooking}>
                                    Fazer outra reserva
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
