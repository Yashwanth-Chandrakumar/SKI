import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
  formGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    fontWeight: '500',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    marginBottom: '12px',
    transition: 'border-color 0.3s',
  },
  tableContainer: {
    marginBottom: '20px',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHead: {
    backgroundColor: '#f2f2f2',
  },
  tableHeaderCell: {
    padding: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderBottom: '2px solid #000',
  },
  tableBody: {},
  tableRow: {
    borderBottom: '1px solid #ccc',
  },
  tableCell: {
    padding: '10px',
    fontSize: '16px',
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
  facultyInput: {
    marginRight: '10px',
    width: 'calc(100% - 10px)',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box',
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
  addButton: {
    padding: '10px 20px',
    backgroundColor: 'green',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButton: {
    display: 'block',
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: '500',
    textAlign: 'center',
    width: '100%',
    marginTop: '20px',
  },
  removeButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};
const FacultyBudget = ( {}) =>
  {
  const  college =  localStorage.getItem("college") ;
  const navigate = useNavigate();
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [eventName, setEventName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());
  const [locations, setLocations] = useState('');
  const location=useLocation();
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const uploadFile = async () => {
    // try {
    //   if (selectedFile) {
    //     const formData = new FormData();
    //     formData.append('file', selectedFile);

    //     // const response = await axios.post('http://172.20.10.3:9091/file', formData);
    //     const response = await axios.post('', formData);
    //     console.log('File upload response:', response.data);
    //     alert('Success', 'File uploaded successfully');
    //   } else {
    //     alert('Error', 'Please select a file first');
    //   }
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    //   alert('Error', 'Failed to upload file');
    // }
    
    navigate("/fileview");
  };
  // Function to check if a given date is in the past
  const isDateInPast = (selectedDate) => {
    const currentDate = getTodayDate();
    return selectedDate < currentDate;
  };

  // Handler for 'From' date input change
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
  
  const [selectedCollege, setSelectedCollege] = useState(college);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [unitPriceError, setUnitPriceError] = useState('');
const [quantityError, setQuantityError] = useState('');
  const [minDateForTo, setMinDateForTo] = useState('');
  const [rows, setRows] = useState([{ unitPrice: '', quantity: '', errors: {} }]);
  const [facultyRows, setFacultyRows] = useState([{ facultyName: '', designation: '', department: '', unitPrice: '', quantity: '', cost: '' }]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [collegeDepartments, setCollegeDepartments] = useState([]);
  const collegeDepartmentMapping = {
    SKASC: ['B.A. English Literature', 'M.A. English Literature', 'B.Sc. Mathematics', 'M.Sc. Mathematics with Big Data', 'B.Sc. Artificial Intelligence and Machine Learning', 'B.Sc. Data Science', 'M.Sc. Software Systems', 'B.Sc.Computer Technology', 'B.C.A. (Computer Applications)', 'B.Sc. Computer Science And Applications', 'B.Sc. Computer Science', 'B.Sc. Software Systems', 'B.Sc. Information Technology', 'B.Sc. Computer Science with Cognitive Systems', 'M.Sc. Information Technology', 'M.Sc. Computer Science', 'B.Sc. Electronics and Communication Systems', 'M.Sc. Electronics and Communication Systems', 'B.Sc. Costume Design and Fashion', 'B.Sc.Catering Science and Hotel Management', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'M.Sc. Microbiology', 'M.Sc. Bioinformatics', 'B.Com.(Commerce)', 'M.Com.(Commerce)', 'M.Com. International Business', 'B.Com.Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Process Service', 'B.Com. Banking and Insurance', 'B.Com. Accounting and Finance', 'B.Com. Capital Market', 'B.Com. Computer Applications', 'B.Com. Business Analytics', 'B.Com. Information Technology', 'B.Com. E Commerce', 'B.B.A. Business Administration ', 'B.B.A. Computer Applications', 'B.B.A. Logistics', 'B.Sc. Information Systems Management', 'B.Sc. Psychology', 'M.S.. (Social Work)', 'M.A. Public Administration', 'External'],
    SKCT: ['B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'Science & Humanities', 'B.E. Civil Engineering', 'B.E. Mechanical Engineering', 'B.E. Computer Science and Engineering', 'B.Tech Information Technology', 'Master of Business Administration(MBA)', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Internet of Things', 'B.Tech Cyber Security', 'B.Tech Artificial Intelligence and Machine Learning', 'External'],
    SKCET: ['B.Tech Information Technology', 'B.E. Civil Engineering', 'B.E. Computer Science and Engineering', 'B.E. Computer Science and Engineering(Cyber Security)', 'B.E. Electronics Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Computer Science and Business Systems', 'M.E. Applied Electronics', 'M.E. Computer Science And Engineering', 'Master of Business Administration(MBA)', 'M.E. Engineering Design', 'M.Tech. Computer Science and Engineering', 'External'],
    SKACAS: ['B.Sc CS', 'B.Sc CT', 'B.Sc IT', 'B.C.A', 'B.Sc AIML', 'B.Sc Data Science', 'B.Sc Mathematics', 'B.Sc Psychology', 'B.A English', 'B.Com', 'B.Com CA', 'B.Com PA', 'B.Com A & F', 'B.Com CS', 'B.Com IT', 'B.Com BPS', 'B.Com B & I', 'B.B.A CA', 'B.B.A', 'M.Sc CS', 'M.Com', 'PhD CS', 'PhD Commerce', 'PhD Mathematics', 'PhD English', 'External']
  };
  useEffect(() => {
    const newTotalCost = facultyRows.reduce((total, row) => total + (parseFloat(row.cost) || 0), 0);
    setTotalCost(newTotalCost.toFixed(2));
  }, [facultyRows]);
  
  useEffect(() => {
    if (selectedCollege) {
      setCollegeDepartments(collegeDepartmentMapping[selectedCollege] || []);
    }
  }, [selectedCollege]);
  

  const addFacultyRow = () => {
    const newId = facultyRows.length + 1;
    setFacultyRows([...facultyRows, { facultyId: newId, department: '', facultyName: '', facultyContact: '' }]);
  };

  const removeFacultyRow = (index) => {
    const updatedRows = facultyRows.filter((_, idx) => idx !== index);
    setFacultyRows(updatedRows);
  };

  const updateFacultyRow = (index, field, value) => {
    const newRows = [...facultyRows];
    newRows[index][field] = value;
    if (field === 'unitPrice' || field === 'quantity') {
      const unitPrice = parseFloat(newRows[index].unitPrice) || 0;
      const quantity = parseFloat(newRows[index].quantity) || 0;
      newRows[index].cost = (unitPrice * quantity).toFixed(2);
    }
    setFacultyRows(newRows);
    if (field === 'unitPrice' || field === 'quantity') {
      const unitPrice = parseFloat(newRows[index].unitPrice) || 0;
      const quantity = parseFloat(newRows[index].quantity) || 0;
  
      if (unitPrice < 0 || quantity < 0) {
        if (field === 'unitPrice') {
          setUnitPriceError('Unit Price should not be negative');
        } else if (field === 'quantity') {
          setQuantityError('Quantity should not be negative');
        }
        newRows[index][field] = ''; // Clear the invalid value
      } else {
        setUnitPriceError('');
        setQuantityError('');
        const cost = unitPrice * quantity;
        newRows[index].cost = isNaN(cost) ? '' : cost.toString();
      }
    }
  };
  const handleFacultyChange = (index, key, value) => {
    const updatedRows = facultyRows.map((row, idx) => {
      if (idx === index) {
        return { ...row, [key]: value };
      }
      return row;
    });
    setFacultyRows(updatedRows);
  };
  const handleDateFromSelect = (date) => {
    setDateFrom(date);
    setDateTo(date);
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    const minDateForTo = nextDate.toISOString().split('T')[0];
    setMinDateForTo(minDateForTo);
  };

  const handleDateToSelect = (date) => {
    setDateTo(date);
  };

  const handleSubmit = () => {
    console.log("Submitting:", { selectedCollege, dateFrom, dateTo, facultyRows });
  };

  
  const handleLocationsChange = (event) => {
    setLocations(event.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Faculty Budget</h1>
      
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="college">Selected College</label>
        <select
          style={styles.input}
          id="college"
          value={getCollegeName()}
          onChange={(e) => setSelectedCollege(e.target.value) }
        disabled>
          <option value={college}>{college}</option>
          <option value="SKCT">SKCT</option>
          <option value="SKCET">SKCET</option>
          <option value="SKACAS">SKACAS</option>
        </select>
      </div>
      
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="dateFrom">Date From</label>
        <input
          style={styles.input}
          type="date"
          id="dateFrom"
          onChange={handleDateFromChange}
          value={dateFrom}
          // onChange={(e) => handleDateFromSelect(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="dateTo">Date To</label>
        <input
          style={styles.input}
          type="date"
          id="dateTo"
          value={dateTo}
          onChange={handleDateToChange}
          // onChange={(e) => handleDateToSelect(e.target.value)}
          min={minDateForTo}
        />
      </div>
      <div style={styles.section}>
          <label style={styles.label}>From (Time):</label>
          <input
            type="time"
            value={selectedTimeFrom.toISOString().slice(11, 16)}
            onChange={e => handleTimeFromChange(new Date(selectedTimeFrom.toDateString() + ' ' + e.target.value))}
            style={styles.input}
            />
          <label style={styles.label}>To (Time):</label>
          <input
            type="time"
            value={selectedTimeTo.toISOString().slice(11, 16)}
            onChange={e => handleTimeToChange(new Date(selectedTimeTo.toDateString() + ' ' + e.target.value))}
            style={styles.input}
            />
        </div>
        <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableHeaderCell}>Faculty Name</th>
              <th style={styles.tableHeaderCell}>Designation</th>
              <th style={styles.tableHeaderCell}>Department</th>
              <th style={styles.tableHeaderCell}>Specification</th>
              <th style={styles.tableHeaderCell}>Unit Price</th>
              <th style={styles.tableHeaderCell}>Quantity</th>
              <th style={styles.tableHeaderCell}>Cost</th>
              <th style={styles.tableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {/* {facultyRows.map((row, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <input
                    style={styles.facultyInput}
                    type="text"
                    value={row.facultyName}
                    onChange={(e) => updateFacultyRow(index, 'facultyName', e.target.value)}
                    placeholder="Faculty Name"
                  />
                </td>
                <td style={styles.tableCell}>
                  <input
                    style={styles.facultyInput}
                    type="text"
                    value={row.designation}
                    onChange={(e) => updateFacultyRow(index, 'designation', e.target.value)}
                    placeholder="Designation"
                  />
                </td>
                <td style={styles.tableCell}>
                  <select
                    style={styles.facultyInput}
                    value={row.department}
                    onChange={(e) => updateFacultyRow(index, 'department', e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((department, deptIndex) => (
                      <option key={deptIndex} value={department}>{department}</option>
                    ))}
                  </select>
                </td>
                <td style={styles.tableCell}>
                  <input
                    style={styles.facultyInput}
                    type="text"
                    value={row.specification}
                    onChange={(e) => updateFacultyRow(index, 'specification', e.target.value)}
                    placeholder="Specification"
                  />
                </td>
                <td style={styles.tableCell}>
                  <input
                    style={styles.facultyInput}
                    type="number"
                    value={row.unitPrice}
                    
                    onChange={(e) => updateFacultyRow(index, 'unitPrice', e.target.value)}
                    placeholder="Unit Price"
                  />
                  {unitPriceError && <p style={{ color: 'red', fontSize: '12px' }}>{unitPriceError}</p>}
                </td>
                <td style={styles.tableCell}>
                  <input
                    style={styles.facultyInput}
                    type="number"
                    value={row.quantity}
                    onChange={(e) => updateFacultyRow(index, 'quantity', e.target.value)}
                    placeholder="Quantity"
                  />
                  {quantityError && <p style={{ color: 'red', fontSize: '12px' }}>{quantityError}</p>}
                </td>
                <td style={styles.tableCell}>{row.cost}</td>
                <td style={styles.tableCell}>
                  <button
                    style={styles.removeButton}
                    onClick={() => removeFacultyRow(index)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))} */}
            {facultyRows.map((row, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={styles.tableCell}>
                  <input  style={styles.facultyInput}
                    type="text"
                    value={row.facultyName}
                    onChange={(e) => updateFacultyRow(index, 'facultyName', e.target.value)}
                    placeholder="Faculty Name"
                  />
                </td>
                 <td >
                  <input style={styles.facultyInput}
                    type="text"
                    value={row.designation}
                    onChange={(e) => updateFacultyRow(index, 'designation', e.target.value)}
                    placeholder="Designation"
                  />
                </td>
                 <td >
                  <select style={styles.facultyInput}
                    value={row.department}
                    onChange={(e) => updateFacultyRow(index, 'department', e.target.value)}
                  >
                    <option value="">Select Department</option>
                    {collegeDepartments.map((department, deptIndex) => (
                      <option key={deptIndex} value={department}>{department}</option>
                    ))}
                  </select>
                </td>
                 <td >
                  <input style={styles.facultyInput}
                    type="text"
                    value={row.specification}
                    onChange={(e) => updateFacultyRow(index, 'specification', e.target.value)}
                    placeholder="Specification"
                  />
                </td>
                 <td >
                  <input style={styles.facultyInput}
                    type="number"
                    value={row.unitPrice}
                    onChange={(e) => updateFacultyRow(index, 'unitPrice', e.target.value)}
                    placeholder="Unit Price"
                  />
                  {unitPriceError && <p style={{ color: 'red', fontSize: '12px' }}>{unitPriceError}</p>}
                </td>
                 <td >
                  <input style={styles.facultyInput}
                    type="number"
                    value={row.quantity}
                    onChange={(e) => updateFacultyRow(index, 'quantity', e.target.value)}
                    placeholder="Quantity"
                  />
                  {quantityError && <p style={{ color: 'red', fontSize: '12px' }}>{quantityError}</p>}
                </td>
                 <td >{row.cost}</td>
                 <td >
                  <button
                    onClick={() => removeFacultyRow(index)}
                    style={styles.removeButton}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      <button style={styles.addButton} onClick={addFacultyRow}>
        <span style={styles.addButtonText}>Add Faculty</span>
      </button>
        <div style={{ ...styles.formGroup, marginTop: '20px'} }>
  <label style={styles.label} htmlFor="totalCost">Faculty Financial Request</label>
  <input
    style={styles.input}
    type="text"
    id="totalCost"
    value={`₹${totalCost}`}
    readOnly
  />

      
      <div style={styles.formGroup}>
      <label style={styles.label}>Type of Activity</label>
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
        <option value="Competitve_exam">Competitive Exam</option>
        <option value="Career_counselling">Career Counselling</option>
        <option value="Professional_development">Professional Development</option>
        <option value="Administrative_training">Administrative Training</option>
        <option value="Outreach_event">Extension and Outreach Event</option>
      </select>
    </div>

        <div style={styles.section}>
          <label style={styles.label}>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
            style={styles.input}
            />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Institute Name:</label>
          <input
            type="text"
            value={instituteName}
            onChange={e => setInstituteName(e.target.value)}
            style={styles.input}
            />
        </div>

      <div style={styles.formGroup}>
      <label style={styles.label}>Location</label>
      <textarea value={locations} onChange={e => setLocations(e.target.value)} style={styles.textarea}/>
     </div>
      
  
   <div style={styles.section}>
          <label style={styles.label}>Document:</label>
         
          <button type="button" onClick={uploadFile} style={styles.button}>Upload</button>
        </div>
</div>
      <button style={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default FacultyBudget;
