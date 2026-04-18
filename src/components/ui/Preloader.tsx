import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

export function Preloader() {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.img
        src="/images/logo.png"
        alt="LEKI Networks"
        className={styles.logo}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity }}
      />
    </motion.div>
  );
}
