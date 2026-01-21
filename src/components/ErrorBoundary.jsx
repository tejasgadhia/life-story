import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark-brown flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            {/* Error icon */}
            <div className="text-6xl mb-6">📜</div>
            
            <h1 
              className="text-3xl text-vintage-cream mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Something Went Wrong
            </h1>
            
            <p className="text-sepia-brown/80 mb-8 font-body leading-relaxed">
              The archives have encountered an unexpected error. 
              Our historians are investigating the matter.
            </p>

            <div className="border-2 border-sepia-brown/30 bg-sepia-brown/10 rounded-lg p-4 mb-8">
              <p className="text-xs text-sepia-brown/60 font-mono">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>

            <button
              onClick={this.handleRetry}
              className="bg-vintage-cream text-dark-brown px-8 py-3 rounded font-body text-base 
                       hover:bg-aged-paper transition-colors"
            >
              Try Again
            </button>

            <p className="mt-8 text-xs text-sepia-brown/50">
              If the problem persists, please refresh the page.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
