import React from 'react';
import './ErrorBoundary.css';

/**
 * App-level Error Boundary. Catches render errors in the tree,
 * shows a friendly "Something went wrong" UI with retry.
 * Optionally logs to backend via window.__STRATA_LOG_ERROR__.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (typeof window.__STRATA_LOG_ERROR__ === 'function') {
      try {
        window.__STRATA_LOG_ERROR__({ error, errorInfo });
      } catch (e) {
        console.error('Error logging failed:', e);
      }
    } else {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary" role="alert">
          <div className="error-boundary-content">
            <div className="error-boundary-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="error-boundary-title">Something went wrong</h1>
            <p className="error-boundary-message">
              We hit a snag. Please try again — if the problem continues, contact us.
            </p>
            <button type="button" className="error-boundary-retry" onClick={this.handleRetry}>
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
