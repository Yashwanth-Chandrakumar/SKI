import React, { useState } from 'react';
import CustomDrawerContent from './CustomDrawerContent';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';

const Selectform = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { college } =  location.state ;
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const closeDrawer = () => {
    setShowDrawer(false);
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

  const styles = {
    background: {
      backgroundImage: `url(https://mis.skct.edu.in/assets/images/skibudget/pg.jpeg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      overflow:'hidden',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: '100%',
    },
    header: {
      height: '60px',
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
    },
    body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    logo: {
      height: '50px',
      width: '90px',
      marginRight: '10px',
      backgroundColor:'white',
      borderRadius:'5px'
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
    },
    centerBox: {
      backgroundColor: '#FFFFFF',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      width: '65%',
      padding: '20px',
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
      backgroundColor: 'blue',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      width: '100%',
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
    },
    drawerIcon: {
      position: 'absolute',
      left: '20px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    drawer: {
      position: 'absolute',
      left: '0',
      top: '60px',
      bottom: '0',
      width: '250px',
      backgroundColor: 'white',
      overflow:'hidden',
      zIndex: '1',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
      padding: '20px',
      boxSizing: 'border-box',
    },
    selectedCollegeText: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: 'white',
    },
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button onClick={toggleDrawer} style={styles.drawerIcon}>
            <MdMenu size={24} color="white" />
          </button>
          <img src="https://mis.skct.edu.in/assets/images/skibudget/logo.png" alt="Logo" style={styles.logo} />
          <span style={styles.title}>SRI KRISHNA INSTITUTIONS</span>
        </div>
        {showDrawer && (
          <div style={styles.drawer}>
            <CustomDrawerContent history={navigate} onClose={closeDrawer} />
          </div>
        )}
        <div style={styles.body}>
          <span style={styles.selectedCollegeText}>Welcome to {getCollegeName()}</span>
          <div style={styles.centerBox}>
            <button onClick={() => navigate("/activitybudget", { state: { college } })} style={styles.button}>
              <span style={styles.buttonText}>ACTIVITY BUDGET</span>
            </button>
            <button onClick={() => navigate("/facultybudget", { state: { college } })} style={styles.button}>
              <span style={styles.buttonText}>FACULTY FINANCIAL SUPPORT</span>
            </button>
            <button onClick={() => navigate("/equipment", { state: { college } })} style={styles.button}>
              <span style={styles.buttonText}>PURCHASE OF EQUIPMENT</span>
            </button>
            <button onClick={() => navigate("/studentbudget", { state: { college } })} style={styles.button}>
              <span style={styles.buttonText}>STUDENT SUPPORT AND WELFARE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selectform;
