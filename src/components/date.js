import React, { useState } from 'react';

const styles = {
  section: {
    marginBottom: '10px',
  },
  label: {
    marginRight: '10px',
  },
  input: {
    marginRight: '10px',
  },
};

const DateSelector = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Function to get today's date in yyyy-mm-dd format
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

  return (
    <div style={styles.section}>
      <label style={styles.label}>From:</label>
      <input
        type="date"
        value={dateFrom}
        onChange={handleDateFromChange}
        style={styles.input}
      />
      <label style={styles.label}>To:</label>
      <input
        type="date"
        value={dateTo}
        onChange={handleDateToChange}
        style={styles.input}
      />
    </div>
  );
};

export default DateSelector;
