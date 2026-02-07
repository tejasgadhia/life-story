import { useLocation } from 'react-router-dom'
import ThemeSwitcher from '../ThemeSwitcher'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { useRouteChangeReset } from '../../hooks/useRouteChangeReset'

export default function MainLayout({ children }) {
  const progress = useScrollProgress()
  const { pathname } = useLocation()

  // Reset scroll and focus on page-level route changes (not tab switches)
  useRouteChangeReset('main-content')

  // Only show progress bar on report pages (has a birthday in the URL)
  const isReportPage = pathname.split('/').filter(Boolean).length >= 3

  return (
    <main id="main-content" className="min-h-screen">
      {isReportPage && progress > 0 && (
        <div
          className="fixed top-0 left-0 h-0.5 bg-dark-brown/70 z-[60]"
          style={{ width: `${progress * 100}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Reading progress"
        />
      )}
      <ThemeSwitcher />
      {children}
    </main>
  )
}
