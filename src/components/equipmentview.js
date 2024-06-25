import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';
import 'react-tabs/style/react-tabs.css';
import styled from 'styled-components';

const EquipmentFormView = () => {
  const { college } = useParams();
  const [formData, setFormData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(null);
  const [filteredFormData, setFilteredFormData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = formData.filter(item => item.selectedCollege === college);
    setFilteredFormData(filteredData);
  }, [formData, college]);

  const fetchData = async () => {
    try {
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
      {['SNo', 'Selected College', 'Faculty Name', 'Department', 'Date of Purchase', 'Category', 'Equipment List', 'Specifications', 'Unit Price', 'Total Quantity', 'Total Cost', 'Total Cost of all Items', 'Comments', 'Status', 'Action'].map(header => (
        <Header key={header}>{header}</Header>
      ))}
    </HeaderRow>
  );

  const renderTableRow = (item) => (
    <Row key={item.SNo}>
      <Column>{item.SNo}</Column>
      <Column>{item.selectedCollege}</Column>
      <Column>{item.facultyName}</Column>
      <Column>{item.selectedDepartments}</Column>
      <Column>{item.dateOfPurchase}</Column>
      <Column>{item.category}</Column>
      <Column>{item.equipmentList}</Column>
      <Column>{item.specification}</Column>
      <Column>{item.unitPrice}</Column>
      <Column>{item.quantity}</Column>
      <Column>{item.cost}</Column>
      <Column>{item.totalCost}</Column>
      <Column>{item.comment}</Column>
      <Column>{item.status}</Column>
      <Column>
        <Button onClick={() => handleEdit(item)}>Edit</Button>
        <Button onClick={() => handleDelete(item.SNo)}>Delete</Button>
      </Column>
    </Row>
  );

  const renderSlider = (title, data) => (
    <div>
      <HeadingContainer>
        <Heading>Registered Form Data of {college}</Heading>
        <Heading>EQUIPMENT FORM</Heading>
      </HeadingContainer>
      <Table>
        {renderTableHeader()}
        {data.map(item => renderTableRow(item))}
      </Table>

      {modalVisible && selectedItem && (
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
                <Button onClick={() => handleSave('Approved')}>Approve</Button>
                <Button onClick={() => handleSave('Disapproved')}>Disapprove</Button>
                <Button onClick={() => handleSave('Return')}>Return</Button>
                <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              </ButtonContainer>
            </ScrollContainer>
          </ModalView>
        </ModalContainer>
      )}
    </div>
  );

  return (
    <MainContainer>
      <StyledTabs>
        <StyledTabList>
          <StyledTab tabColor="gold">Pending</StyledTab>
          <StyledTab tabColor="green">Approved</StyledTab>
          <StyledTab tabColor="red">Disapproved</StyledTab>
          <StyledTab tabColor="blue">Return</StyledTab>
        </StyledTabList>

        <TabPanel>
          {renderSlider('Pending', filteredFormData.filter(item => item.status === 'Pending'))}
        </TabPanel>
        <TabPanel>
          {renderSlider('Approved', filteredFormData.filter(item => item.status === 'Approved'))}
        </TabPanel>
        <TabPanel>
          {renderSlider('Disapproved', filteredFormData.filter(item => item.status === 'Disapproved'))}
        </TabPanel>
        <TabPanel>
          {renderSlider('Return', filteredFormData.filter(item => item.status === 'Return' && item.returnedit === 1))}
        </TabPanel>
      </StyledTabs>
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

const Table = styled.div`
  overflow-x: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
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

const StyledTabs = styled(Tabs)`
  .react-tabs__tab {
    padding: 10px;
    cursor: pointer;
    background-color: grey;
    border: 1px solid #ccc;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    margin-right: 2px;
    transition: background-color 0.3s ease;
    color: white;

    &:hover {
      background-color: ${props => props.tabColor || 'grey'};
    }
  }

  .react-tabs__tab--selected {
    background-color: ${props => props.tabColor || 'grey'};
    border-color: #ccc;
    border-bottom: 1px solid ${props => props.tabColor || 'grey'};
    color: white;
  }
`;

const StyledTabList = styled(TabList)`
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
  border-bottom: 1px solid #ccc;
`;

const StyledTab = styled(Tab)`
  padding: 10px;
  cursor: pointer;
  background-color: grey;
  border: 1px solid #ccc;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  margin-right: 2px;
  transition: background-color 0.3s ease;
  color: white;

  &:hover {
    background-color: ${props => props.tabColor || 'grey'};
  }

  &.react-tabs__tab--selected {
    background-color: ${props => props.tabColor || 'grey'};
    border-color: #ccc;
    border-bottom: 1px solid ${props => props.tabColor || 'grey'};
    color: white;
  }
`;

export default EquipmentFormView;
