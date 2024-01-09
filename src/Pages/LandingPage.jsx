
import ResponsiveAppBar from '../components/Navbar'
import HeroSection from '../components/Hero'
import Footer from '../components/Footer'

import NewsDisplay from '../components/DisplayNews'



function LandingPage() {

  return (
    <div style={{background: '#EAFFF0', margin:0, padding:0, boxSizing:'border-box', minHeight:'100vh', color:'black'}}>
    <ResponsiveAppBar/>
    <HeroSection/>
    <NewsDisplay/>
    <Footer/>
    </div>
  )
}

export default LandingPage
