import React from 'react'

import Footer from '../../components/footer/Footer'
import Navbar from '../../components/header/Navbar'
import FileUploadComponent from './FileUploadComponent'

function Welcome() {
  return (
    <div>
        <Navbar />
        <FileUploadComponent />
        {/* <Footer /> */}
    </div>
  )
}

export default Welcome