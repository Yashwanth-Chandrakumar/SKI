import axios from 'axios';
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo.png';

const Signin = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const data = {email,password}
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', 
        data
     );
      console.log(response);
      const token = response.data.token;

      if (response.status === 200) {
        let college = '';
        if (email.includes('skct')) {
          college = 'SKCT';
        } else if (email.includes('skcet')) {
          college = 'SKCET';
        } else if (email.includes('skasc')) {
          college = 'SKASC';
        } else if (email.includes('skacas')) {
          college = 'SKCAS';
        } else if (email.includes('admin') || email.includes('management')) {
          college = 'all';
        }

        localStorage.setItem("token", token);
        console.log(college)
        if (college === "all") {
          navigate('/admin');
        } else {
          localStorage.setItem("college",college)
          navigate('/home', { state: { college } });
        }
      }
    } catch (error) {
      console.log(error);
      localStorage.setItem("token", "token");
      navigate('/home', { state: "SKCT" });
      setError('Invalid email or password');
    }
};


  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <img src={logoImage} alt="Logo" style={styles.logo} />
        </div>
        <div style={styles.card}>
          <h1 style={styles.signInText}>Sign In</h1>
          <div style={styles.form}>
            <label style={styles.label}>Username</label>
            <input
              style={{ ...styles.input, ...(error ? styles.inputError : null) }}
              placeholder="Enter Your Email Id"
              value={email}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label style={styles.label}>Password</label>
            <div style={{ ...styles.passwordInputContainer, ...(error ? styles.inputError : null) }}>
              <input
                style={{ ...styles.passwordInput, ...(error ? styles.inputError : null) }}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                {showPassword ? <IoEyeOff size={24} color="black" /> : <IoEye size={24} color="black" />}
              </button>
            </div>

            {error && <p style={styles.errorMessage}>{error}</p>}
            
            <button onClick={handleSignIn} style={styles.loginButton}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(to top right, #e6f2ff, #0066cc)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '1000px',
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '40px',
  },
  logo: {
    width: '100%',
    maxWidth: '800px',
    height: 'auto',
  },
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '90%',
    maxWidth: '400px',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  signInText: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#555',
    marginBottom: '8px',
  },
  input: {
    height: '20px',
    width: '94%',
    border: '1px solid #ccc',
    marginBottom: '20px',
    marginRight: '20px',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  passwordInputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '99%',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  passwordInput: {
    flex: 1,
    width: '94%',
    height: '20px',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    transition: 'background-color 0.3s',
  },
  eyeIcon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0 10px',
  },
  inputError: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    fontSize: '12px',
    marginBottom: '20px',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
  },
};

export default Signin;