import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignInPage/SignIn'
import SignUp from './pages/SignUpPage/SignUp'
import NewProjectForm from './pages/CreateProject/NewProjectForm'
import NewDatasetForm from './pages/CreateDataset/NewDatasetForm'
import EditProjectForm from './pages/EditProject/EditProjectForm'
import Welcome from './pages/Welcome/Welcome'


function App() {
  return (
    <div className='w-screen h-screen'>
      <Router>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/project/create' element={<NewProjectForm />} />
          <Route path="/edit-project/:projectId" element={<EditProjectForm />} />
          <Route path="/create-dataset/:projectId" element={<NewDatasetForm />} />
          <Route path='/welcome' element={<Welcome />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
