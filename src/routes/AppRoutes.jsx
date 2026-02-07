import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import MainLayout from '../components/layout/MainLayout'
import ThemeWrapper from '../components/ThemeWrapper'

const TimelineTheme = lazy(() => import('../components/themes/TimelineTheme'))

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/life-story" element={<LandingPage />} />

      {/* Report routes with birthday in URL */}
      <Route path="/life-story/:birthday/timeline" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} /></MainLayout>} />
      <Route path="/life-story/:birthday/timeline/:tab" element={<MainLayout><ThemeWrapper ThemeComponent={TimelineTheme} /></MainLayout>} />

      {/* Legacy redirects - old theme URLs */}
      <Route path="/life-story/:birthday/newspaper/*" element={<Navigate to="/life-story" replace />} />
      <Route path="/life-story/:birthday/casefile/*" element={<Navigate to="/life-story" replace />} />
      <Route path="/life-story/timeline/*" element={<Navigate to="/life-story" replace />} />
      <Route path="/life-story/newspaper/*" element={<Navigate to="/life-story" replace />} />
      <Route path="/life-story/casefile/*" element={<Navigate to="/life-story" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/life-story" replace />} />
    </Routes>
  )
}
