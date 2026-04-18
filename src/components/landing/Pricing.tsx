import { useQuery } from '@tanstack/react-query'
import { motion, type Variants } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { queryKeys } from '../../api/queryKeys'
import { TariffsService } from '../../api/tariffs'
import { useAuth } from '../../context/AuthContext'
import { useCurrencyFormatter } from '../../hooks/useCurrencyFormatter'
import { mockTariffs } from '../../mocks/tariffs'
import { MAX_DEVICES } from '../../utils/constants'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
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
        <div className={styles.secLabel}>{t('landing.pricing.label')}</div>
        <h2 className={styles.heading}>{t('landing.pricing.heading')}</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-80px' }}
        >
          {tariffs.map(tariff => (
            <motion.div key={tariff.id} variants={itemVariants}>
              <Card
                className={[styles.card, tariff.popular ? styles.popular : ''].filter(Boolean).join(' ')}
              >
                {tariff.popular && (
                  <span className={styles.popularBadge}>
                    {t('purchase.tariff.popular')}
                  </span>
                )}
                <div className={styles.nameRow}>
                  <span className={styles.name}>{tariff.name}</span>
                  <span className={styles.deviceBadge}>
                    {t('purchase.tariff.devices', { count: MAX_DEVICES })}
                  </span>
                </div>
                <div>
                  <span className={styles.price}>{formatPrice(tariff)}</span>
                  <span className={styles.priceSuffix}>
                    {t('purchase.tariff.perDays', { days: tariff.durationDays })}
                  </span>
                </div>
                <div className={styles.discountRow}>
                  {tariff.discount ? (
                    <span className={styles.discount}>
                      {t('purchase.tariff.save', { pct: tariff.discount })}
                    </span>
                  ) : null}
                </div>
                <div className={styles.features}>
                  {tariff.features.filter(f => !/devices?/i.test(f)).map(f => (
                    <span key={f} className={styles.feature}>
                      <svg
                        className={styles.featureCheck}
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                      {f}
                    </span>
                  ))}
                </div>
                <Button
                  size='sm'
                  variant={tariff.popular ? 'primary' : 'secondary'}
                  className={styles.cta}
                  onClick={() => navigate(target)}
                >
                  {t('common.actions.choosePlan')}
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
