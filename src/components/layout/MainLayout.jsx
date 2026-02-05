import ThemeSwitcher from '../ThemeSwitcher'

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen">
      <ThemeSwitcher />
      {children}
    </div>
  )
}
