import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignInPage/SignIn'
import SignUp from './pages/SignUpPage/SignUp'

function App() {
  return (
    <div className='w-screen h-screen'>
      <Router>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
