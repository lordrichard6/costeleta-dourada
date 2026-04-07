'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MENU_CATEGORIES, DAILY_SPECIALS } from '@/data/menu';
import styles from './ementa.module.css';

const TAB_CATEGORIES = [
  'Prato do Dia',
  'Pratos Tradicionais',
  'Pratos de Peixe',
  'Pratos de Carne',
  'Para Crianças',
  'Sobremesas',
  'Vinhos',
];

export default function EmentaPage() {
  const [activeTab, setActiveTab] = useState('Prato do Dia');
  const [openSpecial, setOpenSpecial] = useState<number | null>(null);

  const categoryData =
    activeTab === 'Prato do Dia'
      ? null
      : MENU_CATEGORIES.find((c) => c.category === activeTab);

  return (
    <>
      <Header />
      <main className={styles.page}>
        {/* Page hero */}
        <section className={styles.hero}>
          <span className={styles.heroEyebrow}>Sabores da Terra</span>
          <h1 className={styles.heroTitle}>A Nossa Ementa</h1>
          <div className={styles.heroLine} />
        </section>

        {/* Sticky tab bar */}
        <div className={styles.tabBarWrap}>
          <nav className={styles.tabBar} aria-label="Categorias de ementa">
            {TAB_CATEGORIES.map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    className={styles.tabIndicator}
                    layoutId="tab-indicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content area */}
        <section className={styles.content}>
          <div className={styles.container}>
            <AnimatePresence mode="wait">
              {activeTab === 'Prato do Dia' ? (
                <motion.div
                  key="prato-do-dia"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                >
                  <p className={styles.sectionIntro}>
                    Cada dia um prato diferente, preparado de fresco com ingredientes da época.
                  </p>
                  <div className={styles.specialsGrid}>
                    {DAILY_SPECIALS.map((special, index) => (
                      <div key={special.day} className={styles.specialCard}>
                        <div className={styles.specialHeader}>
                          <span className={styles.specialDay}>{special.day}</span>
                          <span className={styles.specialPrice}>{special.price}</span>
                        </div>
                        <h3 className={styles.specialDish}>{special.dish}</h3>
                        <p className={styles.specialDesc}>{special.desc}</p>
                        <button
                          className={styles.specialToggle}
                          onClick={() =>
                            setOpenSpecial(openSpecial === index ? null : index)
                          }
                        >
                          {openSpecial === index ? 'Fechar ▲' : 'Ver detalhes ▼'}
                        </button>
                        <AnimatePresence>
                          {openSpecial === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={styles.specialExpanded}
                            >
                              <p className={styles.specialExpandedText}>
                                Disponível ao almoço. Prato do dia inclui sopa, pão, e sobremesa ou café.
                                Sujeito a disponibilidade — recomendamos reservar com antecedência.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : activeTab === 'Vinhos' ? (
                <motion.div
                  key="vinhos"
                  id="vinhos"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                >
                  <p className={styles.sectionIntro}>
                    Uma seleção cuidada dos melhores produtores do Alentejo. Servimos a copo ou garrafa.
                  </p>
                  <div className={styles.wineList}>
                    {categoryData?.items.map((item, i) => (
                      <motion.div
                        key={item.name}
                        className={styles.wineCard}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className={styles.wineInfo}>
                          <h3 className={styles.wineName}>{item.name}</h3>
                          <p className={styles.wineDesc}>{item.description}</p>
                        </div>
                        {item.price && (
                          <span className={styles.winePrice}>{item.price}</span>
                        )}
                      </motion.div>
                    )) ??
                      MENU_CATEGORIES.find((c) => c.category === 'Vinhos')?.items.map(
                        (item, i) => (
                          <motion.div
                            key={item.name}
                            className={styles.wineCard}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                          >
                            <div className={styles.wineInfo}>
                              <h3 className={styles.wineName}>{item.name}</h3>
                              <p className={styles.wineDesc}>{item.description}</p>
                            </div>
                            {item.price && (
                              <span className={styles.winePrice}>{item.price}</span>
                            )}
                          </motion.div>
                        )
                      )}
                  </div>
                </motion.div>
              ) : categoryData ? (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                >
                  <div className={styles.menuList}>
                    {categoryData.items.map((item, i) => (
                      <motion.div
                        key={item.name}
                        className={styles.menuItem}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                      >
                        <div className={styles.menuItemLeft}>
                          <h3 className={styles.menuItemName}>{item.name}</h3>
                          <p className={styles.menuItemDesc}>{item.description}</p>
                        </div>
                        {item.price && (
                          <span className={styles.menuItemPrice}>{item.price}</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
