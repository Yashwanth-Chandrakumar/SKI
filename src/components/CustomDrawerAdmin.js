import React, { useState } from 'react';
import { IoPower } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
const CustomDrawerAdmin = ({ onClose }) => {
  const { college } = useParams();
  const navigate = useNavigate();
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const toggleCollegeDropdown = () => {
    setShowCollegeDropdown(!showCollegeDropdown);
  };

  const toggleStatusDropdown = () => {
    setShowStatusDropdown(!showStatusDropdown);
  };

  const selectCollege = (college) => {
    setSelectedCollege(college);
  };

  const selectStatus = (status) => {
    setSelectedStatus(status);
  };

  const handleHomePress = () => {
    onClose(); // Close the drawer
    navigate("/home", { state: { college } });
  };

  const handleNavigate = (route, params) => {
    onClose(); // Close the drawer
    navigate(route, params);
  };

  const styles = {
    drawerContainer: {
      padding: '20px',
      backgroundColor: '#f4f4f4',
      height: '100vh',
    },
    drawerItem: {
      padding: '15px 20px',
      cursor: 'pointer',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    drawerItemText: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#007bff',
    },
    dropdownItem: {
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: 'white',
      margin: '5px 0',
    },
    selectedItem: {
      backgroundColor: '#0056b3',
    },
    subMenuItem: {
      padding: '10px 40px',
      cursor: 'pointer',
      backgroundColor: '#f8f9fa',
    },
    subMenuItemText: {
      fontSize: '14px',
      color: '#007bff',
    },
    arrow: {
      fontSize: '12px',
      color: '#007bff',
    },
    logoutButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
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
  const handleLogout = () => {
    localStorage.setItem("token","")
    navigate('/');
  };

  return (
    <div style={styles.drawerContainer}>
      <div style={{ ...styles.drawerItem, backgroundColor: '#007bff' }} onClick={handleHomePress}>
        <span style={{ ...styles.drawerItemText, color: 'white' }}>Home</span>
      </div>
      <div style={styles.drawerItem} onClick={toggleCollegeDropdown}>
        <span style={styles.drawerItemText}>Colleges</span>
        <span style={styles.arrow}>{showCollegeDropdown ? '▲' : '▼'}</span>
      </div>
    
      {showCollegeDropdown && (
        <div>
          {["SKCT", "SKCET", "SKASC", "SKCASC"].map((collegeName) => (
            <div
              key={collegeName}
              style={{
                ...styles.dropdownItem,
                ...(selectedCollege === collegeName && styles.selectedItem),
              }}
              onClick={() => selectCollege(collegeName)}
            >
              <span>{collegeName}</span>
            </div>
          ))}
          {selectedCollege && (
            <div>
              <div style={styles.drawerItem} onClick={toggleStatusDropdown}>
                <span style={styles.drawerItemText}>Status</span>
                <span style={styles.arrow}>{showStatusDropdown ? '▲' : '▼'}</span>
              </div>
              {showStatusDropdown && (
                <div>
                  <div style={styles.subMenuItem}>
                    <span style={styles.subMenuItemText} onClick={() => selectStatus("View")}>View Status</span>
                  </div>
                  {selectedStatus === "View" && (
                    <div>
                      <div
                        style={{
                          ...styles.dropdownItem,
                          ...(selectedStatus === "activitybudgetview" && styles.selectedItem),
                        }}
                        onClick={() => handleNavigate("/activitybudgetview", { state: { college: selectedCollege } })}
                      >
                        <span>Budget Form - Activity</span>
                      </div>
                      <div
                        style={{
                          ...styles.dropdownItem,
                          ...(selectedStatus === "facultybudgetview" && styles.selectedItem),
                        }}
                        onClick={() => handleNavigate("/facultybudgetview", { state: { college: selectedCollege } })}
                      >
                        <span>Budget Form - Faculty</span>
                      </div>
                      <div
                        style={{
                          ...styles.dropdownItem,
                          ...(selectedStatus === "studentbudgetview" && styles.selectedItem),
                        }}
                        onClick={() => handleNavigate("/studentbudgetview", { state: { college: selectedCollege } })}
                      >
                        <span>Budget Form - Student</span>
                      </div>
                      <div
                        style={{
                          ...styles.dropdownItem,
                          ...(selectedStatus === "equipmentview" && styles.selectedItem),
                        }}
                        onClick={() => handleNavigate("/equipmentview", { state: { college: selectedCollege } })}
                      >
                        <span>Budget Form - Equipment</span>
                      </div>
                    </div>
                  )}
                  <div style={styles.subMenuItem} onClick={() => selectStatus("Consolidate")}>
                    <span style={styles.subMenuItemText}>Consolidate Status</span>
                  </div>
                  
                </div>
              )}
            </div>
          )}
        </div>
      )}  <div style={styles.drawerItem}>
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
  );
};

export default CustomDrawerAdmin;
