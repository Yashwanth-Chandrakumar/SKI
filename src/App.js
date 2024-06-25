import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import College from './components/College';
import { CollegeProvider } from './components/CollegeContext';
import CustomDrawerAdmin from './components/CustomDrawerAdmin';
import CustomDrawerContent from './components/CustomDrawerContent';
import ErrorPage from './components/Error';
import ErrorBoundary from './components/ErrorBoundary';
import FileView from './components/FileView';
import RegisteredFormView from './components/RegisteredFormView';
import Signin from './components/Signin';
import Status from './components/Status';
import ActivityBudget from './components/activitybudget';
import BudgetFormView from './components/activitybudgetview';
import Consolidate from './components/consolidate';
import DateSelector from './components/date';
import Equipment from './components/equipment';
import EquipmentView from './components/equipmentview';
import FacultyBudget from './components/facultybudget';
import FacultyBudgetView from './components/facultybudgetview';
import Home from './components/home';
import Navbar from './components/navbar';
import SelectForm from './components/selectform';
import StudentBudget from './components/studentbudget';
import StudentBudgetView from './components/studentbudgetview';


export default function App() {
    const isAuthenticated = localStorage.getItem('token');
    
      const ProtectedRoute = ({ children }) => {
        if (isAuthenticated==="") {
          return <Navigate to="/" replace />;
        }
        return children;
      };
    return (
        <ErrorBoundary>
            <CollegeProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Signin />} />
                        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                        <Route path="/customdraweradmin" element={<ProtectedRoute><CustomDrawerAdmin /></ProtectedRoute>} />
                        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path="/selectform" element={<ProtectedRoute><SelectForm /></ProtectedRoute>} />
                        <Route path="/activitybudget" element={<ProtectedRoute><Navbar/><ActivityBudget /></ProtectedRoute>} />
                        <Route path="/facultybudget" element={<ProtectedRoute><Navbar/><FacultyBudget /></ProtectedRoute>} />
                        <Route path="/studentbudget" element={<ProtectedRoute><Navbar/><StudentBudget /></ProtectedRoute>} />
                        <Route path="/equipment" element={<ProtectedRoute><Navbar/><Equipment /></ProtectedRoute>} />
                        <Route path="/status" element={<ProtectedRoute><Navbar/><Status /></ProtectedRoute>} />
                        <Route path="/fileview" element={<ProtectedRoute><Navbar/><FileView /></ProtectedRoute>} />
                        <Route path="/customdrawercontent" element={<ProtectedRoute><Navbar/><CustomDrawerContent /></ProtectedRoute>} />
                        <Route path="/registeredformview" element={<ProtectedRoute><Navbar/><RegisteredFormView /></ProtectedRoute>} />
                        <Route path="/college" element={<ProtectedRoute><Navbar/><College /></ProtectedRoute>} />
                        <Route path="/activitybudgetview" element={<ProtectedRoute><Navbar/><BudgetFormView /></ProtectedRoute>} />
                        <Route path="/equipmentview" element={<ProtectedRoute><Navbar/><EquipmentView /></ProtectedRoute>} />
                        <Route path="/studentbudgetview" element={<ProtectedRoute><Navbar/><StudentBudgetView /></ProtectedRoute>} />
                        <Route path="/facultybudgetview" element={<ProtectedRoute><Navbar/><FacultyBudgetView /></ProtectedRoute>} />
                        <Route path="/date" element={<ProtectedRoute><Navbar/><DateSelector /></ProtectedRoute>} />
                        <Route path="/consolidate" element={<ProtectedRoute><Navbar/><Consolidate /></ProtectedRoute>} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Router>
            </CollegeProvider>
        </ErrorBoundary>
    );
}