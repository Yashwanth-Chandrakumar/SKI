import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';

const StudentBudget = ({  }) => {  
  const navigate = useNavigate();
  const location = useLocation();
  const  college =  localStorage.getItem("college") ;
  const [selectedCollege, setSelectedCollege] = useState(college);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [studentRows, setStudentRows] = useState([{ studentName: '', departmentSelections: '', academicYear: '' }]);
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date());
  const [selectedTimeTo, setSelectedTimeTo] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [selectedActivityType, setSelectedActivityType] = useState('');
  const [eventName, setEventName] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [budgetRequested, setBudgetRequested] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [locations, setLocations] = useState('');
  const [category, setCategory] = useState(null);
  const [showFacultyTable, setShowFacultyTable] = useState(false);
  const [facultyRows, setFacultyRows] = useState([{ facultyName: '', department: '', facultyBudget: '' }]);
  const [status, setStatus] = useState('Pending');
  const [departmentOptions, setDepartmentOptions] = useState([]);

  const handleCategoryChange = (value) => {
    if (value === 'Yes') {
      setShowFacultyTable(true);
      setFacultyRows([{ facultyName: '', department: '', facultyBudget: '' }]);
    } else {
      setShowFacultyTable(false);
      setFacultyRows([]);
    }
  };
  useEffect(() => {
    const collegeName = getCollegeName();
    const departments = collegeDepartmentMapping[collegeName] || [];
    setDepartmentOptions(departments);
  }, [selectedCollege]);
  

  const collegeDepartmentMapping = {
    SKASC: ['B.A. English Literature', 'M.A. English Literature', 'B.Sc. Mathematics', 'M.Sc. Mathematics with Big Data', 'B.Sc. Artificial Intelligence and Machine Learning', 'B.Sc. Data Science', 'M.Sc. Software Systems', 'B.Sc.Computer Technology', 'B.C.A. (Computer Applications)', 'B.Sc. Computer Science And Applications', 'B.Sc. Computer Science', 'B.Sc. Software Systems', 'B.Sc. Information Technology', 'B.Sc. Computer Science with Cognitive Systems', 'M.Sc. Information Technology', 'M.Sc. Computer Science', 'B.Sc. Electronics and Communication Systems', 'M.Sc. Electronics and Communication Systems', 'B.Sc. Costume Design and Fashion', 'B.Sc.Catering Science and Hotel Management', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'M.Sc. Microbiology', 'M.Sc. Bioinformatics', 'B.Com.(Commerce)', 'M.Com.(Commerce)', 'M.Com. International Business', 'B.Com.Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Process Service', 'B.Com. Banking and Insurance', 'B.Com. Accounting and Finance', 'B.Com. Capital Market', 'B.Com. Computer Applications', 'B.Com. Business Analytics', 'B.Com. Information Technology', 'B.Com. E Commerce', 'B.B.A. Business Administration ', 'B.B.A. Computer Applications', 'B.B.A. Logistics', 'B.Sc. Information Systems Management', 'B.Sc. Psychology', 'M.S.. (Social Work)', 'M.A. Public Administration', 'External'],
    SKCT: ['B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'Science & Humanities', 'B.E. Civil Engineering', 'B.E. Mechanical Engineering', 'B.E. Computer Science and Engineering', 'B.Tech Information Technology', 'Master of Business Administration(MBA)', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Internet of Things', 'B.Tech Cyber Security', 'B.Tech Artificial Intelligence and Machine Learning', 'External'],
    SKCET: ['B.Tech Information Technology', 'B.E. Civil Engineering', 'B.E. Computer Science and Engineering', 'B.E. Computer Science and Engineering(Cyber Security)', 'B.E. Electronics Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Computer Science and Business Systems', 'M.E. Applied Electronics', 'M.E. Computer Science And Engineering', 'Master of Business Administration(MBA)', 'M.E. Engineering Design', 'M.Tech. Computer Science and Engineering', 'External'],
    SKACAS: ['B.Sc CS', 'B.Sc CT', 'B.Sc IT', 'B.C.A', 'B.Sc AIML', 'B.Sc Data Science', 'B.Sc Mathematics', 'B.Sc Psychology', 'B.A English', 'B.Com', 'B.Com CA', 'B.Com PA', 'B.Com A & F', 'B.Com CS', 'B.Com IT', 'B.Com BPS', 'B.Com B & I', 'B.B.A CA', 'B.B.A', 'M.Sc CS', 'M.Com', 'PhD CS', 'PhD Commerce', 'PhD Mathematics', 'PhD English', 'External']
  };
  useEffect(() => {
    const collegeName = getCollegeName();
    const departments = collegeDepartmentMapping[collegeName] || [];
    setDepartmentOptions(departments);
  }, [selectedCollege]);
  const addStudentRow = () => {
    setStudentRows([...studentRows, { name: '', department: '', academicYear: '' }]);
  };

  const removeStudentRow = (index) => {
    const newRows = [...studentRows];
    newRows.splice(index, 1);
    setStudentRows(newRows);
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

  useEffect(() => {
    const collegeName = getCollegeName();
    const departments = collegeDepartmentMapping[collegeName] || [];
    setDepartmentOptions(departments);
  }, [selectedCollege]);

  const updateStudentRow = (index, field, value) => {
    const newRows = [...studentRows];
    newRows[index][field] = value;
    setStudentRows(newRows);
  };

  const handleFacultySupportRequestedChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {
      setFacultySupportRequested(text);
    }
  };

  

  const sendToDatabase = () => {
    console.log("status:", status);
  };

  const updateStatus = (value) => {
    setStatus(value);
  };

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
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

  const pickDocument = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleLocationsChange = (event) => {
    setLocations(event.target.value);
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

  const handleSubmit = async () => {
    try {
      const formattedSelectedTimeFrom = selectedTimeFrom.toLocaleTimeString('en-US', { hour12: false });
      const formattedSelectedTimeTo = selectedTimeTo.toLocaleTimeString('en-US', { hour12: false });

      const response = await fetch('http://172.20.10.3:9091/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedCollege,
          dateFrom,
          dateTo,
          student: studentRows.map(row => ({
            studentName: row.studentName,
            departmentSelections: row.departmentSelections,
            academicYear: row.academicYear,
          })),
          selectedTimeFrom: formattedSelectedTimeFrom,
          selectedTimeTo: formattedSelectedTimeTo,
          duration,
          selectedActivityType,
          eventName,
          instituteName,
          location,
          budgetRequested,
          file: selectedFile,
          category,
          faculty: facultyRows.map(row => ({
            facultyName: row.facultyName,
            department: row.department,
            facultyBudget: row.facultyBudget,
          })),
          status,
        }),
      });

      if (response.ok) {
        alert('Success', 'Details uploaded successfully');
      } else {
        alert('Error', 'Failed to upload details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error', 'Failed to upload details');
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

  return (
    <>
    <div style={styles.container}>
      <h1 style={styles.heading}>Student Budget</h1>
      <form style={styles.form}>
        <div style={styles.section}>
          <label style={styles.label}>Selected College</label>
          <select value={college} onChange={e => setSelectedCollege(e.target.value)} style={styles.input} disabled>
            <option value="SKASC">SKASC</option>
            <option value="SKCT">SKCT</option>
            <option value="SKCET">SKCET</option>
            <option value="SKACAS">SKACAS</option>
          </select>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Date From</label>
          <input type="date" value={dateFrom} onChange={handleDateFromChange} style={styles.input} />
          <label style={styles.label}>Date To</label>
          <input type="date" value={dateTo} onChange={handleDateToChange} style={styles.input} />
        </div>
        <div style={styles.studentSection}>
          <h2>Student Details</h2>
          {studentRows.map((row, index) => (
            <div key={index} style={styles.row}>
              <input
                type="text"
                placeholder="Student Name"
                value={row.studentName}
                onChange={e => updateStudentRow(index, 'studentName', e.target.value)}
                style={styles.input}
                />
              <select
                value={row.departmentSelections}
                onChange={e => updateStudentRow(index, 'departmentSelections', e.target.value)}
                style={styles.input}
                >
                <option value="">Select Department</option>
                {departmentOptions.map((department, deptIndex) => (
                  <option key={deptIndex} value={department}>{department}</option>
                ))}
              
              </select>
              <input
                type="text"
                placeholder="Year"
                value={row.academicYear}
                onChange={e => updateStudentRow(index, 'academicYear', e.target.value)}
                style={styles.input}
              />
              <button type="button" onClick={() => removeStudentRow(index)} style={styles.button}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addStudentRow} style={styles.button}>Add Student</button>
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
          <label style={styles.label}>Financial Support Requested (TA/DA,Registration Fee)</label>
          <input
            type="text"
            value={budgetRequested}
            onChange={e => setBudgetRequested(e.target.value)}
            style={styles.input}
            />
        </div>


        {/* <div style={styles.section}>
          <label style={styles.label}>Category:</label>
          <select value={category} onChange={e => handleCategoryChange(e.target.value)} style={styles.input}>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          </select>
          </div> */}

        {/* <div style={styles.section}>
          <label style={styles.label}>Status:</label>
          <select value={status} onChange={e => updateStatus(e.target.value)} style={styles.input}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          </select>
          </div> */}
        
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
          <label style={styles.label}>Attachment(upload approval letter)</label>
         
          <button type="button" onClick={uploadFile} style={styles.button}>Upload</button>
        </div>
       

       <center> <button type="button" onClick={handleSubmit} style={styles.submitButton}>Submit</button></center>
      </form>
    </div>
</>
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
    padding: '12px 24px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    fontWeight: '500',
    display: 'block',
    width: '100%',
    marginTop: '20px',
  },
  studentSection: {
    marginBottom: '25px',
  },
  facultySection: {
    marginBottom: '25px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  addButton: {
    display: 'inline-block',
    marginBottom: '10px',
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

export default StudentBudget;