import styles from './Background.module.css';

export function Background() {
  return (
    <div className={styles.root} aria-hidden>
      <div className={styles.orb + ' ' + styles.orb1} />
      <div className={styles.orb + ' ' + styles.orb2} />
    </div>
  );
}
