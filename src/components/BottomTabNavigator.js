import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomTabNavigator = ({ route }) => {
  const { college } = route.params;

  const styles = {
    tabBar: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'fixed',
      bottom: '0',
      left: '0',
      right: '0',
      height: '40px', // Adjusted height for simplicity; you can customize as needed
      backgroundColor: 'white',
      borderTop: '1px solid #ccc',
    },
    tabBarItem: {
      flex: '1',
      textAlign: 'center',
      padding: '10px',
      textDecoration: 'none',
      color: '#555',
      fontSize: '20px', // Adjusted font size for consistency
    },
    activeTabBarItem: {
      color: 'blue', // Color for active NavLink
    },
  };

  return (
    <div style={styles.tabBar}>
      <NavLink
        to={{ pathname: "/home", state: { college: college } }}
        activeStyle={styles.activeTabBarItem}
        style={styles.tabBarItem}
      >
        <span>Home</span>
      </NavLink>
      <NavLink
        to={{ pathname: "/status", state: { college: college } }}
        activeStyle={styles.activeTabBarItem}
        style={styles.tabBarItem}
      >
        <span>View Status</span>
      </NavLink>
      <NavLink
        to={{ pathname: "/registeredformview", state: { college: college } }}
        activeStyle={styles.activeTabBarItem}
        style={styles.tabBarItem}
      >
        <span>Registered Form</span>
      </NavLink>
    </div>
  );
};

export default BottomTabNavigator;
