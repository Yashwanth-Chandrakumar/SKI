import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const BudgetFormView = () => {
  const { college } = useParams();
  const [formData, setFormData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [filteredFormData, setFilteredFormData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  const tabs = [
    { key: 'pending', title: 'Pending' },
    { key: 'approved', title: 'Approved' },
    { key: 'disapproved', title: 'Disapproved' },
    { key: 'return', title: 'Return' },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = formData.filter(item => item.selectedCollege === college);
    setFilteredFormData(filteredData);
  }, [formData, college]);

  const fetchData = async () => {
    try {
      // const response = await axios.get('http://your-api-endpoint.com/budget');
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

  const handleDelete = async (SNo) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        // await axios.delete(`http://your-api-endpoint.com/deleteBudget/${SNo}`);
        await axios.delete(``);
        fetchData();
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Failed to delete data');
      }
    }
  };

  const handleSave = async (newStatus) => {
    try {
      const updatedItem = { ...selectedItem, status: newStatus };
      // await axios.post('http://your-api-endpoint.com/updateBudget', updatedItem);
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

  const renderTableHeader = () => (
    <HeaderRow>
      {['SNo', 'Activity Type', 'Affiliation', 'Event Title', 'Faculty Name', 'Faculty Number', 'Date From', 'Date To', 'Total Cost'].map(header => (
        <Header key={header}>{header}</Header>
      ))}
    </HeaderRow>
  );

  const renderTableRow = (item) => (
    <Row key={item.SNo}>
      <Column>{item.SNo}</Column>
      <Column>{item.eventTitle}</Column>
      <Column>{item.status}</Column>
      <Column>
        <Button onClick={() => handleEdit(item)}>Edit</Button>
        <Button onClick={() => handleDelete(item.SNo)}>Delete</Button>
      </Column>
    </Row>
  );

  const renderSlider = (title, data) => (
    <div>
      <h2>{title}</h2>
      <TableContainer>
        <Table>
          {renderTableHeader()}
          {data.map(item => renderTableRow(item))}
        </Table>
      </TableContainer>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'pending':
        return renderSlider('Pending', filteredFormData.filter(item => item.status === 'Pending'));
      case 'approved':
        return renderSlider('Approved', filteredFormData.filter(item => item.status === 'Approved'));
      case 'disapproved':
        return renderSlider('Disapproved', filteredFormData.filter(item => item.status === 'Disapproved'));
      case 'return':
        return renderSlider('Return', filteredFormData.filter(item => item.status === 'Return' && item.returnedit === 1));
      default:
        return null;
    }
  };

  const getTabClass = (tabKey) => {
    switch (tabKey) {
      case 'pending':
        return 'pending-tab';
      case 'approved':
        return 'approved-tab';
      case 'disapproved':
        return 'disapproved-tab';
      case 'return':
        return 'return-tab';
      default:
        return '';
    }
  };

  return (
    <Container>
      <h1>Activity Budget View</h1>
      <TabsContainer>
        {tabs.map(tab => (
          <TabButton
            key={tab.key}
            className={`${getTabClass(tab.key)} ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.title}
          </TabButton>
        ))}
      </TabsContainer>
      <TabContent>
        {renderTabContent()}
      </TabContent>
      
      {modalVisible && (
        <Modal>
          <h2>{modalTitle}</h2>
          <button onClick={() => handleSave('Approved')}>Save</button>
          <button onClick={() => handleSave('Disapproved')}>Disapprove</button>
          <button onClick={() => setModalVisible(false)}>Close</button>
        </Modal>
      )}
    </Container>
  );
};

export default BudgetFormView;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    margin-top: 50px;
    padding: 10px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  gap: 10px;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &.pending-tab {
    background-color: ${props => (props.className.includes('active') ? '#FFD700' : '#ddd')};
    &:hover {
      background-color: #FFD700;
    }
  }

  &.approved-tab {
    background-color: ${props => (props.className.includes('active') ? '#008000' : '#ddd')};
    &:hover {
      background-color: #008000;
    }
  }

  &.disapproved-tab {
    background-color: ${props => (props.className.includes('active') ? '#FF0000' : '#ddd')};
    &:hover {
      background-color: #FF0000;
    }
  }

  &.return-tab {
    background-color: ${props => (props.className.includes('active') ? '#0000FF' : '#ddd')};
    &:hover {
      background-color: #0000FF;
    }
  }

  &:not(.pending-tab):not(.approved-tab):not(.disapproved-tab):not(.return-tab) {
    &:hover {
      background-color: #bbb;
    }
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const TabContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  border-collapse: collapse;
`;

const HeaderRow = styled.div`
  display: flex;
  background-color: #f2f2f2;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Header = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  width: 120px;
  flex: 1;
`;

const Column = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  width: 120px;
  flex: 1;
`;

const Button = styled.button`
  background-color: blue;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
  &:hover {
    background-color: darkblue;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 6px 12px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;
