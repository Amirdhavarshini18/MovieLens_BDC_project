import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { moviePopularity } from '../data/analyticsData'
import Card from './Card'
import styles from './Chart.module.css'

const COLORS = [
  '#6366f1','#818cf8','#a5b4fc','#8b5cf6','#7c3aed',
  '#6d28d9','#5b21b6','#4c1d95','#4338ca','#3730a3',
  '#312e81','#1e40af','#1d4ed8','#2563eb','#3b82f6',
  '#60a5fa','#93c5fd','#bfdbfe','#dbeafe','#eff6ff',
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>{d.title}</div>
        <div className={styles.tooltipRow}><span>Ratings</span><strong>{d.ratings.toLocaleString()}</strong></div>
      </div>
    )
  }
  return null
}

export default function MoviePopularity({ compact }) {
  const data = compact ? moviePopularity.slice(0, 10) : moviePopularity

  return (
    <Card
      title="Movie Popularity"
      subtitle={compact ? undefined : 'Top 20 movies by total number of ratings received'}
      engine="MapReduce · Spark"
    >
      <ResponsiveContainer width="100%" height={compact ? 220 : 400}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, left: compact ? 10 : 20, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
          <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: compact ? 10 : 12 }} />
          <YAxis
            type="category"
            dataKey={compact ? 'movieId' : 'title'}
            width={compact ? 36 : 200}
            tick={{ fill: 'var(--text-muted)', fontSize: compact ? 10 : 11 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="ratings" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {!compact && (
        <div className={styles.tableWrap} style={{ marginTop: 24 }}>
          <table className={styles.table}>
            <thead>
              <tr><th>Rank</th><th>Movie</th><th>Year</th><th>Ratings</th><th>Popularity</th></tr>
            </thead>
            <tbody>
              {moviePopularity.map((row, i) => {
                const pct = (row.ratings / 583) * 100
                const year = row.title.match(/\((\d{4})\)/)?.[1] ?? '—'
                const name = row.title.replace(/\s*\(\d{4}\)/, '')
                return (
                  <tr key={row.movieId}>
                    <td><span className={styles.rank}>#{i + 1}</span></td>
                    <td>{name}</td>
                    <td>{year}</td>
                    <td><strong>{row.ratings}</strong></td>
                    <td>
                      <div className={styles.barCell}>
                        <div className={styles.barFill} style={{ width: `${pct}%`, background: COLORS[i] }} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
