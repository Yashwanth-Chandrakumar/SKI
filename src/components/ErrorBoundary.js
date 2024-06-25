import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render any custom fallback UI
      return (
        <div style={styles.container}>
          <h1 style={styles.heading}>Something went wrong.</h1>
          <p style={styles.message}>Please try again later.</p>
        </div>
      );
    }

    return this.props.children; 
  }
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '3em',
    marginBottom: '20px',
  },
  message: {
    fontSize: '1.5em',
    textAlign: 'center',
    margin: '0 20px',
  },
};

export default ErrorBoundary;
