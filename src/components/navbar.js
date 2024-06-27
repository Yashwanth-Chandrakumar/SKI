import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import CustomDrawerContent from './CustomDrawerContent';

export default function Navbar() {
    const [showDrawer, setShowDrawer] = useState(false);
    const location = useLocation();

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
    };

    // Check if the URL contains "college" or "status"
    const shouldHideMenu = location.pathname.includes('college') || location.pathname.includes('status');

    return (
        <div>
            <div style={styles.header}>
                {!shouldHideMenu && (
                    <button onClick={toggleDrawer} style={styles.drawerIcon}>
                        <MdMenu size={24} color="white" />
                    </button>
                )}
                <img src="https://mis.skct.edu.in/assets/images/skibudget/logo.png" alt="Logo" style={styles.logo} />
                <h1 style={styles.title}>SRI KRISHNA INSTITUTIONS</h1>
            </div>
            {showDrawer && !shouldHideMenu && (
                <div style={styles.drawer}>
                    <CustomDrawerContent onClose={() => setShowDrawer(false)} />
                </div>
            )}
        </div>
    );
}

const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80px',
        backgroundColor: '#007bff',
        width: '100%',
        boxSizing: 'border-box',
        position: 'relative',
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
};
