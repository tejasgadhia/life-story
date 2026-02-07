import { Component } from 'react'
import { FileWarning } from 'lucide-react'

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
        <div className="min-h-screen bg-heritage-ink flex items-center justify-center p-8">
          <div className="max-w-md text-center">
            {/* Error icon */}
            <div className="mb-6" aria-hidden="true">
              <FileWarning className="w-16 h-16 mx-auto text-heritage-cream/80" />
            </div>
            
            <h1 
              className="text-3xl text-heritage-cream mb-4"
              style={{ fontFamily: "'Newsreader', Georgia, serif" }}
            >
              Something Went Wrong
            </h1>
            
            <p className="text-heritage-sepia/80 mb-8 font-sans leading-relaxed">
              The archives have encountered an unexpected error. 
              Our historians are investigating the matter.
            </p>

            <div className="border-2 border-heritage-sepia/30 bg-heritage-sepia/10 rounded-lg p-4 mb-8">
              <p className="text-xs text-heritage-sepia/60 font-sans">
                {this.state.error?.message || 'Unknown error'}
              </p>
            </div>

            <button
              onClick={this.handleRetry}
              className="bg-heritage-cream text-heritage-ink px-8 py-3 rounded font-sans text-base 
                       hover:bg-heritage-paper transition-colors"
            >
              Try Again
            </button>

            <p className="mt-8 text-xs text-heritage-sepia/50">
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
