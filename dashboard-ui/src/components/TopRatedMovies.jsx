import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
} from 'recharts'
import { topRatedMovies } from '../data/analyticsData'
import Card from './Card'
import styles from './Chart.module.css'

const MEDALS = ['🥇', '🥈', '🥉']
const ACCENT_COLORS = [
  '#fbbf24','#e2e8f0','#d97706','#6366f1','#818cf8',
  '#a5b4fc','#8b5cf6','#7c3aed','#22c55e','#16a34a',
]

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

export default function TopRatedMovies({ compact }) {
  const shortLabels = topRatedMovies.map(m => ({
    ...m,
    shortTitle: m.title.length > 20 ? m.title.slice(0, 18) + '…' : m.title,
  }))

  return (
    <Card
      title="Top Rated Movies"
      subtitle={compact ? undefined : 'Movies with highest average rating (min. 50 ratings)'}
      engine="MapReduce · Spark · Hive"
    >
      {compact ? (
        <div className={styles.podium}>
          {topRatedMovies.slice(0, 3).map((movie, i) => (
            <div key={movie.movieId} className={styles.podiumCard} style={{ order: i === 0 ? 1 : i === 1 ? 0 : 2 }}>
              <div className={styles.podiumMedal}>{MEDALS[i]}</div>
              <div className={styles.podiumRating}>{movie.avgRating.toFixed(3)}</div>
              <div className={styles.podiumTitle}>{movie.title.replace(/\s*\(\d{4}\)/, '')}</div>
              <div className={styles.podiumYear}>{movie.title.match(/\((\d{4})\)/)?.[1]}</div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.twoCol}>
            <div>
              <div className={styles.chartLabel}>Average Rating by Movie</div>
              <ResponsiveContainer width="100%" height={340}>
                <BarChart data={shortLabels} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" domain={[4.2, 4.6]} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                  <YAxis type="category" dataKey="shortTitle" width={160} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgRating" radius={[0, 6, 6, 0]}>
                    {shortLabels.map((_, i) => (
                      <Cell key={i} fill={ACCENT_COLORS[i % ACCENT_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className={styles.chartLabel}>Radar: Quality vs Volume</div>
              <ResponsiveContainer width="100%" height={340}>
                <RadarChart data={shortLabels.slice(0, 8)} margin={{ top: 16, right: 24, left: 24, bottom: 16 }}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="shortTitle" tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
                  <PolarRadiusAxis angle={30} domain={[4.2, 4.6]} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} />
                  <Radar name="Avg Rating" dataKey="avgRating" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={styles.tableWrap} style={{ marginTop: 24 }}>
            <table className={styles.table}>
              <thead>
                <tr><th>Rank</th><th>Movie</th><th>Avg Rating</th><th># Ratings</th><th>Score Bar</th></tr>
              </thead>
              <tbody>
                {topRatedMovies.map((row, i) => {
                  const pct = ((row.avgRating - 4.2) / 0.35) * 100
                  return (
                    <tr key={row.movieId}>
                      <td>{MEDALS[i] ?? `#${i + 1}`}</td>
                      <td>{row.title}</td>
                      <td><strong style={{ color: '#fbbf24' }}>{row.avgRating.toFixed(3)}</strong></td>
                      <td>{row.numRatings}</td>
                      <td>
                        <div className={styles.barCell}>
                          <div className={styles.barFill} style={{ width: `${Math.max(pct, 4)}%`, background: ACCENT_COLORS[i] }} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Card>
  )
}
