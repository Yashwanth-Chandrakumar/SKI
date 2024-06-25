// Admin.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDrawerAdmin from './CustomDrawerAdmin';
import { MdMenu } from 'react-icons/md';
import { CollegeContext } from './CollegeContext';

const Admin = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { setCollege } = useContext(CollegeContext);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const handleSelection = (selectedCollege) => {
    setCollege(selectedCollege);
    navigate('/college');
  };

  const styles = {
    background: {
      backgroundImage: `url(https://mis.skct.edu.in/assets/images/skibudget/pg.jpeg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      // overflow:'hidden',
      // minHeight: '100vhs',
      // position: 'relative',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '100vh', // Ensure it covers the entire height
      width: '100vw', // Ensure it covers the entire width
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80px',
      padding: '0 0px',
      backgroundColor: 'blue',
      // marginRight: '10px',
      position: 'relative',
      width: '100%',
    },
    drawerIcon: {
      position: 'absolute',
      left: '12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    logo: {
      height: '50px',
      width: '100px', // Make the logo wider
      marginTop: '5px',
      marginRight: '5px',
      backgroundColor: 'white', // Add white background to the logo
      padding: '5px', // Add padding around the logo
      borderRadius: '5px', // Optional: Add slight border radius
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: 'white',
    },
    body: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      width: '100%',
    },
    centerbox: {
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
      padding: '30px',
      width: '300px',
      maxWidth: '90%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '10px',
      backgroundColor: 'blue',
      padding: '15px 25px',
      borderRadius: '8px',
      minWidth: '100%',
      color: 'white',
      fontWeight: 'bold',
      textDecoration: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    imageContainer: {
      width: '40px', // Increase the container size for better visibility
      height: '40px',
      marginRight: '10px',
      backgroundColor: 'white', // Add white background to logo
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
    },
    image: {
      width: '30px',
      height: '30px',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#ffbf00',
    },
    drawer: {
      position: 'absolute',
      left: '0',
      top: '80px',
      bottom: '0',
      width: '30%',
      backgroundColor: 'white',
      zIndex: '1',
      overflow: 'scroll',
    },
  };

  const renderCollegeButtons = () => {
    return (
      <div style={styles.centerbox}>
       {/* SKCET Button */}
      <button style={styles.button} onClick={() => handleSelection('SKCET')}>
        <div style={styles.imageContainer}>
          <img src="https://mis.skct.edu.in/assets/images/skibudget/skcet.png" alt="SKCET Logo" style={styles.image} />
        </div>
        <span>SKCET</span>
      </button>

        {/* SKCT Button */}
        <button style={styles.button} onClick={() => handleSelection('SKCT')}>
          <div style={styles.imageContainer}>
            <img src="https://mis.skct.edu.in/assets/images/skibudget/skct.png" alt="SKCT Logo" style={styles.image} />
          </div>
          <span>SKCT</span>
        </button>
        {/* SKASC Button */}
        <button style={styles.button} onClick={() => handleSelection('SKASC')}>
          <div style={styles.imageContainer}>
            <img src="https://mis.skct.edu.in/assets/images/skibudget/skasc.png" alt="SKASC Logo" style={styles.image} />
          </div>
          <span>SKASC</span>
        </button>
        {/* SKACAS Button */}
        <button style={styles.button} onClick={() => handleSelection('SKACAS')}>
          <div style={styles.imageContainer}>
            <img src="https://mis.skct.edu.in/assets/images/skibudget/skacas.png" alt="SKACAS Logo" style={styles.image} />
          </div>
          <span>SKACAS</span>
        </button>
      </div>
    );
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
        <div style={styles.body}>
          <span style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px', color: 'white' }}>
            Welcome to Admin Page
          </span>
          {renderCollegeButtons()}
          {showDrawer && (
            <div style={styles.drawer}>
              <CustomDrawerAdmin onClose={handleCloseDrawer} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
