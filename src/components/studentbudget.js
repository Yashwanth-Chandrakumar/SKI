import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
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
    justifyContent: 'center'
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
  const [formData, setFormData] = useState({
    selectedCollege: college,
    dateFrom: '',
    dateTo: '',
    eventName: '',
    instituteName: '',
    location: '',
    budgetRequested: '',
    activityType: '',
    status: '',
    timeFrom: '',
    timeTo: '',
    studentDetails: [{ studentName: '', studentDepartment: '', academicYear: '' }],
    facultyStudentDetails: [{ facultyName: '', facultyDepartment: '', facultyBudget: '' }],
    fileEntities: []
  });
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [showFacultyTable, setShowFacultyTable] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [duration, setDuration] = useState('');
  const fileInputRef = useRef(null);

  const collegeDepartmentMapping = {
    SKASC: ['B.A. English Literature', 'M.A. English Literature', 'B.Sc. Mathematics', 'M.Sc. Mathematics with Big Data', 'B.Sc. Artificial Intelligence and Machine Learning', 'B.Sc. Data Science', 'M.Sc. Software Systems', 'B.Sc.Computer Technology', 'B.C.A. (Computer Applications)', 'B.Sc. Computer Science And Applications', 'B.Sc. Computer Science', 'B.Sc. Software Systems', 'B.Sc. Information Technology', 'B.Sc. Computer Science with Cognitive Systems', 'M.Sc. Information Technology', 'M.Sc. Computer Science', 'B.Sc. Electronics and Communication Systems', 'M.Sc. Electronics and Communication Systems', 'B.Sc. Costume Design and Fashion', 'B.Sc.Catering Science and Hotel Management', 'B.Sc. Biotechnology', 'B.Sc. Microbiology', 'M.Sc. Microbiology', 'M.Sc. Bioinformatics', 'B.Com.(Commerce)', 'M.Com.(Commerce)', 'M.Com. International Business', 'B.Com.Corporate Secretaryship', 'B.Com. Professional Accounting', 'B.Com. Business Process Service', 'B.Com. Banking and Insurance', 'B.Com. Accounting and Finance', 'B.Com. Capital Market', 'B.Com. Computer Applications', 'B.Com. Business Analytics', 'B.Com. Information Technology', 'B.Com. E Commerce', 'B.B.A. Business Administration ', 'B.B.A. Computer Applications', 'B.B.A. Logistics', 'B.Sc. Information Systems Management', 'B.Sc. Psychology', 'M.S.. (Social Work)', 'M.A. Public Administration', 'External'],
    SKCT: ['B.E. Electronics and Communication Engineering', 'B.E. Electrical and Electronics Engineering', 'Science & Humanities', 'B.E. Civil Engineering', 'B.E. Mechanical Engineering', 'B.E. Computer Science and Engineering', 'B.Tech Information Technology', 'Master of Business Administration(MBA)', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Internet of Things', 'B.Tech Cyber Security', 'B.Tech Artificial Intelligence and Machine Learning', 'External'],
    SKCET: ['B.Tech Information Technology', 'B.E. Civil Engineering', 'B.E. Computer Science and Engineering', 'B.E. Computer Science and Engineering(Cyber Security)', 'B.E. Electronics Engineering', 'B.E. Electronics and Communication Engineering', 'B.E. Mechanical Engineering', 'B.E. Mechatronics Engineering', 'B.Tech.Artificial Intelligence And Data Science', 'B.Tech. Computer Science and Business Systems', 'M.E. Applied Electronics', 'M.E. Computer Science And Engineering', 'Master of Business Administration(MBA)', 'M.E. Engineering Design', 'M.Tech. Computer Science and Engineering', 'External'],
    SKACAS: ['B.Sc CS', 'B.Sc CT', 'B.Sc IT', 'B.C.A', 'B.Sc AIML', 'B.Sc Data Science', 'B.Sc Mathematics', 'B.Sc Psychology', 'B.A English', 'B.Com', 'B.Com CA', 'B.Com PA', 'B.Com A & F', 'B.Com CS', 'B.Com IT', 'B.Com BPS', 'B.Com B & I', 'B.B.A CA', 'B.B.A', 'M.Sc CS', 'M.Com', 'PhD CS', 'PhD Commerce', 'PhD Mathematics', 'PhD English', 'External']
  };

  useEffect(() => {
    setDepartmentOptions(collegeDepartmentMapping[formData.selectedCollege] || []);
  }, [formData.selectedCollege]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleArrayChange = (e, index, arrayName) => {
    const { name, value } = e.target;
    const newArray = [...formData[arrayName]];
    newArray[index] = { ...newArray[index], [name]: value };
    setFormData({
      ...formData,
      [arrayName]: newArray
    });
  };

  const addArrayItem = (arrayName, newItem) => {
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], newItem]
    });
  };

  const removeArrayItem = (arrayName, index) => {
    const newArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [arrayName]: newArray
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newFiles = Array.from(files).map(file => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = () => {
          resolve({
            fileName: file.name,
            fileType: file.type,
            data: reader.result.split(',')[1] // Base64 encoded string
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newFiles).then(files => {
      setFormData({
        ...formData,
        fileEntities: [...formData.fileEntities, ...files]
      });
    }).catch(error => {
      console.error('Error reading files', error);
    });
  };

  const handleFileSubmit = (file) => {
    setSelectedFile(file);
    console.log('Received file from FileView:', file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('formData', JSON.stringify(formData));

    if (fileInputRef.current) {
      Array.from(fileInputRef.current.files).forEach((file) => {
        formDataToSubmit.append('files', file);
      });
    }
    console.log(formDataToSubmit)
    const token = localStorage.getItem("token")
    axios.post('http://localhost:5000/addStudentFormDetails', formDataToSubmit, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
      });
  };

  const handleDateFromChange = (e) => {
    const selectedDate = e.target.value;
    if (!isDateInPast(selectedDate)) {
      setFormData({ ...formData, dateFrom: selectedDate });
    } else {
      setFormData({ ...formData, dateFrom: getTodayDate() });
    }
  };

  const handleDateToChange = (e) => {
    const selectedDate = e.target.value;
    if (!isDateInPast(selectedDate)) {
      setFormData({ ...formData, dateTo: selectedDate });
    } else {
      setFormData({ ...formData, dateTo: getTodayDate() });
    }
  };

  const handleTimeFromChange = (e) => {
    const selectedTime = e.target.value;
    setFormData({ ...formData, timeFrom: selectedTime });
    calculateDuration(selectedTime, formData.timeTo);
  };

  const handleTimeToChange = (e) => {
    const selectedTime = e.target.value;
    setFormData({ ...formData, timeTo: selectedTime });
    calculateDuration(formData.timeFrom, selectedTime);
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

  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const isDateInPast = (selectedDate) => {
    const currentDate = getTodayDate();
    return selectedDate < currentDate;
  };

  const handleCategoryChange = (value) => {
    if (value === 'Yes') {
      setShowFacultyTable(true);
      setFormData({
        ...formData,
        facultyStudentDetails: [{ facultyName: '', facultyDepartment: '', facultyBudget: '' }]
      });
    } else {
      setShowFacultyTable(false);
      setFormData({ ...formData, facultyStudentDetails: [] });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Student Budget Form</h1>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Selected College</label>
          <select style={styles.input} name="selectedCollege" value={formData.selectedCollege} onChange={handleChange} disabled>
            {Object.keys(collegeDepartmentMapping).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Date From</label>
          <input type="date" name="dateFrom" value={formData.dateFrom} onChange={handleDateFromChange} style={styles.input} />
          <label style={styles.label}>Date To</label>
          <input type="date" name="dateTo" value={formData.dateTo} onChange={handleDateToChange} style={styles.input} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Time From</label>
          <input type="time" name="timeFrom" value={formData.timeFrom} onChange={handleTimeFromChange} style={styles.input} />
          <label style={styles.label}>Time To</label>
          <input type="time" name="timeTo" value={formData.timeTo} onChange={handleTimeToChange} style={styles.input} />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Student Details</label>
          {formData.studentDetails.map((student, index) => (
            <div key={index} style={styles.row}>
              <input
                style={styles.input}
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={student.studentName}
                onChange={e => handleArrayChange(e, index, 'studentDetails')}
              />
              <select
                style={styles.input}
                name="studentDepartment"
                value={student.studentDepartment}
                onChange={e => handleArrayChange(e, index, 'studentDetails')}
              >
                <option value="">Select Department</option>
                {departmentOptions.map((dept, deptIndex) => (
                  <option key={deptIndex} value={dept}>{dept}</option>
                ))}
              </select>
              <input
                style={styles.input}
                type="text"
                name="academicYear"
                placeholder="Academic Year"
                value={student.academicYear}
                onChange={e => handleArrayChange(e, index, 'studentDetails')}
              />
              <button type="button" onClick={() => removeArrayItem('studentDetails', index)} style={styles.removeButton}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem('studentDetails', { studentName: '', studentDepartment: '', academicYear: '' })} style={styles.addButton}>Add Student</button>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Type of Activity</label>
          <select
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
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
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Institute Name</label>
          <input
            type="text"
            name="instituteName"
            value={formData.instituteName}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Location</label>
          <textarea
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={styles.textarea}
          ></textarea>
        </div>
        <div style={styles.section}>
          <label style={styles.label}>Financial Support Requested (TA/DA, Registration Fee)</label>
          <input
            type="number"
            name="budgetRequested"
            value={formData.budgetRequested}
            onChange={handleChange}
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
            {formData.facultyStudentDetails.map((faculty, index) => (
              <div key={index} style={styles.row}>
                <input
                  type="text"
                  name="facultyName"
                  placeholder="Faculty Name"
                  value={faculty.facultyName}
                  onChange={e => handleArrayChange(e, index, 'facultyStudentDetails')}
                  style={styles.input}
                />
                <select
                  name="facultyDepartment"
                  value={faculty.facultyDepartment}
                  onChange={e => handleArrayChange(e, index, 'facultyStudentDetails')}
                  style={styles.input}
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((department, deptIndex) => (
                    <option key={deptIndex} value={department}>{department}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="facultyBudget"
                  placeholder="Faculty Budget"
                  value={faculty.facultyBudget}
                  onChange={e => handleArrayChange(e, index, 'facultyStudentDetails')}
                  style={styles.input}
                />
                <button type="button" onClick={() => removeArrayItem('facultyStudentDetails', index)} style={styles.button}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('facultyStudentDetails', { facultyName: '', facultyDepartment: '', facultyBudget: '' })} style={styles.button}>Add Faculty</button>
          </div>
        )}
        <div style={styles.section}>
          <label style={styles.label}>Document:</label>
          <button type="button" onClick={() => setShowFileUpload(!showFileUpload)} style={styles.button}>
            {showFileUpload ? "Hide Upload" : "Show Upload"}
          </button>
          {showFileUpload && <FileView onFileSubmit={handleFileSubmit} />}
        </div>
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default StudentBudget;
