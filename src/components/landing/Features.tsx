import { useTranslation } from 'react-i18next';
import { motion, type Variants } from 'framer-motion';
import { Container } from '../layout/Container';
import styles from './Features.module.css';

const featureKeys = ['vless', 'devices', 'instant'] as const;

const icons = [
  <svg key="vless" className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M24 4L8 10v14c0 10.5 7.2 19.5 16 22 8.8-2.5 16-11.5 16-22V10L24 4z" />
    <path d="M17 24l5 5 9-10" />
  </svg>,
  <svg key="devices" className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="6" width="40" height="28" rx="0" />
    <path d="M16 42h16M24 34v8" />
  </svg>,
  <svg key="instant" className={styles.icon} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="24" cy="24" r="20" />
    <path d="M24 12v12l8 4" strokeLinecap="round" />
  </svg>,
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function Features() {
  const { t } = useTranslation();

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.secLabel}>{t('landing.features.label', 'Возможности')}</div>
        <h2 className={styles.heading}>{t('landing.features.heading')}</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {featureKeys.map((key, i) => (
            <motion.div key={key} variants={itemVariants} className={styles.card}>
              <span className={styles.numLabel}>0{i + 1}</span>
              <div className={styles.iconWrap}>{icons[i]}</div>
              <h3 className={styles.featureTitle}>{t(`landing.features.${key}.title`)}</h3>
              <p className={styles.featureDesc}>{t(`landing.features.${key}.desc`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
