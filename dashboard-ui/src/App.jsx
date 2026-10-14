import { useState } from 'react'
import Sidebar from './components/Sidebar'
import StatCards from './components/StatCards'
import RatingsDistribution from './components/RatingsDistribution'
import MoviePopularity from './components/MoviePopularity'
import TopRatedMovies from './components/TopRatedMovies'
import AverageRatings from './components/AverageRatings'
import RatingTrends from './components/RatingTrends'
import UserActivity from './components/UserActivity'
import styles from './App.module.css'

const VIEWS = [
  { id: 'overview',      label: 'Overview' },
  { id: 'distribution',  label: 'Ratings Distribution' },
  { id: 'popularity',    label: 'Movie Popularity' },
  { id: 'toprated',      label: 'Top Rated Movies' },
  { id: 'averages',      label: 'Average Ratings' },
  { id: 'trends',        label: 'Rating Trends' },
  { id: 'useractivity',  label: 'User Activity' },
]

export default function App() {
  const [activeView, setActiveView] = useState('overview')

  return (
    <div className={styles.layout}>
      <Sidebar views={VIEWS} activeView={activeView} onSelect={setActiveView} />
      <main className={styles.main}>
        <div className={styles.topbar}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbRoot}>MovieLens 100K</span>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>
              {VIEWS.find(v => v.id === activeView)?.label}
            </span>
          </div>
          <div className={styles.badge}>
            <span className={styles.dot} />
            Live Data · 100K Ratings
          </div>
        </div>

        <div className={styles.content}>
          {activeView === 'overview' && (
            <>
              <h1 className={styles.pageTitle}>Dashboard Overview</h1>
              <StatCards />
              <div className={styles.overviewGrid}>
                <div className={styles.overviewCard}>
                  <RatingsDistribution compact />
                </div>
                <div className={styles.overviewCard}>
                  <TopRatedMovies compact />
                </div>
                <div className={styles.overviewCardWide}>
                  <MoviePopularity compact />
                </div>
              </div>
            </>
          )}
          {activeView === 'distribution'  && <RatingsDistribution />}
          {activeView === 'popularity'    && <MoviePopularity />}
          {activeView === 'toprated'      && <TopRatedMovies />}
          {activeView === 'averages'      && <AverageRatings />}
          {activeView === 'trends'        && <RatingTrends />}
          {activeView === 'useractivity'  && <UserActivity />}
        </div>
      </main>
    </div>
  )
}
