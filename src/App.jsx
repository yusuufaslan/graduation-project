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
import CreateProposal from './pages/CreateProposal/CreateProposal';
import UserProfile from './pages/UserProfile/UserProfile';
import EditProfile from './pages/EditProfile/EditProfile';
import Welcome from './pages/Welcome/Welcome';
import Verification from './pages/Verification/Verification';
import Explore from './pages/Explore/Explore';
import MyProjects from './pages/SharedProjects/MyProjects';
import ParticipatedProjects from './pages/ParticipatedProjects/ParticipatedProjects';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ProtectedRoute component
const ProtectedRoute = ({ isAuthenticated, element }) => {
  if (isAuthenticated) {
    return element;
  }
  return <Navigate to="/sign-in" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load token and check authentication on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className='w-screen h-screen'>
      <Router>
        <ToastContainer position="bottom-left" />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          <Route path='/sign-in' element={isAuthenticated ? <Navigate to="/home" replace /> : <SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/verify' element={<Verification />} />
          <Route path='/welcome' element={<Welcome />} />
          
          {/* Protected routes */}
          <Route path='/project/create' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CreateProject />} />} />
          <Route path="/project/edit/:projectId" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<EditProjectForm />} />} />
          <Route path="/project/detail/:projectId" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ProjectDetailPage />} />} />
          <Route path="/dataset/create/:projectId" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CreateDataset />} />} />
          <Route path="/proposals/:type" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ProposalsPage />} />} />
          <Route path="/proposal/create/:projectId" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CreateProposal />} />} />
          <Route path='/user-profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<UserProfile />} />} />
          <Route path='/edit-profile' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<EditProfile />} />} />
          <Route path='/home' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Home />} />} />
          <Route path='/explore' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Explore />} />} />
          <Route path='/my-projects' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<MyProjects />} />} />
          <Route path='/participated-projects' element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<ParticipatedProjects />} />} />
          
          {/* Not Found Page */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
