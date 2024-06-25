import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const college = localStorage.getItem("college") ;
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const getCollegeName = () => {
    switch (college) {
      case 'skct':
        return 'SKCT';
      case 'skcet':
        return 'SKCET';
      case 'skasc':
        return 'SKASC';
      case 'skacas':
        return 'SKACAS';
      default:
        return 'Sri Krishna Institutions';
    }
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
      <Navbar/>
        <div style={styles.body}>
          <div style={styles.centerBox}>
            <h2 style={styles.heading}>Welcome to {getCollegeName()}</h2>
            <button
              style={styles.button}
              onClick={() => navigate("/selectform", { state: { college } })}
            >
              <span style={styles.buttonText}>CLICK HERE TO REGISTER</span>
            </button>
            <button
              style={styles.button}
              onClick={() => navigate("/status", { state: { college } })}
            >
              <span style={styles.buttonText}>CLICK HERE TO VIEW STATUS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  background: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(https://mis.skct.edu.in/assets/images/skibudget/pg.jpeg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    height: '100%',
    padding: '0',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    backgroundColor: '#007bff',
    width: '100%',
    boxSizing: 'border-box',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1000',
  },
  drawerIcon: {
    position: 'absolute',
    left: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
  },
  logo: {
    height: '50px',
    width: '100px',
    marginRight: '10px',
    backgroundColor: 'white',
    border: '1px solid white',
    borderRadius: '5px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  drawer: {
    position: 'absolute',
    left: '0',
    top: '80px',
    bottom: '0',
    width: '250px',
    backgroundColor: 'white',
    overflow: 'hidden',
    zIndex: '1',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
    padding: '20px',
    boxSizing: 'border-box',
  },
  body: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '80px', // To account for fixed header height
    width: '100%',
    boxSizing: 'border-box',
  },
  centerBox: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    padding: '30px',
    width: '90%', /* Change from 80% */
    maxWidth: '600px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#007bff',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
    backgroundColor: '#007bff',
    padding: '15px 25px',
    borderRadius: '8px',
    width: '100%',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
  },
};

export default Home;
