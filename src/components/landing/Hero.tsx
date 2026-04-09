import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Container } from '../layout/Container';
import styles from './Hero.module.css';

const tickWidths = [220, 160, 100, 60, 30, 60, 100, 160, 220];

export function Hero() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const target = isAuthenticated ? '/dashboard' : '/auth/login';

  return (
    <section className={styles.hero}>
      <div className={styles.cornerTL} aria-hidden />
      <div className={styles.cornerBR} aria-hidden />
      <div className={styles.ticks} aria-hidden>
        {tickWidths.map((w, i) => (
          <span key={i} className={styles.tick} style={{ width: w }} />
        ))}
      </div>

      <Container>
        <div className={styles.inner}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden />
            {t('landing.hero.badge')}
          </div>
          <h1 className={styles.title}>
            {t('landing.hero.title')}<br />
            <span className={styles.accent}>{t('landing.hero.titleAccent')}</span>
          </h1>
          <p className={styles.subtitle}>{t('landing.hero.subtitle')}</p>
          <div className={styles.cta}>
            <Button size="lg" onClick={() => navigate(target)}>
              {t('common.actions.getStarted')}
            </Button>
            <Button size="lg" variant="secondary" onClick={() => {
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              {t('landing.hero.seePricing')}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
