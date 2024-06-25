import React from 'react';

const ErrorPage = () => {
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

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Error</h1>
      <p style={styles.message}>The Page is under progress/maintenance (or) the page is not found.</p>
    </div>
  );
};

export default ErrorPage;
