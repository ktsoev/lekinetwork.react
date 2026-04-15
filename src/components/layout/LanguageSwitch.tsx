import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitch.module.css';

export function LanguageSwitch() {
  const { i18n, t } = useTranslation();
  const current = i18n.language.split('-')[0];
  const next = current === 'ru' ? 'en' : 'ru';

  return (
    <button
      className={styles.btn}
      onClick={() => i18n.changeLanguage(next)}
      aria-label={t(`common.language.${next}`)}
      title={t(`common.language.${next}`)}
    >
      {t(`common.language.${current}`)}
    </button>
  );
}
