

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileView from './FileView';

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
    transition: 'border-color 0.3s',
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
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    justifyContent:'center'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: 'green',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: '500',
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

const StudentBudget = () => {
  const navigate = useNavigate();
  const college = localStorage.getItem("college") || 'SKCT';
  const [selectedCollege, setSelectedCollege] = useState(college);
  const [studentRows, setStudentRows] = useState([{ studentName: '', department: '', academicYear: '' }]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [locations, setLocations] = useState('');
  const [budgetRequested, setBudgetRequested] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [eventName, setEventName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [showFacultyTable, setShowFacultyTable] = useState(false);
  const [facultyRows, setFacultyRows] = useState([{ facultyName: '', department: '', facultyBudget: '' }]);
  
  const collegeDepartmentMapping = {
    SKASC: ['B.A. English Literature', 'M.A. English Literature', 'B.Sc. Mathematics', 'M.Sc. Mathematics with Big Data', 'B.Sc. Artificial Intelligence and Machine Learning', 'B.Sc. Data Science', 'M.Sc. Software Systems', 'B.Sc.Computer Technology', 'B.C.A. (Computer Applications)', 'B.Sc. Computer Science And Applications', 'B.Sc. Computer Science', 'B.Sc. Software Systems', 'B.Sc. Information Technology', 'B.Sc. Computer Science with Cognitive Systems', 'M.Sc. Information Technology', 'M.Sc. Computer Science', 'B.Sc. Electronics and Communication Systems', 'M.Sc. Electronics and Communication Systems', 'B.Sc. Costume Design and Fashion', 'B.Sc.Catering Science and Hotel Management', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'M.Sc. Microbiology', 'M.Sc. Bioinformatics', 'B.Com.(Commerce)', 'M.Com.(Commerce)', 'M.Com. International Business', 'B.Com.Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Process Service', 'B.Com. Banking and Insurance', 'B.Com. Accounting and Finance', 'B.Com. Capital Market', 'B.Com. Computer Applications', 'B.Com. Business Analytics', 'B.Com. Information Technology', 'B.Com. E Commerce', 'B.B.A. Business Administration ', 'B.B.A. Computer Applications', 'B.B.A. Logistics', 'B.Sc. Information Systems Management', 'B.Sc. Psychology', 'M.S.. (Social Work)', 'M.A. Public Administration', 'External'],
    SKCT: ['B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'Science & Humanities', 'B.E. Civil Engineering', 'B.E. Mechanical Engineering', 'B.E. Computer Science and Engineering', 'B.Tech Information Technology', 'Master of Business Administration(MBA)', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Internet of Things', 'B.Tech Cyber Security', 'B.Tech Artificial Intelligence and Machine Learning', 'External'],
    SKCET: ['B.Tech Information Technology', 'B.E. Civil Engineering', 'B.E. Computer Science and Engineering', 'B.E. Computer Science and Engineering(Cyber Security)', 'B.E. Electronics Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Computer Science and Business Systems', 'M.E. Applied Electronics', 'M.E. Computer Science And Engineering', 'Master of Business Administration(MBA)', 'M.E. Engineering Design', 'M.Tech. Computer Science and Engineering', 'External'],
    SKACAS: ['B.Sc CS', 'B.Sc CT', 'B.Sc IT', 'B.C.A', 'B.Sc AIML', 'B.Sc Data Science', 'B.Sc Mathematics', 'B.Sc Psychology', 'B.A English', 'B.Com', 'B.Com CA', 'B.Com PA', 'B.Com A & F', 'B.Com CS', 'B.Com IT', 'B.Com BPS', 'B.Com B & I', 'B.B.A CA', 'B.B.A', 'M.Sc CS', 'M.Com', 'PhD CS', 'PhD Commerce', 'PhD Mathematics', 'PhD English', 'External']
  };

  useEffect(() => {
    setDepartmentOptions(collegeDepartmentMapping[selectedCollege] || []);
  }, [selectedCollege]);

  const toggleFileUpload = () => {
    setShowFileUpload(!showFileUpload);
  };

  const addStudentRow = () => {
    setStudentRows([...studentRows, { studentName: '', department: '', academicYear: '' }]);
  };

  const removeStudentRow = (index) => {
    const updatedRows = studentRows.filter((_, idx) => idx !== index);
    setStudentRows(updatedRows);
  };

  const updateStudentRow = (index, field, value) => {
    const newRows = [...studentRows];
    newRows[index][field] = value;
    setStudentRows(newRows);
  };
  const handleFileSubmit = (file) => {
    setSelectedFile(file);
    console.log('Received file from FileView:', file);
  };
  const handleSubmit = () => {
    console.log("Submitting form...");
    // Perform submission logic
  };


  const handleDateFromChange = (e) => {
    const selectedDate = e.target.value;
    if (!isDateInPast(selectedDate)) {
      setDateFrom(selectedDate);
    } else {
      setDateFrom(getTodayDate());
    }
  };

  const handleDateToChange = (e) => {
    const selectedDate = e.target.value;
    if (!isDateInPast(selectedDate)) {
      setDateTo(selectedDate);
    } else {
      setDateTo(getTodayDate());
    }
  };

  const handleTimeFromChange = (time) => {
    setSelectedTimeFrom(time);
    calculateDuration(time, selectedTimeTo);
  };

  const handleTimeToChange = (time) => {
    setSelectedTimeTo(time);
    calculateDuration(selectedTimeFrom, time);
  };

  const calculateDuration = (from, to) => {
    const fromTime = from.getHours() * 60 + from.getMinutes();
    const toTime = to.getHours() * 60 + to.getMinutes();
    let diff = toTime - fromTime;
    if (diff < 0) {
      diff += 24 * 60;
    }
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    setDuration(`${hours} hours ${minutes} minutes`);
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const isDateInPast = (selectedDate) => {
    const currentDate = getTodayDate();
    return selectedDate < currentDate;
  };

  const handleLocationsChange = (event) => {
    setLocations(event.target.value);
  };

  const handleCategoryChange = (value) => {
    if (value === 'Yes') {
      setShowFacultyTable(true);
      setFacultyRows([{ facultyName: '', department: '', facultyBudget: '' }]);
    } else {
      setShowFacultyTable(false);
      setFacultyRows([]);
    }
  };

  const addFacultyRow = () => {
    setFacultyRows([...facultyRows, { facultyName: '', department: '', facultyBudget: '' }]);
  };

  const removeFacultyRow = (index) => {
    const newRows = [...facultyRows];
    newRows.splice(index, 1);
    setFacultyRows(newRows);
  };

  const updateFacultyRow = (index, field, value) => {
    const newRows = [...facultyRows];
    newRows[index][field] = value;
    setFacultyRows(newRows);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Student Budget Form</h1>
      <div style={styles.formGroup}>
        <label style={styles.label}>Selected College</label>
        <select style={styles.input} value={selectedCollege} onChange={e => setSelectedCollege(e.target.value)} disabled>
          {Object.keys(collegeDepartmentMapping).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>
      <div style={styles.section}>
        <label style={styles.label}>Date From</label>
        <input type="date" value={dateFrom} onChange={handleDateFromChange} style={styles.input} />
        <label style={styles.label}>Date To</label>
        <input type="date" value={dateTo} onChange={handleDateToChange} style={styles.input} />
      </div>
      <div style={styles.section}>
        <label style={styles.label}>Time From</label>
        <input
          type="time"
          value={selectedTimeFrom.toISOString().slice(11, 16)}
          onChange={e => handleTimeFromChange(new Date(selectedTimeFrom.toDateString() + ' ' + e.target.value))}
          style={styles.input}
        />
        <label style={styles.label}>Time To</label>
        <input
          type="time"
          value={selectedTimeTo.toISOString().slice(11, 16)}
          onChange={e => handleTimeToChange(new Date(selectedTimeTo.toDateString() + ' ' + e.target.value))}
          style={styles.input}
        />
      </div>
      <label style={styles.label}>Student Details</label>
      {studentRows.map((row, index) => (
        <div key={index} style={styles.row}>
          <input
            style={styles.input}
            type="text"
            placeholder="Student Name"
            value={row.studentName}
            onChange={e => updateStudentRow(index, 'studentName', e.target.value)}
          />
          <select
            style={styles.input}
            value={row.department}
            onChange={e => updateStudentRow(index, 'department', e.target.value)}
          >
            <option value="">Select Department</option>
            {departmentOptions.map((dept, deptIndex) => (
              <option key={deptIndex} value={dept}>{dept}</option>
            ))}
          </select>
          <input
            style={styles.input}
            type="text"
            placeholder="Academic Year"
            value={row.academicYear}
            onChange={e => updateStudentRow(index, 'academicYear', e.target.value)}
          />
          <button onClick={() => removeStudentRow(index)} style={styles.removeButton}>Remove</button>
        </div>
      ))}
      <button onClick={addStudentRow} style={styles.addButton}>Add Student</button>
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
          <label style={styles.label}>Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={e => setEventName(e.target.value)}
            style={styles.input}
            />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Institute Name</label>
          <input
            type="text"
            value={instituteName}
            onChange={e => setInstituteName(e.target.value)}
            style={styles.input}
            />
        </div>
      <div style={styles.section}>
        <label style={styles.label}>Location</label>
        <textarea value={locations} onChange={handleLocationsChange} style={styles.textarea}></textarea>
      </div>
      <div style={styles.section}>
        <label style={styles.label}>Financial Support Requested (TA/DA, Registration Fee)</label>
        <input
          type="text"
          value={budgetRequested}
          onChange={e => setBudgetRequested(e.target.value)}
          style={styles.input}
        />
      </div>
      <div className="formGroup">
        <label className="label">Whether faculty accompanying with students?</label>
        <div style={{ flexDirection: 'row', alignItems: 'center' }}>
          <input
            type="radio"
            value="Yes"
            checked={showFacultyTable}
            onChange={() => handleCategoryChange('Yes')}
          />
          <span>Yes</span>
        </div>
        <div style={{ flexDirection: 'row', alignItems: 'center' }}>
          <input
            type="radio"
            value="No"
            checked={!showFacultyTable}
            onChange={() => handleCategoryChange('No')}
          />
          <span>No</span>
        </div>
      </div>
      {showFacultyTable && (
        <div style={styles.facultySection}>
          <h2>Faculty Details</h2>
          {facultyRows.map((row, index) => (
            <div key={index} style={styles.row}>
              <input
                type="text"
                placeholder="Faculty Name"
                value={row.facultyName}
                onChange={e => updateFacultyRow(index, 'facultyName', e.target.value)}
                style={styles.input}
              />
              <select
                value={row.department}
                onChange={e => updateFacultyRow(index, 'department', e.target.value)}
                style={styles.input}
              >
                <option value="">Select Department</option>
                {departmentOptions.map((department, deptIndex) => (
                  <option key={deptIndex} value={department}>{department}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Faculty Budget"
                value={row.facultyBudget}
                onChange={e => updateFacultyRow(index, 'facultyBudget', e.target.value)}
                style={styles.input}
              />
              <button type="button" onClick={() => removeFacultyRow(index)} style={styles.button}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addFacultyRow} style={styles.button}>Add Faculty</button>
        </div>
      )}
      <div style={styles.section}>
          <label style={styles.label}>Document:</label>
          <button type="button" onClick={toggleFileUpload} style={styles.button}>
          {showFileUpload ? "Hide Upload" : "Show Upload"}
        </button>
        {showFileUpload && <FileView onFileSubmit={handleFileSubmit}/>}
        </div>
      <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>
    </div>
  );
};

export default StudentBudget;
