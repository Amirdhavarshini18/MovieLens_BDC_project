import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ZAxis, BarChart, Bar, Cell,
} from 'recharts'
import { averageRatings } from '../data/analyticsData'
import Card from './Card'
import styles from './Chart.module.css'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    const d = payload[0].payload
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipTitle}>{d.title}</div>
        <div className={styles.tooltipRow}><span>Avg Rating</span><strong>{d.avgRating.toFixed(3)}</strong></div>
        <div className={styles.tooltipRow}><span># Ratings</span><strong>{d.numRatings}</strong></div>
      </div>
    )
  }
  return null
}

const COLORS = ['#6366f1','#818cf8','#a5b4fc','#8b5cf6','#7c3aed','#6d28d9','#5b21b6','#4c1d95','#4338ca','#3730a3',
  '#312e81','#1e40af','#1d4ed8','#2563eb','#3b82f6','#60a5fa','#93c5fd','#bfdbfe','#dbeafe','#eff6ff']

export default function AverageRatings() {
  const scatterData = averageRatings.map(m => ({
    ...m,
    x: m.numRatings,
    y: m.avgRating,
    z: m.numRatings,
  }))

  return (
    <Card
      title="Movie Average Ratings"
      subtitle="Average rating per movie — scatter shows rating vs popularity correlation"
      engine="MapReduce · Spark · Hive"
    >
      <div className={styles.twoCol}>
        <div>
          <div className={styles.chartLabel}>Avg Rating — Top 20 Movies</div>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart
              data={averageRatings}
              layout="vertical"
              margin={{ top: 4, right: 16, left: 8, bottom: 4 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" domain={[4.0, 4.6]} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis
                type="category"
                dataKey="title"
                width={180}
                tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="avgRating" radius={[0, 6, 6, 0]}>
                {averageRatings.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className={styles.chartLabel}>Scatter: Avg Rating vs # Ratings</div>
          <ResponsiveContainer width="100%" height={340}>
            <ScatterChart margin={{ top: 16, right: 24, left: 0, bottom: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                type="number"
                dataKey="x"
                name="# Ratings"
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                label={{ value: '# Ratings', position: 'insideBottom', offset: -8, fill: 'var(--text-muted)', fontSize: 11 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Avg Rating"
                domain={[4.0, 4.6]}
                tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
                label={{ value: 'Avg Rating', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }}
              />
              <ZAxis type="number" dataKey="z" range={[40, 300]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={scatterData} fill="#6366f1" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.tableWrap} style={{ marginTop: 24 }}>
        <table className={styles.table}>
          <thead>
            <tr><th>#</th><th>Movie</th><th>Avg Rating</th><th># Ratings</th><th>Score</th></tr>
          </thead>
          <tbody>
            {averageRatings.map((row, i) => {
              const pct = ((row.avgRating - 4.0) / 0.6) * 100
              return (
                <tr key={row.movieId}>
                  <td>{i + 1}</td>
                  <td>{row.title}</td>
                  <td><strong style={{ color: '#fbbf24' }}>{row.avgRating.toFixed(3)}</strong></td>
                  <td>{row.numRatings}</td>
                  <td>
                    <div className={styles.barCell}>
                      <div className={styles.barFill} style={{ width: `${Math.max(pct, 4)}%`, background: COLORS[i] }} />
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
