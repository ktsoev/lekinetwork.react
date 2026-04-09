import { useQuery } from '@tanstack/react-query'
import { motion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { queryKeys } from '../../api/queryKeys'
import { TariffsService } from '../../api/tariffs'
import { useAuth } from '../../context/AuthContext'
import { useCurrencyFormatter } from '../../hooks/useCurrencyFormatter'
import { mockTariffs } from '../../mocks/tariffs'
import { Container } from '../layout/Container'
import { Button } from '../ui/Button'
import styles from './Pricing.module.css'

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

export function Pricing() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { t } = useTranslation()
  const formatPrice = useCurrencyFormatter()
  const target = isAuthenticated ? '/dashboard/purchase' : '/auth/login'

  const { data: serverTariffs } = useQuery({
    queryKey: queryKeys.tariffs,
    queryFn: () => TariffsService.list(),
  })

  const tariffs =
    serverTariffs && serverTariffs.length > 0 ? serverTariffs : mockTariffs

  return (
    <section id='pricing' className={styles.section}>
      <Container>
        <div className={styles.secLabel}>{t('landing.pricing.label', 'Тарифы')}</div>
        <h2 className={styles.heading}>{t('landing.pricing.heading')}</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-80px' }}
        >
          {tariffs.map(tariff => (
            <motion.div
              key={tariff.id}
              variants={itemVariants}
              className={[styles.card, tariff.popular ? styles.popular : ''].filter(Boolean).join(' ')}
            >
              {tariff.popular && (
                <span className={styles.popularBadge}>
                  {t('purchase.tariff.popular')}
                </span>
              )}
              <span className={styles.name}>{tariff.name}</span>
              <div className={styles.priceRow}>
                <span className={styles.priceNum}>{formatPrice(tariff).replace(/[^\d]/g, '')}</span>
                <div className={styles.priceAside}>
                  <span className={styles.priceCur}>₽</span>
                  <span className={styles.pricePer}>/ мес</span>
                </div>
              </div>
              {tariff.discount && (
                <span className={styles.discount}>
                  {t('purchase.tariff.save', { pct: tariff.discount })}
                </span>
              )}
              <Button
                size='sm'
                variant={tariff.popular ? 'primary' : 'secondary'}
                className={styles.cta}
                onClick={() => navigate(target)}
              >
                {t('common.actions.choosePlan')}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
