function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const themes = [
    { id: 'timeline', label: 'Timeline', icon: '📊' },
    { id: 'newspaper', label: 'Newspaper', icon: '📰' },
    { id: 'casefile', label: 'Case File', icon: '📁' },
  ]

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white/95 backdrop-blur border-2 border-dark-brown rounded-lg p-3 shadow-xl">
        <p className="text-xs font-body text-sepia-brown uppercase tracking-wider mb-2 text-center">
          Theme
        </p>
        <div className="flex gap-1">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className={`px-3 py-2 rounded font-body text-sm transition-all
                ${currentTheme === theme.id 
                  ? 'bg-dark-brown text-vintage-cream' 
                  : 'bg-vintage-cream text-dark-brown hover:bg-aged-paper'
                }`}
              title={theme.label}
            >
              <span className="mr-1">{theme.icon}</span>
              <span className="hidden sm:inline">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThemeSwitcher
