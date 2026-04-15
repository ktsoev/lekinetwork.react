import { useTranslation } from 'react-i18next';
import logoSrc from '../../assets/logo.png';
import styles from './Footer.module.css';

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <img src={logoSrc} alt="LEKI Networks" className={styles.logoImg} />
          <span className={styles.logoText}>LEKI NETWORKS</span>
        </div>
        <nav className={styles.links}>
          <a href="#" className={styles.link}>{t('common.footer.privacy')}</a>
          <a href="#" className={styles.link}>{t('common.footer.terms')}</a>
          <a href="mailto:leki@lekinetworks.ru" className={styles.link}>{t('common.footer.support')}</a>
        </nav>
        <p className={styles.copy}>© {new Date().getFullYear()} LEKI NETWORKS</p>
        <p className={styles.powered}>Powered by <a href="https://mintnetworks.ru" target="_blank" rel="noopener noreferrer" className={styles.poweredLink}>mintnetworks.ru</a></p>
      </div>
    </footer>
  );
}
