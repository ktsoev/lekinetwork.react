import { useTranslation } from 'react-i18next';
import styles from './Mission.module.css';

const InstagramIcon = () => (
  <svg className={styles.igIcon} viewBox="0 0 24 24" fill="none" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%"   stopColor="#f09433" />
        <stop offset="25%"  stopColor="#e6683c" />
        <stop offset="50%"  stopColor="#dc2743" />
        <stop offset="75%"  stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" />
    <circle cx="12" cy="12" r="4" stroke="url(#ig-grad)" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="url(#ig-grad)" stroke="none" />
  </svg>
);

const accounts = [
  { handle: '@mma_club_leki', url: 'https://www.instagram.com/mma_club_leki/' },
  { handle: '@leki_championship', url: 'https://www.instagram.com/leki_championship/' },
];

export function Mission() {
  const { t, i18n } = useTranslation();

  // Split on "LEKI" to apply accent styling to it
  const text = t('landing.mission.text');
  const parts = text.split('LEKI');

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.accent} aria-hidden />
        <p className={styles.text} lang={i18n.language}>
          {parts[0]}<strong className={styles.leki}>LEKI</strong>{parts[1]}
        </p>
        <div className={styles.links}>
          {accounts.map(({ handle, url }) => (
            <a
              key={handle}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.igLink}
            >
              <InstagramIcon />
              {handle}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
