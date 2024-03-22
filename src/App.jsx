import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import SignIn from './pages/SignInPage/SignIn';
import SignUp from './pages/SignUpPage/SignUp';
import CreateProject from './pages/CreateProject/CreateProject';
import CreateDataset from './pages/CreateDataset/CreateDataset';
import EditProjectForm from './pages/EditProject/EditProjectForm';
import ProjectDetailPage from './pages/ProjectDetails/ProjectDetailPage';
import Home from './pages/Welcome/Home';
import ProposalsPage from './pages/ProposalsPage/ProposalsPage';
import UserProfile from './pages/UserProfile/UserProfile';
import EditProfile from './pages/EditProfile/EditProfile'; // Import EditProfile component
import Welcome from './pages/Welcome/Welcome';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update isAuthenticated based on token existence
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className='w-screen h-screen'>
      <Router>
        <ToastContainer position="bottom-left"/>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/welcome' element={<Welcome />} />
          {isAuthenticated ? (
            <>
              <Route path='/project/create' element={<CreateProject />} />
              <Route path="/project/edit/:projectId" element={<EditProjectForm />} />
              <Route path="/project/detail/:projectId" element={<ProjectDetailPage />} />
              <Route path="/dataset/create/:projectId" element={<CreateDataset />} />
              <Route path="/proposals/:type" element={<ProposalsPage />} />
              <Route path='/user-profile' element={<UserProfile />} />
              <Route path='/edit-profile' element={<EditProfile />} /> {/* Add route for EditProfile */}
              <Route path='/home' element={<Home />} />
            </>
          ) : (
            <Route path='*' element={<SignIn />} /> // Redirect to sign-in page if not authenticated
          )}
          {/* Redirect to sign-in page if not authenticated */}
          {!isAuthenticated && <Route path='*' element={<Navigate to="/sign-in" />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
