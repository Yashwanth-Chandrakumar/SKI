// CollegeContext.js
import React, { createContext, useState } from 'react';

export const CollegeContext = createContext();

export const CollegeProvider = ({ children }) => {
  const [college, setCollege] = useState('');

  return (
    <CollegeContext.Provider value={{ college, setCollege }}>
      {children}
    </CollegeContext.Provider>
  );
};
