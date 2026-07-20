import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', background: '#0a0a14', display: 'flex',
          alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
          color: 'white', fontFamily: 'monospace', padding: '2rem', textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ color: '#a855f7', marginBottom: '1rem' }}>Something went wrong</h1>
          <pre style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '1rem', maxWidth: '700px',
            overflow: 'auto', fontSize: '13px', color: '#fca5a5', textAlign: 'left'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1.5rem', padding: '0.75rem 2rem',
              background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
              border: 'none', borderRadius: '12px', color: 'white',
              cursor: 'pointer', fontSize: '14px', fontFamily: 'inherit'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
