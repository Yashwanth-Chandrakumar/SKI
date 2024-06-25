import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import CustomDrawerContent from './CustomDrawerContent';

const styles = {
  imageBackground: {
    flex: 1,
    backgroundImage: `url(https://mis.skct.edu.in/assets/images/skibudget/status.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '100%',
    minHeight: '100vh', // Adjusted to 100vh to fill the viewport
    overflow: 'hidden', // Remove scrollbar
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Remove scrollbar
  },
  header: {
    height: '80px',
    backgroundColor: 'blue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    width: '100%',
    padding: '0 20px',
    zIndex: 2,
  },
  drawerIcon: {
    position: 'absolute',
    left: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  logo: {
    height: '50px',
    width: '70px',
    marginRight: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    minHeight: '100vh',
    paddingTop: '80px',
    overflow: 'hidden', // Ensure no overflow
  },
  centerBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '30px',
    width: '300px',
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  button: {
    backgroundColor: 'blue',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    marginBottom: '15px',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: 'darkblue',
  },
  selectedCollegeText: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'white',
  },
  drawer: {
    position: 'absolute',
    left: '0',
    top: '50px',
    bottom: '0',
    width: '49%',
    backgroundColor: 'white',
    zIndex: '1',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
    padding: '20px',
  },
};

const Status = () => {
  
  const location = useLocation();
  const { college } =  location.state ;
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);

  const closeDrawer = () => {
    setShowDrawer(false);
  };
 
      const getCollegeName = () => {
        switch (college) {
          case 'skct':
          case 'SKCT':
            return 'SKCT';
          case 'skcet':
          case 'SKCET':
            return 'SKCET';
          case 'skasc':
          case 'SKASC':
            return 'SKASC';
          case 'skacas':
          case 'SKACAS':
            return 'SKACAS';
          default:
            return 'Sri Krishna Institutions';
        }
      };

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleNavigation = (formType) => {
    navigate(`/${formType}`, { state: { college } });
  };

  return (
    <div style={styles.imageBackground}>
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.drawerIcon} onClick={toggleDrawer}>
            <MdMenu size={24} color="white" />
          </button>
          <img src="https://mis.skct.edu.in/assets/images/skibudget/logo.png" alt="Logo" style={styles.logo} />
          <h1 style={styles.title}>SRI KRISHNA INSTITUTIONS</h1>
        </div>
        <div style={styles.body}>
          <p style={styles.selectedCollegeText}>Welcome to {getCollegeName()}</p>
          <div style={styles.centerBox}>
            <button onClick={() => navigate("/activitybudgetview", { state: { college } })} style={styles.button}>
              ACTIVITY BUDGET
            </button>
            <button onClick={() => navigate("/facultybudgetview", { state: { college } })} style={styles.button}>
              FACULTY FINANCIAL SUPPORT
            </button>
            <button onClick={() => handleNavigation('equipmentview')} style={styles.button}>
              PURCHASE OF EQUIPMENT
            </button>
            <button onClick={() => handleNavigation('studentbudgetview')} style={styles.button}>
              STUDENT SUPPORT AND WELFARE
            </button>
          </div>
          {showDrawer && (
            <div style={styles.drawer}>
              <CustomDrawerContent history={navigate} onClose={closeDrawer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Status;
