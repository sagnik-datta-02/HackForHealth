import { useState } from 'react'
import ResponsiveAppBar from '../components/Navbar'

import Footer from '../components/Footer'
import TheraPedia from '../components/TheraPedia'

function TheraPediaPage() {

  return (
    <div style={{background: '#EAFFF0', margin:0, padding:0, boxSizing:'border-box', minHeight:'100vh', color:'black'}}>
    
    <ResponsiveAppBar/>
    <TheraPedia/>
    <Footer/>
    </div>
  )
}

export default TheraPediaPage
