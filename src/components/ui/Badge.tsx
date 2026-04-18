import { useTranslation } from 'react-i18next';
import type { SubscriptionStatus } from '../../types';
import styles from './Badge.module.css';

interface BadgeProps {
  status: SubscriptionStatus;
  className?: string;
}

export function Badge({ status, className }: BadgeProps) {
  const { t } = useTranslation();

  const labels: Record<SubscriptionStatus, string> = {
    active: t('common.status.active'),
    expired: t('common.status.expired'),
    pending: t('common.status.pending'),
  };

  return (
    <span className={[styles.badge, styles[status], className ?? ''].filter(Boolean).join(' ')}>
      <span className={styles.dot} aria-hidden />
      {labels[status]}
    </span>
  );
}
