import { useState } from 'react'

function PasswordGate({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    setTimeout(() => {
      const success = onLogin(password)
      if (!success) {
        setError('Invalid password')
        setPassword('')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-vintage-cream paper-texture">
      <div className="max-w-md w-full mx-4">
        <div className="aged-paper rounded-lg p-8 shadow-xl border border-sepia-brown/30">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl text-dark-brown mb-2">
              Life Story
            </h1>
            <p className="font-body text-sepia-brown text-sm">
              Your Personal Historical Report
            </p>
          </div>

          {/* Decorative line */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-sepia-brown/30"></div>
            <span className="text-sepia-brown text-lg">✦</span>
            <div className="flex-1 h-px bg-sepia-brown/30"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label 
                htmlFor="password" 
                className="block font-body text-sm text-sepia-brown mb-2"
              >
                Enter Access Code
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-vintage-cream border-2 border-sepia-brown/40 
                         rounded font-body text-dark-brown placeholder-sepia-brown/50
                         focus:outline-none focus:border-dark-brown transition-colors"
                placeholder="••••••••••"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-muted-red text-sm font-body">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-3 bg-dark-brown text-vintage-cream font-body 
                       font-bold uppercase tracking-wider rounded
                       hover:bg-sepia-brown transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Access Report'}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-sepia-brown/60 font-body">
            This report contains personalized historical analysis.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PasswordGate
