import ThemeSwitcher from '../ThemeSwitcher'

export default function MainLayout({ children }) {
  return (
    <div id="main-content" className="min-h-screen">
      <ThemeSwitcher />
      {children}
    </div>
  )
}
