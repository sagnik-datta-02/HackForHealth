import { useState } from 'react'
import ResponsiveAppBar from '../components/Navbar'

import Footer from '../components/Footer'
import ChatBotApp from '../components/ChatbotPage'

function TherapyPage() {

  return (
    <div style={{background: '#EAFFF0', margin:0, padding:0, boxSizing:'border-box', minHeight:'100vh', color:'black'}}>
    
    <ResponsiveAppBar/>
    <ChatBotApp/>
    <Footer/>
    </div>
  )
}

export default TherapyPage
