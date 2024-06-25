import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkbox = ({ checked, onChange, value }) => {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      value={value}
    />
  );
};

const BudgetForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { college } = location.state;
  const [selectedCollege, setSelectedCollege] = useState(college);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('00:00');
  const [selectedTimeTo, setSelectedTimeTo] = useState('00:00');
  const [duration, setDuration] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [selectedActivityAffiliation, setSelectedActivityAffiliation] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [departmentSelections, setDepartmentSelections] = useState({});
  const [facultyName, setFacultyName] = useState('');
  const [facultyNumber, setFacultyNumber] = useState('');
  const [comment, setComment] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [nextSno, setNextSno] = useState(2);
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const [academicYearSelections, setAcademicYearSelections] = useState({
    firstYear: false,
    secondYear: false,
    thirdYear: false,
    finalYear: false,
  });

  useEffect(() => {
    const collegeName = getCollegeName();
    const departments = collegeDepartmentMapping[collegeName] || [];
    setDepartmentOptions(departments);
  }, [selectedCollege]);

  const [rows, setRows] = useState([{ SNO: 1, equipmentList: '', specification: '', unitPrice: '', quantity: '', cost: '' }]);
  const [resourceRows, setResourceRows] = useState([{ resourceName: '', designation: '', companyDetails: '', contactNumber: '' }]);
  const [totalBudget, setTotalBudget] = useState(0);

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

  const collegeDepartmentMapping = {
    SKASC: ['B.A. English Literature', 'M.A. English Literature', 'B.Sc. Mathematics', 'M.Sc. Mathematics with Big Data', 'B.Sc. Artificial Intelligence and Machine Learning', 'B.Sc. Data Science', 'M.Sc. Software Systems', 'B.Sc.Computer Technology', 'B.C.A. (Computer Applications)', 'B.Sc. Computer Science And Applications', 'B.Sc. Computer Science', 'B.Sc. Software Systems', 'B.Sc. Information Technology', 'B.Sc. Computer Science with Cognitive Systems', 'M.Sc. Information Technology', 'M.Sc. Computer Science', 'B.Sc. Electronics and Communication Systems', 'M.Sc. Electronics and Communication Systems', 'B.Sc. Costume Design and Fashion', 'B.Sc.Catering Science and Hotel Management', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'M.Sc. Microbiology', 'M.Sc. Bioinformatics', 'B.Com.(Commerce)', 'M.Com.(Commerce)', 'M.Com. International Business', 'B.Com.Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Process Service', 'B.Com. Banking and Insurance', 'B.Com. Accounting and Finance', 'B.Com. Capital Market', 'B.Com. Computer Applications', 'B.Com. Business Analytics', 'B.Com. Information Technology', 'B.Com. E Commerce', 'B.B.A. Business Administration ', 'B.B.A. Computer Applications', 'B.B.A. Logistics', 'B.Sc. Information Systems Management', 'B.Sc. Psychology', 'M.S.. (Social Work)', 'M.A. Public Administration', 'External'],
    SKCT: ['B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'Science & Humanities', 'B.E. Civil Engineering', 'B.E. Mechanical Engineering', 'B.E. Computer Science and Engineering', 'B.Tech Information Technology', 'Master of Business Administration(MBA)', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Internet of Things', 'B.Tech Cyber Security', 'B.Tech Artificial Intelligence and Machine Learning', 'External'],
    SKCET: ['B.Tech Information Technology', 'B.E. Civil Engineering', 'B.E. Computer Science and Engineering', 'B.E. Computer Science and Engineering(Cyber Security)', 'B.E. Electronics Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Computer Science and Business Systems', 'M.E. Applied Electronics', 'M.E. Computer Science And Engineering', 'Master of Business Administration(MBA)', 'M.E. Engineering Design', 'M.Tech. Computer Science and Engineering', 'External'],
    SKACAS: ['B.Sc CS', 'B.Sc CT', 'B.Sc IT', 'B.C.A', 'B.Sc AIML', 'B.Sc Data Science', 'B.Sc Mathematics', 'B.Sc Psychology', 'B.A English', 'B.Com', 'B.Com CA', 'B.Com PA', 'B.Com A & F', 'B.Com CS', 'B.Com IT', 'B.Com BPS', 'B.Com B & I', 'B.B.A CA', 'B.B.A', 'M.Sc CS', 'M.Com', 'PhD CS', 'PhD Commerce', 'PhD Mathematics', 'PhD English', 'External']
  };

  useEffect(() => {
    if (selectedCollege) {
      const departments = collegeDepartmentMapping[selectedCollege] || [];
      const initialSelections = departments.reduce((selections, department) => {
        selections[department] = false;
        return selections;
      }, {});
      setDepartmentSelections(initialSelections);
    }
  }, [selectedCollege]);

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    const department = event.target.value;
    setDepartmentSelections(prevSelections => ({
      ...prevSelections,
      [department]: !prevSelections[department],
    }));
  };

  const handleAcademicYearChange = (event) => {
    const year = event.target.name;
    setAcademicYearSelections(prevSelections => ({
      ...prevSelections,
      [year]: !prevSelections[year],
    }));
  };

  const handleTimeFromChange = (event) => {
    const time = event.target.value;
    setSelectedTimeFrom(time);
    calculateDuration(time, selectedTimeTo);
  };

  const handleTimeToChange = (event) => {
    const time = event.target.value;
    setSelectedTimeTo(time);
    calculateDuration(selectedTimeFrom, time);
  };

  const calculateDuration = (from, to) => {
    const [fromHours, fromMinutes] = from.split(':').map(Number);
    const [toHours, toMinutes] = to.split(':').map(Number);
    let diff = (toHours * 60 + toMinutes) - (fromHours * 60 + fromMinutes);
    if (diff < 0) {
      diff += 24 * 60;
    }
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    setDuration(`${hours} hours ${minutes} minutes`);
  };

  const handleInputChange = (index, name, value) => {
    const newRows = [...rows];
    newRows[index][name] = value;
    // Update the cost for the current row
    const cost = (parseFloat(newRows[index].unitPrice) || 0) * (parseFloat(newRows[index].quantity) || 0);
    newRows[index].cost = isNaN(cost) ? '' : cost.toString();
    setRows(newRows);

    // Recalculate the total cost
    let total = 0;
    newRows.forEach((row) => {
      if (!isNaN(parseFloat(row.cost))) {
        total += parseFloat(row.cost);
      }
    });
    setTotalCost(total);
    if (index === newRows.length - 1) {
      setNextSno(nextSno + 1); // Increment nextSno for the next row
    }

    // Update SNO for the current row if needed
    if (name === 'sno') {
      const newSNO = index + 1; // Assuming you want 1-based indexing
      newRows[index.SNO] = newSNO;
      setRows(newRows);
    }
  };

  const handleInputChange1 = (index, name, value) => {
    const newRows = [...resourceRows];
    newRows[index][name] = value;
    setResourceRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { SNO: rows.length + 1, equipmentList: '', specification: '', unitPrice: '', quantity: '', cost: '' }]);
  };

  const handleRemoveRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);

    // Recalculate the total cost
    let total = 0;
    newRows.forEach((row) => {
      if (!isNaN(parseFloat(row.cost))) {
        total += parseFloat(row.cost);
      }
    });
    setTotalCost(total);
  };

  const handleAddRow1 = () => {
    setResourceRows([...resourceRows, { resourceName: '', designation: '', companyDetails: '', contactNumber: '' }]);
  };

  const handleRemoveRow1 = (index) => {
    const newRows = [...resourceRows];
    newRows.splice(index, 1);
    setResourceRows(newRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('selectedCollege', selectedCollege);
    formData.append('dateFrom', dateFrom);
    formData.append('dateTo', dateTo);
    formData.append('selectedDepartments', JSON.stringify(selectedDepartments));
    formData.append('selectedTimeFrom', selectedTimeFrom);
    formData.append('selectedTimeTo', selectedTimeTo);
    formData.append('duration', duration);
    formData.append('selectedActivityType', selectedActivityType);
    formData.append('selectedActivityAffiliation', selectedActivityAffiliation);
    formData.append('eventTitle', eventTitle);
    formData.append('departmentSelections', JSON.stringify(departmentSelections));
    formData.append('facultyName', facultyName);
    formData.append('facultyNumber', facultyNumber);
    formData.append('comment', comment);
    formData.append('totalCost', totalCost);
    formData.append('selectedFile', selectedFile);
    formData.append('status', status);
    formData.append('rows', JSON.stringify(rows));
    formData.append('resourceRows', JSON.stringify(resourceRows));
    formData.append('totalBudget', totalBudget);
    formData.append('academicYearSelections', JSON.stringify(academicYearSelections));

    try {
      await axios.post('http://localhost:3001/budgetForm', formData);
      navigate('/next-page');
    } catch (error) {
      console.error('Error submitting the form', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Select College:
          <select value={selectedCollege} onChange={handleCollegeChange}>
            <option value="">Select a college</option>
            <option value="skct">SKCT</option>
            <option value="skcet">SKCET</option>
            <option value="skasc">SKASC</option>
            <option value="skacas">SKACAS</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Date From:
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} required />
        </label>
        <label>
          Date To:
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Time From:
          <input type="time" value={selectedTimeFrom} onChange={handleTimeFromChange} required />
        </label>
        <label>
          Time To:
          <input type="time" value={selectedTimeTo} onChange={handleTimeToChange} required />
        </label>
      </div>
      <div>
        <label>
          Duration:
          <input type="text" value={duration} readOnly />
        </label>
      </div>
      <div>
        <label>
          Activity Type:
          <select value={selectedActivityType} onChange={(e) => setSelectedActivityType(e.target.value)} required>
            <option value="">Select an activity type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Activity Affiliation:
          <select value={selectedActivityAffiliation} onChange={(e) => setSelectedActivityAffiliation(e.target.value)} required>
            <option value="">Select an activity affiliation</option>
            <option value="affiliation1">Affiliation 1</option>
            <option value="affiliation2">Affiliation 2</option>
            <option value="affiliation3">Affiliation 3</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Event Title:
          <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Select Departments:
          {departmentOptions.map((department, index) => (
            <label key={index}>
              <Checkbox
                checked={departmentSelections[department]}
                onChange={handleDepartmentChange}
                value={department}
              />
              {department}
            </label>
          ))}
        </label>
      </div>
      <div>
        <label>
          Select Academic Years:
          <label>
            <Checkbox
              checked={academicYearSelections.firstYear}
              onChange={handleAcademicYearChange}
              name="firstYear"
            />
            First Year
          </label>
          <label>
            <Checkbox
              checked={academicYearSelections.secondYear}
              onChange={handleAcademicYearChange}
              name="secondYear"
            />
            Second Year
          </label>
          <label>
            <Checkbox
              checked={academicYearSelections.thirdYear}
              onChange={handleAcademicYearChange}
              name="thirdYear"
            />
            Third Year
          </label>
          <label>
            <Checkbox
              checked={academicYearSelections.finalYear}
              onChange={handleAcademicYearChange}
              name="finalYear"
            />
            Final Year
          </label>
        </label>
      </div>
      <div>
        <label>
          Faculty Name:
          <input type="text" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Faculty Number:
          <input type="text" value={facultyNumber} onChange={(e) => setFacultyNumber(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Comment:
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Total Cost:
          <input type="number" value={totalCost} readOnly />
        </label>
      </div>
      <div>
        <label>
          File Upload:
          <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        </label>
      </div>
      <div>
        <label>
          Equipment Details:
          {rows.map((row, index) => (
            <div key={index}>
              <label>
                SNO:
                <input
                  type="number"
                  value={row.SNO}
                  onChange={(e) => handleInputChange(index, 'SNO', e.target.value)}
                  required
                />
              </label>
              <label>
                Equipment List:
                <input
                  type="text"
                  value={row.equipmentList}
                  onChange={(e) => handleInputChange(index, 'equipmentList', e.target.value)}
                  required
                />
              </label>
              <label>
                Specification:
                <input
                  type="text"
                  value={row.specification}
                  onChange={(e) => handleInputChange(index, 'specification', e.target.value)}
                  required
                />
              </label>
              <label>
                Unit Price:
                <input
                  type="number"
                  value={row.unitPrice}
                  onChange={(e) => handleInputChange(index, 'unitPrice', e.target.value)}
                  required
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                  required
                />
              </label>
              <label>
                Cost:
                <input
                  type="number"
                  value={row.cost}
                  readOnly
                />
              </label>
              <button type="button" onClick={() => handleRemoveRow(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddRow}>Add Row</button>
        </label>
      </div>
      <div>
        <label>
          Resource Person Details:
          {resourceRows.map((row, index) => (
            <div key={index}>
              <label>
                Resource Name:
                <input
                  type="text"
                  value={row.resourceName}
                  onChange={(e) => handleInputChange1(index, 'resourceName', e.target.value)}
                  required
                />
              </label>
              <label>
                Designation:
                <input
                  type="text"
                  value={row.designation}
                  onChange={(e) => handleInputChange1(index, 'designation', e.target.value)}
                  required
                />
              </label>
              <label>
                Company Details:
                <input
                  type="text"
                  value={row.companyDetails}
                  onChange={(e) => handleInputChange1(index, 'companyDetails', e.target.value)}
                  required
                />
              </label>
              <label>
                Contact Number:
                <input
                  type="text"
                  value={row.contactNumber}
                  onChange={(e) => handleInputChange1(index, 'contactNumber', e.target.value)}
                  required
                />
              </label>
              <button type="button" onClick={() => handleRemoveRow1(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddRow1}>Add Row</button>
        </label>
      </div>
      <div>
        <label>
          Total Budget:
          <input type="number" value={totalBudget} onChange={(e) => setTotalBudget(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="notVerified">Not Verified</option>
            <option value="verified">Verified</option>
            <option value="approved">Approved</option>
          </select>
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BudgetForm;
