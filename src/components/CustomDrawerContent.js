import React, { useState } from 'react';
import { IoPower } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

const CustomDrawerContent = ({ onClose }) => {

  const location = useLocation();
  const college = localStorage.getItem("college") ;
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleHomePress = () => {
    onClose();
    navigate("/home", { state: { college } });
  };

  const handleNavigate = (route) => {
    navigate(`/${route}`, { state: { college } });
  };

  const handleLogout = () => {
    localStorage.setItem("token","")
    navigate('/');
  };

  const styles = {
    entire: {
      padding: '0px',
      margin: '0px',
      overflow: 'hidden',
    },
    drawerContainer: {
      width: '250px',
      height: '100vh',
      margin: '0px',
      padding: '20px 10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflowY: 'hidden', // Disable scrollbar
    },
    drawerItem: {
      width: '90%',
      margin: '10px 0',
    },
    drawerItemText: {
      fontSize: '18px',
      color: 'white',
      padding: '10px 15px',
      textAlign: 'left',
      textDecoration: 'none',
      display: 'block',
      width: '100%',
      borderRadius: '20px', // Rounded buttons
      cursor: 'pointer',
      backgroundColor: '#007bff',
      transition: 'background-color 0.3s ease',
    },
    drawerItemTextHover: {
      backgroundColor: '#0056b3',
    },
    dropdownItem: {
      paddingLeft: '30px',
      fontSize: '16px',
      color: 'white',
      cursor: 'pointer',
      backgroundColor: '#35a9ff',
      borderRadius: '20px', // Rounded buttons
      margin: '5px 0',
      padding: '10px 15px',
      transition: 'background-color 0.3s ease',
    },
    dropdownItemText: {
      color: 'white',
    },
    dropdownContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'auto',
      padding: '10px 15px',
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '20px', // Rounded buttons
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    logoutButtonHover: {
      backgroundColor: '#0056b3',
    },
  };

  return (
    <div style={styles.entire}>
      <div style={styles.drawerContainer}>
        <div style={styles.drawerItem}>
          <div
            onClick={handleHomePress}
            style={styles.drawerItemText}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.drawerItemTextHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.drawerItemText.backgroundColor}
          >
            Home
          </div>
        </div>
        <div style={styles.drawerItem}>
          <div
            onClick={toggleDropdown}
            style={styles.drawerItemText}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.drawerItemTextHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.drawerItemText.backgroundColor}
          >
            Forms
          </div>
        </div>
        {showDropdown && (
          <div style={styles.dropdownContainer}>
            <div
              onClick={() => handleNavigate("activitybudget")}
              style={styles.dropdownItem}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.drawerItemTextHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.dropdownItem.backgroundColor}
            >
              <span style={styles.dropdownItemText}>Activity Budget Form</span>
            </div>
            <div
              onClick={() => handleNavigate("facultybudget")}
              style={styles.dropdownItem}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.drawerItemTextHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.dropdownItem.backgroundColor}
            >
              <span style={styles.dropdownItemText}>Faculty Budget Form</span>
            </div>
            <div
              onClick={() => handleNavigate("studentbudget")}
              style={styles.dropdownItem}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.drawerItemTextHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.dropdownItem.backgroundColor}
            >
              <span style={styles.dropdownItemText}>Student Budget Form</span>
            </div>
            <div
              onClick={() => handleNavigate("equipment")}
              style={styles.dropdownItem}
              onMouseEnter={(e) => e.target.style.backgroundColor = styles.drawerItemTextHover.backgroundColor}
              onMouseLeave={(e) => e.target.style.backgroundColor = styles.dropdownItem.backgroundColor}
            >
              <span style={styles.dropdownItemText}>Equipment Budget Form</span>
            </div>
          </div>
        )}
        <div style={styles.drawerItem}>
          <div
            onClick={() => handleNavigate("RegisteredFormView")}
            style={styles.drawerItemText}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.drawerItemTextHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.drawerItemText.backgroundColor}
          >
            Registered Form View
          </div>
        </div>
        <div style={styles.drawerItem}>
          <div
            onClick={handleLogout}
            style={styles.logoutButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.logoutButtonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.logoutButton.backgroundColor}
          >
            <IoPower size={24} />
            <span style={{ marginLeft: '10px' }}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDrawerContent;
