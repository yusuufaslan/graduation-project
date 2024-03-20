import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import SignIn from './pages/SignInPage/SignIn';
import SignUp from './pages/SignUpPage/SignUp';
import NewProjectForm from './pages/CreateProject/NewProjectForm';
import NewDatasetForm from './pages/CreateDataset/NewDatasetForm';
import EditProjectForm from './pages/EditProject/EditProjectForm';
import ProjectDetailPage from './pages/ProjectDetails/ProjectDetailPage';
import Welcome from './pages/Welcome/Welcome';
import ProposalsPage from './pages/ProposalsPage/ProposalsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update isAuthenticated based on token existence
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className='w-screen h-screen'>
      <Router>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          {isAuthenticated ? (
            <>
              <Route path='/project/create' element={<NewProjectForm />} />
              <Route path="/project/edit/:projectId" element={<EditProjectForm />} />
              <Route path="/project/detail/:projectId" element={<ProjectDetailPage />} />
              <Route path="/dataset/create/:projectId" element={<NewDatasetForm />} />
              <Route path="/proposals/:type" element={<ProposalsPage />} />

              <Route path='/welcome' element={<Welcome />} />

            </>
          ) : (
            <Route path='*' element={<SignIn />} /> // Redirect to sign-in page if not authenticated
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
