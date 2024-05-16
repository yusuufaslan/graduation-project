import React from 'react'

import Navbar from '../../components/header/Navbar'
import HomeContent from './HomeContent'

function About() {
  return (
    <div>
        <Navbar />
        <HomeContent signedIn={true}/>
    </div>
  )
}

export default About