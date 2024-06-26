import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const sampleData = [
  {
    SNo: 1,
    activityType: 'Conference',
    affiliation: 'Computer Science',
    eventTitle: 'AI Symposium 2024',
    facultyName: 'Dr. John Doe',
    facultyNumber: 'CS001',
    dateFrom: '2024-09-15',
    dateTo: '2024-09-17',
    totalCost: 5000,
    status: 'Pending',
    selectedCollege: 'SKCT'
  },
  {
    SNo: 2,
    activityType: 'Workshop',
    affiliation: 'Electrical Engineering',
    eventTitle: 'Renewable Energy Workshop',
    facultyName: 'Prof. Jane Smith',
    facultyNumber: 'EE002',
    dateFrom: '2024-10-01',
    dateTo: '2024-10-03',
    totalCost: 3500,
    status: 'Approved',
    selectedCollege: "SKCT"
  },
  {
    SNo: 3,
    activityType: 'Seminar',
    affiliation: 'Business Administration',
    eventTitle: 'Digital Marketing Trends',
    facultyName: 'Dr. Robert Johnson',
    facultyNumber: 'BA003',
    dateFrom: '2024-11-10',
    dateTo: '2024-11-11',
    totalCost: 2000,
    status: 'Disapproved',
    selectedCollege: "SKCT"
  },
  {
    SNo: 4,
    activityType: 'Training',
    affiliation: 'Mechanical Engineering',
    eventTitle: 'Advanced CAD Tools',
    facultyName: 'Prof. Emily Brown',
    facultyNumber: 'ME004',
    dateFrom: '2024-12-05',
    dateTo: '2024-12-07',
    totalCost: 4000,
    status: 'Return',
    selectedCollege: "SKCT"
  }
];

const BudgetFormView = () => {
  const college = localStorage.getItem("college");
  const [formData, setFormData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const fetchData = () => {
    setFormData(sampleData);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    const modalTitle = item.status === 'Approved' ? 'Approval' : 'Disapproval';
    setModalTitle(modalTitle);
    setModalVisible(true);
  };

  const handleDelete = (SNo) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updatedData = formData.filter(item => item.SNo !== SNo);
      setFormData(updatedData);
    }
  };

  const handleSave = (newStatus) => {
    const updatedData = formData.map(item => 
      item.SNo === selectedItem.SNo ? { ...item, status: newStatus } : item
    );
    setFormData(updatedData);
    setModalVisible(false);
    alert(`Budget has been ${newStatus.toLowerCase()} successfully.`);
  };

  const renderTableHeader = () => (
    <HeaderRow>
      {['SNo', 'Activity Type', 'Affiliation', 'Event Title', 'Faculty Name', 'Faculty Number', 'Date From', 'Date To', 'Total Cost', 'Status', 'Actions'].map(header => (
        <Header key={header}>{header}</Header>
      ))}
    </HeaderRow>
  );

  const renderTableRow = (item) => (
    <Row key={item.SNo}>
      <Column>{item.SNo}</Column>
      <Column>{item.activityType}</Column>
      <Column>{item.affiliation}</Column>
      <Column>{item.eventTitle}</Column>
      <Column>{item.facultyName}</Column>
      <Column>{item.facultyNumber}</Column>
      <Column>{item.dateFrom}</Column>
      <Column>{item.dateTo}</Column>
      <Column>{item.totalCost}</Column>
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
        return renderSlider('Return', filteredFormData.filter(item => item.status === 'Return'));
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