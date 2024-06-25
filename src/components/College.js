import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const College = () => {
  const  college  = localStorage.getItem("college");
  const [showDrawer, setShowDrawer] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        
        <div style={styles.body}>
          <h2 style={{ ...styles.heading, fontWeight: "bold", fontSize: 24 }}>
            Welcome to {college}
          </h2>
          <div style={styles.centerbox}>
            <button
              style={styles.button}
              onClick={() => navigate('/status', { state: { college } })}
            >
              <span style={styles.buttonText}>Click Here to Update Status</span>
            </button>
            <button
              style={styles.button}
              onClick={() => navigate('/consolidate') }
            >
              <span style={styles.buttonText}>Click Here to View Consolidate</span>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url(https://mis.skct.edu.in/assets/images/skibudget/pg.jpeg)`,
    backgroundSize: 'cover',
    maxWidth: '100%',
    minHeight: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    padding: '0 20px',
    backgroundColor: 'blue',
  },
  drawerIcon: {
    position: 'absolute',
    left: 12,
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: '80px',
    bottom: 0,
    width: '30%',
    backgroundColor: 'white',
    zIndex: 1,
    overflow: 'scroll',
  },
  logo: {
    height: '50px',
    width: '77px',
    backgroundColor:'white',
    borderRadius:'5px',
    marginTop: 5,
    marginRight: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    margin: 0,
  },
  body: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    maxWidth: '100%',
    minHeight: 'calc(100vh - 80px)',
  },
  centerbox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
    padding: 30,
    width: 300,
    maxWidth: "90%",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: '10px 20px',
    marginBottom: 20,
    cursor: 'pointer',
    width: '100%',
    border: 'none',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
};

export default College;
