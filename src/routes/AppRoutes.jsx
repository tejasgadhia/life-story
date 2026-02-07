import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import MainLayout from '../components/layout/MainLayout'
import ThemeWrapper from '../components/ThemeWrapper'

// Lazy load theme components for code splitting
const TimelineTheme = lazy(() => import('../components/themes/TimelineTheme'))
const NewspaperTheme = lazy(() => import('../components/themes/NewspaperTheme'))
const CaseFileTheme = lazy(() => import('../components/themes/CaseFileTheme'))

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/life-story" element={<LandingPage />} />

      {/* Report routes with birthday in URL */}
      {/* Timeline */}
      <Route path="/life-story/:birthday/timeline" element={<MainLayout><ThemeWrapper key="timeline" ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />
      <Route path="/life-story/:birthday/timeline/:tab" element={<MainLayout><ThemeWrapper key="timeline" ThemeComponent={TimelineTheme} themePath="timeline" /></MainLayout>} />

      {/* Newspaper */}
      <Route path="/life-story/:birthday/newspaper" element={<MainLayout><ThemeWrapper key="newspaper" ThemeComponent={NewspaperTheme} themePath="newspaper" /></MainLayout>} />
      <Route path="/life-story/:birthday/newspaper/:tab" element={<MainLayout><ThemeWrapper key="newspaper" ThemeComponent={NewspaperTheme} themePath="newspaper" /></MainLayout>} />

      {/* Case File */}
      <Route path="/life-story/:birthday/casefile" element={<MainLayout><ThemeWrapper key="casefile" ThemeComponent={CaseFileTheme} themePath="casefile" /></MainLayout>} />
      <Route path="/life-story/:birthday/casefile/:tab" element={<MainLayout><ThemeWrapper key="casefile" ThemeComponent={CaseFileTheme} themePath="casefile" /></MainLayout>} />

      {/* Legacy redirects - old URLs without birthday */}
      <Route path="/life-story/timeline/*" element={<Navigate to="/life-story" replace />} />
      <Route path="/life-story/newspaper/*" element={<Navigate to="/life-story" replace />} />
      <Route path="/life-story/casefile/*" element={<Navigate to="/life-story" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/life-story" replace />} />
    </Routes>
  )
}
