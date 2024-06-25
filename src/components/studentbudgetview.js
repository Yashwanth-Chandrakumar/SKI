import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentFormView = ({ college }) => {
  const [formData, setFormData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [filteredFormData, setFilteredFormData] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = formData.filter(item => item.selectedCollege === college);
    setFilteredFormData(filteredData);
  }, [formData, college]);

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://172.20.10.3:9091/student');
      const response = await axios.get('');
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching form data:', error);
      setError('Failed to fetch data');
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    const modalTitle = item.status === 'Approved' ? 'Approval' : 'Disapproval';
    setModalTitle(modalTitle);
    setModalVisible(true);
  };

  const handleSave = async (newStatus) => {
    try {
      const updatedItem = { ...selectedItem, status: newStatus };
      // await axios.post('http://172.20.10.3:9091/updateStudentBudget', updatedItem);
      await axios.post('', updatedItem);
      setModalVisible(false);
      fetchData();
      alert(`Budget has been ${newStatus.toLowerCase()} successfully.`);
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update data');
      alert('Failed to update budget. Please try again later.');
    }
  };

  const getRowStyle = (status) => {
    switch (status) {
      case 'Approved':
        return styles.approvedRow;
      case 'Disapproved':
        return styles.disapprovedRow;
      case 'Pending':
        return styles.pendingRow;
      case 'Return':
        return styles.returnRow;
      default:
        return {};
    }
  };

  const renderTabContent = (status) => {
    const data = filteredFormData.filter(item => item.status === status);
    return (
      <div style={styles.container}>
        <div style={styles.headingContainer}>
          <h2 style={{ ...styles.heading, ...styles.boldText }}>
            Registered Form Data of {college}
          </h2>
          <h2 style={{ ...styles.heading, ...styles.boldText }}>STUDENT FORM</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableCell}>SNo</th>
                <th style={styles.tableCell}>Selected College</th>
                <th style={styles.tableCell}>Date From</th>
                <th style={styles.tableCell}>Date To</th>
                <th style={styles.tableCell}>Student Name</th>
                <th style={styles.tableCell}>Department</th>
                <th style={styles.tableCell}>Time from</th>
                <th style={styles.tableCell}>Time to</th>
                <th style={styles.tableCell}>Duration</th>
                <th style={styles.tableCell}>Type of Activity</th>
                <th style={styles.tableCell}>Event Name</th>
                <th style={styles.tableCell}>Institute Name</th>
                <th style={styles.tableCell}>Location</th>
                <th style={styles.tableCell}>Financial support Requested</th>
                <th style={styles.tableCell}>Status</th>
                <th style={styles.tableCell}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.SNo} style={{ ...getRowStyle(item.status), ...styles.tableRow }}>
                  <td style={styles.tableCell}>{item.SNo}</td>
                  <td style={styles.tableCell}>{item.selectedCollege}</td>
                  <td style={styles.tableCell}>{item.dateFrom}</td>
                  <td style={styles.tableCell}>{item.dateTo}</td>
                  <td style={styles.tableCell}>{item.studentName}</td>
                  <td style={styles.tableCell}>{item.selectedDepartments}</td>
                  <td style={styles.tableCell}>{item.selectedTimeFrom}</td>
                  <td style={styles.tableCell}>{item.selectedTimeTo}</td>
                  <td style={styles.tableCell}>{item.duration}</td>
                  <td style={styles.tableCell}>{item.selectedActivityType}</td>
                  <td style={styles.tableCell}>{item.eventName}</td>
                  <td style={styles.tableCell}>{item.instituteName}</td>
                  <td style={styles.tableCell}>{item.location}</td>
                  <td style={styles.tableCell}>{item.budgetRequested}</td>
                  <td style={styles.tableCell}>{item.status}</td>
                  <td style={styles.tableCell}>
                    <button onClick={() => handleEdit(item)} style={styles.editButton}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalVisible && selectedItem && (
          <div style={styles.modalContainer}>
            <div style={styles.modalView}>
              <h2 style={styles.modalTitle}>{modalTitle}</h2>
              <div>
                {Object.entries(selectedItem).map(([key, value]) => (
                  <div style={styles.inputContainer} key={key}>
                    <span style={styles.inputTitle}>{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
                <div style={styles.buttonContainer}>
                  <button onClick={() => handleSave('Approved')} style={styles.modalButton}>Approve</button>
                  <button onClick={() => handleSave('Disapproved')} style={styles.modalButton}>Disapprove</button>
                  <button onClick={() => handleSave('Return')} style={styles.modalButton}>Return</button>
                  <button onClick={() => setModalVisible(false)} style={styles.modalButton}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.tabBar}>
        <button onClick={() => setActiveTab('pending')} style={activeTab === 'pending' ? { ...styles.tab, ...styles.activeTab1 } : styles.tab}>Pending</button>
        <button onClick={() => setActiveTab('approved')} style={activeTab === 'approved' ? { ...styles.tab, ...styles.activeTab2 } : styles.tab}>Approved</button>
        <button onClick={() => setActiveTab('disapproved')} style={activeTab === 'disapproved' ? { ...styles.tab, ...styles.activeTab3 } : styles.tab}>Disapproved</button>
        <button onClick={() => setActiveTab('return')} style={activeTab === 'return' ? { ...styles.tab, ...styles.activeTab4 } : styles.tab}>Return</button>
      </div>
      {renderTabContent(activeTab)}
    </div>
  );
};

const styles = {
  mainContainer: {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '1200px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  headingContainer: {
    textAlign: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
  tabBar: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flex: '1 1 20%',
    textAlign: 'center',
    margin: '5px',
  },
  activeTab1: {
    backgroundColor: 'gold',
  },
  activeTab2: {
    backgroundColor: 'green',
    color: 'white',
  },
  activeTab3: {
    backgroundColor: 'red',
    color: 'white',
  },
  activeTab4: {
    backgroundColor: 'blue',
    color: 'white',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableRow: {
    border: '1px solid #ccc',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  },
  approvedRow: {
    backgroundColor: 'lightgreen',
  },
  disapprovedRow: {
    backgroundColor: 'lightcoral',
  },
  pendingRow: {
    backgroundColor: 'lightyellow',
  },
  returnRow: {
    backgroundColor: 'lightblue',
  },
  editButton: {
    padding: '5px 10px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  modalContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: '600px',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
};

export default StudentFormView;
