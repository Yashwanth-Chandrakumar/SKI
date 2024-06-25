import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';
import FacultyFormView from './facultybudgetview';
import StudentFormView from './studentbudgetview';
import BudgetFormView from './activitybudgetview';
import EquipmentFormView from './equipmentview';


// Consolidate Component
const Consolidate = () => {
  const { college } = useParams();
  const [activityData, setActivityData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    fetchActivityData();
    fetchEquipmentData();
    fetchStudentData();
  }, []);

  const fetchActivityData = async () => {
    try {
      const response = await axios.get('/api/activity');
      setActivityData(response.data);
    } catch (error) {
      console.error('Error fetching activity data:', error);
      setError('Failed to fetch activity data');
    }
  };

  const fetchEquipmentData = async () => {
    try {
      const response = await axios.get('/api/equipment');
      setEquipmentData(response.data);
    } catch (error) {
      console.error('Error fetching equipment data:', error);
      setError('Failed to fetch equipment data');
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('/api/student');
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
      setError('Failed to fetch student data');
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    const modalTitle = item.status === 'Approved' ? 'Approval' : 'Disapproval';
    setModalTitle(modalTitle);
    setModalVisible(true);
  };

  const handleDelete = async (SNo, apiEndpoint) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${apiEndpoint}/${SNo}`);
        fetchActivityData();
        fetchEquipmentData();
        fetchStudentData();
      } catch (error) {
        console.error('Error deleting data:', error);
        setError('Failed to delete data');
      }
    }
  };

  const handleSave = async (newStatus, apiEndpoint) => {
    try {
      const updatedItem = { ...selectedItem, status: newStatus };
      await axios.post(apiEndpoint, updatedItem);
      setModalVisible(false);
      fetchActivityData();
      fetchEquipmentData();
      fetchStudentData();
      alert(`Item has been ${newStatus.toLowerCase()} successfully.`);
    } catch (error) {
      console.error('Error updating data:', error);
      setError('Failed to update data');
      alert('Failed to update item. Please try again later.');
    }
  };

  const renderTableHeader = (headers) => (
    <HeaderRow>
      {headers.map(header => (
        <Header key={header}>{header}</Header>
      ))}
    </HeaderRow>
  );

  const renderTableRow = (item, handleEdit, handleDelete, apiEndpoint) => (
    <Row key={item.SNo}>
      {Object.keys(item).map(key => (
        <Column key={key}>{item[key]}</Column>
      ))}
      <Column>
        <Button onClick={() => handleEdit(item)}>Edit</Button>
        <Button onClick={() => handleDelete(item.SNo, apiEndpoint)}>Delete</Button>
      </Column>
    </Row>
  );

  const renderTable = (title, data, headers, apiEndpoint) => (
    <div>
      <HeadingContainer>
        <Heading>{title}</Heading>
      </HeadingContainer>
      <TableContainer>
        <Table>
          {renderTableHeader(headers)}
          {data.map(item => renderTableRow(item, handleEdit, handleDelete, apiEndpoint))}
        </Table>
      </TableContainer>
    </div>
  );

  return (
    <MainContainer>
      <h1>Consolidated View</h1>
      <Tabs>
        <TabList>
          <Tab>Activity Budget View</Tab>
          <Tab>Equipment View</Tab>
          <Tab>Student Budget View</Tab>
          <Tab>Faculty Form View</Tab> 
        </TabList>
       
        <TabPanel>
            <BudgetFormView college={college} /> 
        </TabPanel>
        <TabPanel>
            <EquipmentFormView college={college} /> 
        </TabPanel>
        <TabPanel>
            <StudentFormView college={college} /> 
        </TabPanel>
        <TabPanel>
            <FacultyFormView college={college} /> 
        </TabPanel>
      </Tabs>
      {modalVisible && (
        <ModalContainer>
          <ModalView>
            <ModalTitle>{modalTitle}</ModalTitle>
            <ScrollContainer>
              {Object.entries(selectedItem).map(([key, value]) => (
                <InputContainer key={key}>
                  <InputTitle>{key}:</InputTitle>
                  <Label>{value}</Label>
                </InputContainer>
              ))}
              <ButtonContainer>
                <Button onClick={() => handleSave('Approved', `/api/${activeTab}`)}>Approve</Button>
                <Button onClick={() => handleSave('Disapproved', `/api/${activeTab}`)}>Disapprove</Button>
                <Button onClick={() => handleSave('Return', `/api/${activeTab}`)}>Return</Button>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              </ButtonContainer>
            </ScrollContainer>
          </ModalView>
        </ModalContainer>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin: 20px auto;
  padding: 20px;
  max-width: 1200px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
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
  font-weight: bold;
  text-align: center;

  &:last-child {
    border-right: none;
  }
`;

const Column = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  width: 120px;
  text-align: center;

  &:last-child {
    border-right: none;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
`;

const HeadingContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Heading = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 100%;
`;

const Table = styled.div`
  border-radius: 8px;
  width: fit-content; /* Ensure the table width fits its content */
  margin-bottom: 20px; /* Add some bottom margin for spacing */
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  max-height: 80%;
  overflow-y: auto;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const InputTitle = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;

const Label = styled.div`
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ModalTitle = styled.h3`
  text-align: center;
  margin-bottom: 15px;
`;

export default Consolidate;
