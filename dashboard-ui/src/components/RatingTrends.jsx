import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine,
} from 'recharts'
import { ratingTrends } from '../data/analyticsData'
import Card from './Card'
import styles from './Chart.module.css'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>Year {d.year}</div>
        <div className={styles.tooltipRow}><span>Avg Rating</span><strong>{d.avgRating.toFixed(3)}</strong></div>
        <div className={styles.tooltipRow}><span>Total Ratings</span><strong>{d.totalRatings.toLocaleString()}</strong></div>
      </div>
    )
  }
  return null
}

export default function RatingTrends() {
  return (
    <Card
      title="Rating Trends Over Time"
      subtitle="How average movie ratings shifted year-over-year across the dataset"
      engine="MapReduce · Spark · Hive"
    >
      <div className={styles.trendInsight}>
        <div className={styles.insightItem}>
          <div className={styles.insightValue}>1997</div>
          <div className={styles.insightLabel}>Higher-rated year</div>
        </div>
        <div className={styles.insightArrow}>→</div>
        <div className={styles.insightItem}>
          <div className={styles.insightValue} style={{ color: '#f97316' }}>−0.080</div>
          <div className={styles.insightLabel}>Drop in avg rating</div>
        </div>
        <div className={styles.insightArrow}>→</div>
        <div className={styles.insightItem}>
          <div className={styles.insightValue}>1998</div>
          <div className={styles.insightLabel}>More selective year</div>
        </div>
      </div>

      <div className={styles.twoCol} style={{ marginTop: 24 }}>
        <div>
          <div className={styles.chartLabel}>Avg Rating by Year</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={ratingTrends} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 13 }} />
              <YAxis domain={[3.4, 3.65]} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={3.53} stroke="var(--text-muted)" strokeDasharray="4 4" label={{ value: 'Overall avg', fill: 'var(--text-muted)', fontSize: 11 }} />
              <Line
                type="monotone"
                dataKey="avgRating"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ fill: '#6366f1', r: 7, strokeWidth: 2, stroke: 'var(--bg-card)' }}
                activeDot={{ r: 9 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className={styles.chartLabel}>Total Ratings by Year</div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ratingTrends} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 13 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="totalRatings" radius={[8, 8, 0, 0]}>
                <Cell fill="#6366f1" />
                <Cell fill="#14b8a6" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.tableWrap} style={{ marginTop: 24 }}>
        <table className={styles.table}>
          <thead>
            <tr><th>Year</th><th>Avg Rating</th><th>Total Ratings</th><th>% of Dataset</th></tr>
          </thead>
          <tbody>
            {ratingTrends.map(row => (
              <tr key={row.year}>
                <td><strong>{row.year}</strong></td>
                <td><strong style={{ color: '#fbbf24' }}>{row.avgRating.toFixed(3)}</strong></td>
                <td>{row.totalRatings.toLocaleString()}</td>
                <td>{((row.totalRatings / 100000) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
