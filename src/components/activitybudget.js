import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FileView from './FileView'; // Adjust the path according to your project structure

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
  const college = localStorage.getItem("college");

  const [selectedCollege, setSelectedCollege] = useState(college);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);

  const [selectedTimeFrom, setSelectedTimeFrom] = useState('00:00');
  const [selectedTimeTo, setSelectedTimeTo] = useState('00:00');
  const [duration, setDuration] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [selectedActivityAffiliation, setSelectedActivityAffiliation] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);

  // Beneficiary rows with individual department handling
  const [facultyName, setFacultyName] = useState('');
  const [facultyNumber, setFacultyNumber] = useState('');
  const [comment, setComment] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [unitPriceError, setUnitPriceError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [departmentSelections,setDepartmentSelections] = useState([]);
  const [unitPriceError2, setUnitPriceError2] = useState('');
  const [quantityError2, setQuantityError2] = useState('');
  const [nextSno, setNextSno] = useState(2);
  const [locations, setLocations] = useState('');
  const [departimentOptions, setDepartimentOptions] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);
  const [academicYearSelections, setAcademicYearSelections] = useState({
    firstYear: false,
    secondYear: false,
    thirdYear: false,
    finalYear: false,
  });
  const uploadFile = () => {
    setShowFileUpload(!showFileUpload);
  };
  
  useEffect(() => {
    const departments = collegeDepartmentMapping[selectedCollege] || [];
    setDepartmentOptions(departments);
  }, [selectedCollege]);
  

  const [rows, setRows] = useState([{ SNO: 1, equipmentList: '', specification: '', unitPrice: '', quantity: '', cost: '' }]);
  const [resourceRows, setResourceRows] = useState([{ resourceName: '', designation: '', companyDetails: '', contactNumber: '' }]);
  const [beneficiaryRows, setBeneficiaryRows] = useState([{ academicYear: '', department: '', unitprice: '', quantity: '' }]);
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
    let newTotal = 0;
    rows.forEach(row => {
        const cost = parseFloat(row.cost);
        if (!isNaN(cost)) {
            newTotal += cost;
        }
    });
    setTotalBudget(newTotal);
}, [rows]); // Dependency on rows ensures this recalculates every time rows change

  useEffect(() => {
    if (selectedCollege) {
      const departments = collegeDepartmentMapping[selectedCollege] || [];
      const initialSelections = departments.reduce((selections, department) => {
        selections[department] = false;
        return selections;
      }, {});
      setDepartmentSelections(initialSelections);
      setDepartmentSelections1(initialSelections);
    }
  }, [selectedCollege]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };
  const handleBeneficiaryDepartmentChange = (index, value) => {
    const updatedRows = beneficiaryRows.map((row, idx) => {
      if (index === idx) {
        return { ...row, department: value };
      }
      return row;
    });
    setBeneficiaryRows(updatedRows);
  };
  const handleDepartmentSelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedDepartments(selectedOptions);
};


  const handleDepartimentChange = (event) => {
    const department = event.target.value;
    setDepartmentSelections(prevSelections => ({
      ...prevSelections,
      [department]: !prevSelections[department],
    }));
  };

  const handleAcademicYearChange = (year) => {
    setAcademicYearSelections(prev => ({
        ...prev,
        [year]: !prev[year]
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
      newRows[index].SNO = newSNO;
      setRows(newRows);
    }
    if (name === 'unitPrice' || name === 'quantity') {
      const unitPrice = parseFloat(newRows[index].unitPrice) || 0;
      const quantity = parseFloat(newRows[index].quantity) || 0;

      if (unitPrice < 0 || quantity < 0) {
        if (name === 'unitPrice') {
          setUnitPriceError('Unit Price should not be negative');
        } else if (name === 'quantity') {
          setQuantityError('Quantity should not be negative');
        }
        newRows[index][name] = ''; // Clear the invalid value
      } else {
        setUnitPriceError('');
        setQuantityError('');
        const cost = unitPrice * quantity;
        newRows[index].cost = isNaN(cost) ? '' : cost.toString();
      }
    }
  };

  const handleInputChange1 = (index, name, value) => {
    const newRows = [...resourceRows];
    newRows[index][name] = value;
    setResourceRows(newRows);
  };

  const handleInputChange2 = (index, name, value) => {
    const newRows = [...beneficiaryRows];
    newRows[index][name] = value;
    setBeneficiaryRows(newRows);
    calculateTotalCount(newRows);
  };

  const addRow = () => {
    const newSNO = rows.length + 1; // Calculate the next SNO
    setRows([...rows, { SNO: newSNO, equipmentList: '', specification: '', unitPrice: '', quantity: '', cost: '' }]);
  };

  const addRow1 = () => {
    setResourceRows([...resourceRows, { resourceName: '', designation: '', companyDetails: '', contactNumber: '' }]);
  };
  const addRow2 = () => {
    setBeneficiaryRows([...beneficiaryRows, { academicYear: '', department: '', unitprice: '', quantity: '' }]);
  };

  const removeRow = (index, event) => {
    event.preventDefault();
    const newRows = [...rows];
    newRows.splice(index, 1);

    // Update S.No values
    const updatedRows = newRows.map((row, idx) => ({
      ...row,
      SNO: idx + 1
    }));

    setRows(updatedRows);

    let total = 0;
    updatedRows.forEach((row) => {
      if (!isNaN(parseFloat(row.cost))) {
        total += parseFloat(row.cost);
      }
    });
    setTotalCost(total);
  };

  const removeRow1 = (index) => {
    const newRows = [...resourceRows];
    newRows.splice(index, 1);
    setResourceRows(newRows);
  };
  const removeRow2 = (index, event) => {
    event.preventDefault();
    const updatedRows = [...beneficiaryRows];
    updatedRows.splice(index, 1);
    setBeneficiaryRows(updatedRows);
  };

  const updateTotal = () => {
    let total1 = 0;
    rows.forEach(row => {
      total1 += parseFloat(row.amount) || 0;
    });
    setTotalBudget(total1);
  };
  const updateCount = () => {
    let total1 = 0;
    rows.forEach(row => {
      total1 += parseFloat(row.quantity) || 0;
    });
    setTotalCount(total1);
  };
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const pickDocument = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleYearChange = (event) => {
    // Get all selected options and map them to their values
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedYears(selectedOptions);
};

  

  // Function to get today's date in yyyy-mm-dd format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Function to check if a given date is in the past
  const isDateInPast = (selectedDate) => {
    const currentDate = getTodayDate();
    return selectedDate < currentDate;
  };

  const handleDateFromChange = (e) => {
    const selectedDate = e.target.value;
    if (!isDateInPast(selectedDate)) {
      setDateFrom(selectedDate);
    } else {
      setDateFrom(getTodayDate()); // Set to today's date if a past date is selected
    }
  };

  // Handler for 'To' date input change
  const handleDateToChange = (e) => {
    const selectedDate = e.target.value;
    if (!isDateInPast(selectedDate)) {
      setDateTo(selectedDate);
    } else {
      setDateTo(getTodayDate()); // Set to today's date if a past date is selected
    }
  };

  const handleLocationsChange = (event) => {
    setLocations(event.target.value);
  };

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
  };

  const calculateTotalCount = (beneficiaryRows) => {
    let total = 0;
    beneficiaryRows.forEach(row => {
      total += parseFloat(row.quantity) || 0;
    });
    setTotalCount(total);
  };
  const handleSubmit = async () => {
    try {
      const totalAmount = rows.reduce((sum, row) => sum + parseFloat(row.cost || 0), 0);
      const data = {
        selectedCollege: selectedCollege,
        dateFrom: dateFrom,
        dateTo: dateTo,
        selectedDepartment: selectedDepartment,
        selectedTimeFrom: selectedTimeFrom,
        selectedTimeTo: selectedTimeTo,
        duration: duration,
        selectedActivityType: selectedActivityType,
        selectedActivityAffilation: selectedActivityAffiliation,  // Corrected field name
        eventTitle: eventTitle,
        academicYearSelection: selectedYears.join(', '), // Assuming backend expects comma-separated values
        facultyName: facultyName,
        facultyContactNumber: facultyNumber, // Corrected field name
        addtionalComment: comment, // Ensure this is correctly spelled if backend expects "additionalComment"
        totalAmount: totalAmount,
        status: status,
        budgetResourceItems: resourceRows.map(item => ({ // Mapping to match backend expected structure
          resourceName: item.resourceName,
          resourceDesignation: item.designation,
          companyDetails: item.companyDetails,
          companyContact: item.contactNumber
        })),
        budgetSpecItems: rows.map(row => ({
          specification: row.specification,
          unitPrice: parseFloat(row.unitPrice),
          quantity: parseInt(row.quantity, 10),
          cost: parseFloat(row.cost)
        }))
      };
  console.log(data)
      const response = await axios.post('http://localhost:8080/addBudgetFormDetails/{userID}', data);
      alert('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data: ' + error.response?.data?.message || error.message);
    }
  };
  
  // Other parts of your component remain unchanged unless they directly relate to the submission or data handling process.
  

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Activity Budget Form</h1>
      <form>
        <div style={styles.section}>
          <label style={styles.label}>College:</label>
          <select value={college} onChange={handleCollegeChange} style={styles.select} disabled>
            <option value="">Select a college</option>
            <option value="SKASC">SKASC</option>
            <option value="SKCT">SKCT</option>
            <option value="SKCET">SKCET</option>
            <option value="SKACAS">SKACAS</option>
          </select>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>From:</label>
          <input type="date" value={dateFrom} onChange={handleDateFromChange} style={styles.input} />
          <label style={styles.label}>To:</label>
          <input type="date" value={dateTo} onChange={handleDateToChange} style={styles.input} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Department:</label>
          <select value={selectedDepartment} onChange={handleDepartmentChange}>
          <option value="">Select Department</option>
          {departmentOptions.map((department, index) => (
            <option key={index} value={department}>{department}</option>
          ))}
        </select>


        </div>
        <div style={styles.section}>
          <label style={styles.label}>Time from:</label>
          <input type="time" value={selectedTimeFrom} onChange={handleTimeFromChange} style={styles.input} />
          <label style={styles.label}>Time to:</label>
          <input type="time" value={selectedTimeTo} onChange={handleTimeToChange} style={styles.input} />
          <p>Duration: {duration} </p>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Location:</label>
          <textarea value={locations} onChange={handleLocationsChange} style={styles.textarea}></textarea>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Activity Type:</label>
          <select
            value={selectedActivityType}
            onChange={(e) => setSelectedActivityType(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Activity Type</option>
            <option value="Guest Lecture">Guest Lecture</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
            <option value="VAC">VAC</option>
            <option value="industrial_visit">Industrial Visit</option>
            <option value="Online_talk">Online Talk</option>
            <option value="Alumni_talk">Alumni Talk</option>
            <option value="Sports">Sports</option>
            <option value="culturals">Culturals</option>
            <option value="Orientation_talk">Orientation Talk</option>
            <option value="Soft_skills">Soft Skills</option>
            <option value="Competitve_exam">Competitve Exam</option>
            <option value="Career_counselling">Career Counselling</option>
            <option value="Professional_development">Professional Development</option>
            <option value="Administrative_training">Administrative Training</option>
            <option value="Outreach_event">Extension and Outreach Event</option>
          </select>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Activity Affiliation:</label>
          <select
            value={selectedActivityAffiliation}
            onChange={(e) => setSelectedActivityAffiliation(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Affiliation</option>
            <option value="Club">Club</option>
            <option value="Professional Society">Professional Society</option>
            <option value="IIC">IIC</option>
            <option value="Research_development">Research and Development</option>
            <option value="IPR">IPR</option>
            <option value="IIPC">IIPC</option>
            <option value="IQAC">IQAC</option>
            <option value="Alumni_cell">Alumni Cell</option>
            <option value="training_cell">Placement and Training Cell</option>
            <option value="International_relations">Centre for International Relations</option>
            <option value="Education_cell">Higher Education Cell</option>
            <option value="Development_cell">Gender Equity and Women Development Cell</option>
            <option value="Exam_cell">Exam Cell</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Event Title:</label>
          <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} style={styles.input} />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Beneficiaries:</label>

          <div style={styles.section}>
            {beneficiaryRows.map((row, index) => (
              <div key={index} style={styles.row}>
                <select value={selectedYears} onChange={handleYearChange} style={styles.inputSmall}>
    <option value="First Year">First Year</option>
    <option value="Second Year">Second Year</option>
    <option value="Third Year">Third Year</option>
    <option value="Fourth Year">Fourth Year</option>
</select>
                {/* <select
                  style={{ ...styles.inputSmall, ...styles.facultyInput }}>
                  <option value="">Select Department</option>
                  {departimentOptions.map((department, deptIndex) => (
                    <option key={deptIndex} value={department}>{department}</option>
                  ))}
                </select> */}
               <select
              value={row.department}
              onChange={(e) => handleBeneficiaryDepartmentChange(index, e.target.value)}
            >
              <option value="">Select Department</option>
              {departmentOptions.map((department, deptIndex) => (
                <option key={deptIndex} value={department}>{department}</option>
              ))}
            </select>

                <input
                  type="text"
                  placeholder="Quantity"
                  value={row.quantity}
                  onChange={(e) => handleInputChange2(index, 'quantity', e.target.value)}
                  style={styles.inputSmall}
                />
                {quantityError && <p style={{ color: 'red', fontSize: '12px' }}>{quantityError}</p>}

                <button onClick={(event) => removeRow2(index, event)} style={styles.buttonRemove}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={addRow2} style={styles.button}>Add+</button>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Total Count:</label>
            <input
              type="text"
              value={totalCount}
              readOnly
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Resource Person:</label>
          {resourceRows.map((row, index) => (
            <div key={index} style={styles.row}>
              <input
                type="text"
                value={row.resourceName}
                onChange={(e) => handleInputChange1(index, 'resourceName', e.target.value)}
                placeholder="Name"
                style={styles.input}
              />
              <input
                type="text"
                value={row.designation}
                onChange={(e) => handleInputChange1(index, 'designation', e.target.value)}
                placeholder="Designation"
                style={styles.input}
              />
              <input
                type="text"
                value={row.companyDetails}
                onChange={(e) => handleInputChange1(index, 'companyDetails', e.target.value)}
                placeholder="Company Details"
                style={styles.input}
              />
              <input
                type="text"
                value={row.contactNumber}
                onChange={(e) => handleInputChange1(index, 'contactNumber', e.target.value)}
                placeholder="Contact Number"
                style={styles.input}
              />
              <button type="button" onClick={() => removeRow1(index)} style={styles.buttonRemove}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addRow1} style={styles.button}>Add+</button>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Budget:</label>
          {rows.map((row, index) => (
            <div key={index} style={styles.row}>
              <input
                type="text"
                placeholder='S.No'
                value={row.SNO}
                style={styles.inputSmall}
                readOnly
              />
              <input
                type="text"
                placeholder="Specification"
                value={row.specification}
                onChange={(e) => handleInputChange(index, 'specification', e.target.value)}
                style={styles.inputSmall}
              />
              <input
                type="text"
                placeholder="Unit Price"
                value={row.unitPrice}
                onChange={(e) => handleInputChange(index, 'unitPrice', e.target.value)}
                style={styles.inputSmall}
              />
              {unitPriceError && <p style={{ color: 'red', fontSize: '12px' }}>{unitPriceError}</p>}

              <input
                type="text"
                placeholder="Quantity"
                value={row.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                style={styles.inputSmall}
              />
              {quantityError && <p style={{ color: 'red', fontSize: '12px' }}>{quantityError}</p>}

              <input
                type="text"
                placeholder="Cost"
                value={row.cost}
                readOnly
                style={styles.inputSmall}
              />
              <button onClick={(event) => removeRow(index, event)} style={styles.buttonRemove}>Remove</button>
            </div>
          ))}
          <div>
            <h6 style={styles.text}> Note: Hostel food - Rs. 100/- per head, Guest refreshment - Rs. 30/- per head* </h6>
          </div>
          <button type="button" onClick={addRow} style={styles.button}>Add+</button>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Total Cost:</label>
          <input
            type="text"
            value={totalCost}
            readOnly
            style={styles.input}
          />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Faculty Coordinator:</label>
          <input type="text" value={facultyName} onChange={(e) => setFacultyName(e.target.value)} style={styles.input} />
          <label style={styles.label}>Faculty Contact Number:</label>
          <input type="text" value={facultyNumber} onChange={(e) => setFacultyNumber(e.target.value)} style={styles.input} />
        </div>
        <div style={styles.section}>
  <label style={styles.label}>Upload Document:</label>
  <button type="button" onClick={uploadFile} style={styles.button}>
    {showFileUpload ? "Hide Upload" : "Show Upload"}
  </button>
</div>
{showFileUpload && <FileView />}

        <div style={styles.section}>
          <label style={styles.label}>Comment:</label>
          <textarea value={comment} onChange={handleCommentChange} style={styles.textarea}></textarea>
        </div>
        <div style={styles.section}>
          <button type="button" onClick={handleSubmit} style={styles.button}>Submit</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    margin: '40px auto',
    padding: '30px',
    maxWidth: '900px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '28px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  section: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#555',
  },
  inputSmall: {
    width: 'calc(20% - 10px)',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ddd',
    borderRadius: '6px',
    marginRight: '10px',
    transition: 'border-color 0.3s',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    marginBottom: '12px',
    transition: 'border-color 0.3s',
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    marginBottom: '12px',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px top 50%',
    backgroundSize: '12px auto',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  checkboxLabel: {
    marginLeft: '8px',
    color: '#555',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    marginBottom: '12px',
    minHeight: '100px',
    resize: 'vertical',
  },
  inputFile: {
    width: '100%',
    marginBottom: '12px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: '500',
  },
  buttonRemove: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginLeft: '10px',
    marginBottom: '7px',
    transition: 'background-color 0.3s',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: '14px',
    color: '#666',
    marginTop: '8px',
  },
};

export default BudgetForm;
