import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer, PieChart, Pie, Legend,
} from 'recharts'
import { ratingsDistribution } from '../data/analyticsData'
import Card from './Card'
import styles from './Chart.module.css'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0].payload
    const pct = ((d.count / 100000) * 100).toFixed(1)
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>{d.rating}</div>
        <div className={styles.tooltipRow}><span>Count</span><strong>{d.count.toLocaleString()}</strong></div>
        <div className={styles.tooltipRow}><span>Share</span><strong>{pct}%</strong></div>
      </div>
    )
  }
  return null
}

export default function RatingsDistribution({ compact }) {
  return (
    <Card
      title="Ratings Distribution"
      subtitle={compact ? undefined : 'How users rated movies across the 1–5 scale'}
      engine="MapReduce · Spark · Hive"
    >
      {compact ? (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ratingsDistribution} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="rating" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {ratingsDistribution.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className={styles.twoCol}>
          <div>
            <div className={styles.chartLabel}>Bar Chart</div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={ratingsDistribution} margin={{ top: 8, right: 16, left: -4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="rating" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} label={false}>
                  {ratingsDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className={styles.chartLabel}>Pie Chart</div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={ratingsDistribution}
                  dataKey="count"
                  nameKey="rating"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  label={({ rating, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {ratingsDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{v}</span>} />
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.tableWrap} style={{ gridColumn: '1 / -1' }}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Rating</th>
                  <th>Count</th>
                  <th>Share</th>
                  <th>Visual</th>
                </tr>
              </thead>
              <tbody>
                {ratingsDistribution.map(row => {
                  const pct = (row.count / 100000) * 100
                  return (
                    <tr key={row.rating}>
                      <td>{row.rating}</td>
                      <td>{row.count.toLocaleString()}</td>
                      <td>{pct.toFixed(1)}%</td>
                      <td>
                        <div className={styles.barCell}>
                          <div className={styles.barFill} style={{ width: `${pct}%`, background: row.fill }} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  )
}
