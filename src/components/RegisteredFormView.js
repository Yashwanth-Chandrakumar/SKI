import React, { useState, useEffect } from 'react';
import axios from 'axios';

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '90%',
    margin: '20px auto'
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center'
  },
  tableContainer: {
    marginBottom: '20px',
    overflowX: 'auto',
    border: '1px solid #ccc',
    borderRadius: '8px'
  },
  tableHead: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '2px solid #000',
    paddingBottom: '10px',
    marginBottom: '10px',
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px'
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'left',
    padding: '10px',
    borderRight: '1px solid #ccc'
  },
  tableBody: {},
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10px',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #ccc'
  },
  tableCell: {
    flex: 1,
    fontSize: '16px',
    padding: '10px',
    borderRight: '1px solid #ccc'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  editButton: {
    marginRight: '10px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s'
  },
  deleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s'
  }
};

const RegisteredFormView = ({ navigation }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://172.20.10.3:9091/forms');
      const response = await axios.get('');
      const jsonData = response.data;
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(``);
      // await axios.delete(`http://172.20.10.3:9091/forms/${id}`);
      console.log('Form deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const handleEdit = (item) => {
    navigation.navigate('FacultyBudget', { formData: item });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>REGISTERED FORM VIEW</h2>
      <div style={styles.tableContainer}>
        <div style={styles.tableHead}>
          <div style={styles.tableHeaderCell}>Selected College</div>
          <div style={styles.tableHeaderCell}>Date From</div>
          <div style={styles.tableHeaderCell}>Date To</div>
          <div style={styles.tableHeaderCell}>Faculty</div>
          <div style={styles.tableHeaderCell}>Time From</div>
          <div style={styles.tableHeaderCell}>Time To</div>
          <div style={styles.tableHeaderCell}>Duration</div>
          <div style={styles.tableHeaderCell}>Activity Type</div>
          <div style={styles.tableHeaderCell}>Event Name</div>
          <div style={styles.tableHeaderCell}>Institute Name</div>
          <div style={styles.tableHeaderCell}>Location</div>
          <div style={styles.tableHeaderCell}>Budget Requested</div>
          <div style={styles.tableHeaderCell}>Status</div>
          <div style={styles.tableHeaderCell}>Actions</div>
        </div>
        <div style={styles.tableBody}>
          {data.map((item) => (
            <div key={item.id} style={styles.tableRow}>
              <div style={styles.tableCell}>{item.selectedCollege}</div>
              <div style={styles.tableCell}>{item.dateFrom}</div>
              <div style={styles.tableCell}>{item.dateTo}</div>
              <div style={styles.tableCell}>
                {item.faculty.map((faculty, index) => (
                  <div key={index}>{faculty.facultyName}</div>
                ))}
              </div>
              <div style={styles.tableCell}>{item.selectedTimeFrom}</div>
              <div style={styles.tableCell}>{item.selectedTimeTo}</div>
              <div style={styles.tableCell}>{item.duration}</div>
              <div style={styles.tableCell}>{item.selectedActivityType}</div>
              <div style={styles.tableCell}>{item.eventName}</div>
              <div style={styles.tableCell}>{item.instituteName}</div>
              <div style={styles.tableCell}>{item.location}</div>
              <div style={styles.tableCell}>{item.budgetRequested}</div>
              <div style={styles.tableCell}>{item.status}</div>
              <div style={styles.tableCell}>
                <div style={styles.buttonContainer}>
                  <button style={styles.editButton} onClick={() => handleEdit(item)}>Edit</button>
                  <button style={styles.deleteButton} onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisteredFormView;
