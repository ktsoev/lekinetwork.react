import styles from './Mission.module.css';

const InstagramIcon = () => (
  <svg className={styles.igIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

const accounts = [
  { handle: '@mma_club_leki', url: 'https://www.instagram.com/mma_club_leki/' },
  { handle: '@leki_championship', url: 'https://www.instagram.com/leki_championship/' },
];

export function Mission() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.accent} aria-hidden />
        <p className={styles.text}>
          Все полученные средства за использование нашего интернет&#8209;сервиса&nbsp;LEKI
          будут идти на развитие спорта среди молодёжи
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
