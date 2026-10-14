import styles from './Sidebar.module.css'

const ICONS = {
  overview:     '◈',
  distribution: '◉',
  popularity:   '▦',
  toprated:     '★',
  averages:     '≈',
  trends:       '↗',
  useractivity: '⊙',
}

export default function Sidebar({ views, activeView, onSelect }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>🎬</div>
        <div className={styles.logoText}>
          <div className={styles.logoTitle}>MovieLens</div>
          <div className={styles.logoSub}>Big Data Analytics</div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionLabel}>Analytics</div>
        <nav className={styles.nav}>
          {views.map(view => (
            <button
              key={view.id}
              className={`${styles.navItem} ${activeView === view.id ? styles.active : ''}`}
              onClick={() => onSelect(view.id)}
            >
              <span className={styles.navIcon}>{ICONS[view.id]}</span>
              <span className={styles.navLabel}>{view.label}</span>
              {activeView === view.id && <span className={styles.activeBar} />}
            </button>
          ))}
        </nav>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerItem}>
          <span className={styles.footerDot} style={{ background: 'var(--accent)' }} />
          MapReduce (mrjob 0.7.4)
        </div>
        <div className={styles.footerItem}>
          <span className={styles.footerDot} style={{ background: 'var(--teal)' }} />
          PySpark 4.2.0
        </div>
        <div className={styles.footerItem}>
          <span className={styles.footerDot} style={{ background: 'var(--purple)' }} />
          Apache Hive 3.1.3
        </div>
      </div>
    </aside>
  )
}
