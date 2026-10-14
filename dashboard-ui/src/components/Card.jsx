import styles from './Card.module.css'

export default function Card({ title, subtitle, engine, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {engine && (
          <div className={styles.engineBadge}>
            {engine}
          </div>
        )}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
