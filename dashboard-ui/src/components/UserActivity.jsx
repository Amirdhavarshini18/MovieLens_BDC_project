import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, AreaChart, Area,
} from 'recharts'
import { userActivity } from '../data/analyticsData'
import Card from './Card'
import styles from './Chart.module.css'

const COLORS = [
  '#22c55e','#16a34a','#15803d','#166534','#14532d',
  '#4ade80','#86efac','#bbf7d0','#dcfce7','#f0fdf4',
  '#6366f1','#818cf8','#a5b4fc','#c7d2fe',
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>User #{d.userId}</div>
        <div className={styles.tooltipRow}><span>Ratings Given</span><strong>{d.numRatings}</strong></div>
        <div className={styles.tooltipRow}><span>% of Dataset</span><strong>{((d.numRatings / 100000) * 100).toFixed(2)}%</strong></div>
      </div>
    )
  }
  return null
}

export default function UserActivity() {
  const cumulativeData = userActivity.map((u, i) => ({
    ...u,
    cumulative: userActivity.slice(0, i + 1).reduce((sum, x) => sum + x.numRatings, 0),
  }))

  return (
    <Card
      title="User Activity"
      subtitle="Top 15 most active users by total ratings submitted"
      engine="MapReduce · Spark · Hive"
    >
      <div className={styles.twoCol}>
        <div>
          <div className={styles.chartLabel}>Ratings per User (Top 15)</div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={userActivity} margin={{ top: 8, right: 16, left: -4, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="userId" tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                label={{ value: 'User ID', position: 'insideBottom', offset: -2, fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="numRatings" radius={[6, 6, 0, 0]}>
                {userActivity.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className={styles.chartLabel}>Cumulative Ratings (Top 15 Combined)</div>
          <ResponsiveContainer width="100%" height={340}>
            <AreaChart data={cumulativeData} margin={{ top: 8, right: 16, left: -4, bottom: 8 }}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="userId" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="cumulative"
                stroke="#22c55e"
                strokeWidth={2.5}
                fill="url(#greenGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.tableWrap} style={{ marginTop: 24 }}>
        <table className={styles.table}>
          <thead>
            <tr><th>Rank</th><th>User ID</th><th>Ratings</th><th>% of Total</th><th>Activity</th></tr>
          </thead>
          <tbody>
            {userActivity.map((row, i) => {
              const pct = (row.numRatings / 737) * 100
              return (
                <tr key={row.userId}>
                  <td>#{i + 1}</td>
                  <td><code style={{ color: 'var(--accent-soft)' }}>user_{row.userId}</code></td>
                  <td><strong>{row.numRatings}</strong></td>
                  <td>{((row.numRatings / 100000) * 100).toFixed(2)}%</td>
                  <td>
                    <div className={styles.barCell}>
                      <div className={styles.barFill} style={{ width: `${pct}%`, background: COLORS[i % COLORS.length] }} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
