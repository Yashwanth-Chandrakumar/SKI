import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EquipmentForm = ({ collegeName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const college = localStorage.getItem("college");
  const [selectedCollege, setSelectedCollege] = useState(college);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState('');
  const [category, setCategory] = useState('recurring');
  const [equipmentList, setEquipmentList] = useState([
    { id: 1, equipment: '', specification: '', unitprice: '', quantity: '', cost: '' }
  ]);

  const handleAddEquipment = () => {
    const newId = equipmentList.length + 1;
    setEquipmentList([...equipmentList, { id: newId, equipment: '', specification: '', unitprice: '', quantity: '', cost: '' }]);
  };

  const handleRemoveEquipment = id => {
    const updatedList = equipmentList.filter(item => item.id !== id);
    setEquipmentList(updatedList);
  };

  const collegeDepartmentMapping = {
    SKASC: ['B.A. English Literature', 'M.A. English Literature', 'B.Sc. Mathematics', 'M.Sc. Mathematics with Big Data', 'B.Sc. Artificial Intelligence and Machine Learning', 'B.Sc. Data Science', 'M.Sc. Software Systems', 'B.Sc.Computer Technology', 'B.C.A. (Computer Applications)', 'B.Sc. Computer Science And Applications', 'B.Sc. Computer Science', 'B.Sc. Software Systems', 'B.Sc. Information Technology', 'B.Sc. Computer Science with Cognitive Systems', 'M.Sc. Information Technology', 'M.Sc. Computer Science', 'B.Sc. Electronics and Communication Systems', 'M.Sc. Electronics and Communication Systems', 'B.Sc. Costume Design and Fashion', 'B.Sc.Catering Science and Hotel Management', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'M.Sc. Microbiology', 'M.Sc. Bioinformatics', 'B.Com.(Commerce)', 'M.Com.(Commerce)', 'M.Com. International Business', 'B.Com.Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Process Service', 'B.Com. Banking and Insurance', 'B.Com. Accounting and Finance', 'B.Com. Capital Market', 'B.Com. Computer Applications', 'B.Com. Business Analytics', 'B.Com. Information Technology', 'B.Com. E Commerce', 'B.B.A. Business Administration ', 'B.B.A. Computer Applications', 'B.B.A. Logistics', 'B.Sc. Information Systems Management', 'B.Sc. Psychology', 'M.S.. (Social Work)', 'M.A. Public Administration', 'External'],
    SKCT: ['B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'Science & Humanities', 'B.E. Civil Engineering', 'B.E. Mechanical Engineering', 'B.E. Computer Science and Engineering', 'B.Tech Information Technology', 'Master of Business Administration(MBA)', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Internet of Things', 'B.Tech Cyber Security', 'B.Tech Artificial Intelligence and Machine Learning', 'External'],
    SKCET: ['B.Tech Information Technology', 'B.E. Civil Engineering', 'B.E. Computer Science and Engineering', 'B.E. Computer Science and Engineering(Cyber Security)', 'B.E. Electronics Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Computer Science and Business Systems', 'M.E. Applied Electronics', 'M.E. Computer Science And Engineering', 'Master of Business Administration(MBA)', 'M.E. Engineering Design', 'M.Tech. Computer Science and Engineering', 'External'],
    SKACAS: ['B.Sc CS', 'B.Sc CT', 'B.Sc IT', 'B.C.A', 'B.Sc AIML', 'B.Sc Data Science', 'B.Sc Mathematics', 'B.Sc Psychology', 'B.A English', 'B.Com', 'B.Com CA', 'B.Com PA', 'B.Com A & F', 'B.Com CS', 'B.Com IT', 'B.Com BPS', 'B.Com B & I', 'B.B.A CA', 'B.B.A', 'M.Sc CS', 'M.Com', 'PhD CS', 'PhD Commerce', 'PhD Mathematics', 'PhD English', 'External']
  };

  const getCollegeName = () => {
    switch (college) {
      case 'skct':
        return 'SKCT';
      case 'skcet':
        return 'SKCET';
      case 'skasc':
        return 'SKASC';
      case 'skacas':
        return 'SKACAS';
      default:
        return 'Sri Krishna Institutions';
    }
  };

  
  useEffect(() => {
    const collegeName = getCollegeName();
    const departments = collegeDepartmentMapping[selectedCollege] || [];
    setDepartmentOptions(departments);
}, [selectedCollege]);

  const handleDepartmentChanges = (event) => {
    setSelectedDepartments(event.target.value);
  };

  const calculateTotalCost = () => {
    let total = 0;
    equipmentList.forEach(item => {
      total += parseFloat(item.cost || 0);
    });
    return total.toFixed(2);
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        selectedCollege,
        faculty,
        selectedDepartments,
        date,
        category,
        totalCost: calculateTotalCost(),
        equipment: equipmentList
      };
      console.log('Request Body:', requestBody);
      const response = await axios.post(`http://localhost:8080/`, requestBody);

      if (response.status === 200) {
        console.log('Form submitted successfully');
        alert('Form submitted successfully');
        setFaculty('');
        setSelectedDepartments('');
        setDate('');
        setEquipmentList([{ id: 1, equipment: '', specification: '', unitprice: '', quantity: '', cost: '' }]);
      } else {
        console.error('Failed to submit form:', response.data);
        alert('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <div className="equipment-form">
      <h2>Equipment Purchase Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Selected College:</label>
          <select value={college} onChange={(e) => setSelectedCollege(e.target.value)} disabled>
            <option value="SKASC">SKASC</option>
            <option value="SKCT">SKCT</option>
            <option value="SKCET">SKCET</option>
            <option value="SKACAS">SKACAS</option>
          </select>
        </div>
        <div className="form-group">
          <label>Name of the Faculty:</label>
          <input type="text" value={faculty} onChange={e => setFaculty(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Department:</label>
          <select
            value={selectedDepartments}
            onChange={handleDepartmentChanges}>
            <option value=" ">Select Department</option>
            {departmentOptions.map((department, index) => (
              <option key={index} value={department}>{department}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Date of Purchase:</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <div>
            <label>
              <input type="radio" value="recurring" checked={category === 'recurring'} onChange={() => setCategory('recurring')} />
              Recurring
            </label>
            <label>
              <input type="radio" value="non-recurring" checked={category === 'non-recurring'} onChange={() => setCategory('non-recurring')} />
              Non-recurring
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Equipment List:</label>
          {equipmentList.map(equipment => (
            <div key={equipment.id} className="equipment-item">
              <input type="text" placeholder="Equipment" value={equipment.equipment} onChange={e => {
                const updatedList = [...equipmentList];
                updatedList.find(item => item.id === equipment.id).equipment = e.target.value;
                setEquipmentList(updatedList);
              }} required />
              <input type="text" placeholder="Specification" value={equipment.specification} onChange={e => {
                const updatedList = [...equipmentList];
                updatedList.find(item => item.id === equipment.id).specification = e.target.value;
                setEquipmentList(updatedList);
              }} required />
              <input type="number" placeholder="Unit Price" value={equipment.unitprice} onChange={e => {
                const updatedList = [...equipmentList];
                updatedList.find(item => item.id === equipment.id).unitprice = e.target.value;
                updatedList.find(item => item.id === equipment.id).cost = (parseFloat(e.target.value || 0) * parseFloat(updatedList.find(item => item.id === equipment.id).quantity || 0)).toFixed(2);
                setEquipmentList(updatedList);
              }} required />
              <input type="number" placeholder="Quantity" value={equipment.quantity} onChange={e => {
                const updatedList = [...equipmentList];
                updatedList.find(item => item.id === equipment.id).quantity = e.target.value;
                updatedList.find(item => item.id === equipment.id).cost = (parseFloat(updatedList.find(item => item.id === equipment.id).unitprice || 0) * parseFloat(e.target.value || 0)).toFixed(2);
                setEquipmentList(updatedList);
              }} required />
              <input type="text" placeholder="Cost" value={equipment.cost} readOnly />
              <button type="button" className='remove-btn' onClick={() => handleRemoveEquipment(equipment.id)}>Remove</button>
            </div>
          ))}
          <button type="button" className='add-btn' onClick={handleAddEquipment}>Add Equipment</button>
        </div>
        <div className="form-group">
          <label>Total Cost:</label>
          <input type="text" value={calculateTotalCost()} readOnly />
        </div>
        <div className="form-group">
          <label>Comments:</label>
          <textarea />
        </div>
        <button className='submit-btn' type="submit">Submit</button>
      </form>

      <style>
        {`
          .equipment-form {
            max-width: 800px;
            margin: 40px auto;
            padding: 30px;
            background-color: #f8f9fa;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }

          h2 {
            text-align: center;
            color: #343a40;
            margin-bottom: 30px;
          }

          .form-group {
            margin-bottom: 20px;
          }

          label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #495057;
          }

          input[type="text"],
          input[type="number"],
          input[type="date"],
          textarea,
          select {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            box-sizing: border-box;
          }

          .radio-group {
            display: flex;
            gap: 20px;
          }

          .radio-group label {
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          .radio-group input[type="radio"] {
            margin-right: 8px;
          }

          .equipment-item {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 10px;
            align-items: center;
            margin-bottom: 10px;
          }

          .remove-btn,
          .add-btn,
          .submit-btn {
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.3s;
          }

          .remove-btn {
            background-color: #dc3545;
            color: white;
          }

          .add-btn {
            background-color: #28a745;
            color: white;
            margin-top: 10px;
          }

          .submit-btn {
            background-color: #007bff;
            color: white;
            width: 100%;
            font-size: 16px;
            margin-top: 20px;
          }

          .remove-btn:hover,
          .add-btn:hover,
          .submit-btn:hover {
            opacity: 0.9;
          }

          @media (max-width: 768px) {
            .equipment-item {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>
    </div>
  );
};

export default EquipmentForm;
