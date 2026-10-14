import { datasetStats } from '../data/analyticsData'
import styles from './StatCards.module.css'

const CARDS = [
  {
    label: 'Total Ratings',
    value: '100,000',
    sub: 'Across all users & movies',
    icon: '⭐',
    color: 'yellow',
  },
  {
    label: 'Total Users',
    value: '943',
    sub: 'Unique reviewers',
    icon: '👤',
    color: 'blue',
  },
  {
    label: 'Total Movies',
    value: '1,682',
    sub: 'In the catalogue',
    icon: '🎬',
    color: 'purple',
  },
  {
    label: 'Avg Ratings/User',
    value: '106',
    sub: 'Mean ratings per user',
    icon: '📊',
    color: 'teal',
  },
  {
    label: 'Avg Rating Score',
    value: '3.53',
    sub: 'Global average on 1–5 scale',
    icon: '🏆',
    color: 'green',
  },
  {
    label: 'Data Period',
    value: '1997–98',
    sub: 'Collection timeframe',
    icon: '📅',
    color: 'orange',
  },
]

export default function StatCards() {
  return (
    <div className={styles.grid}>
      {CARDS.map(card => (
        <div key={card.label} className={`${styles.card} ${styles[card.color]}`}>
          <div className={styles.iconWrap}>{card.icon}</div>
          <div className={styles.body}>
            <div className={styles.value}>{card.value}</div>
            <div className={styles.label}>{card.label}</div>
            <div className={styles.sub}>{card.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
