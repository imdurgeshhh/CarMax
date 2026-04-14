import { SignInButton } from '@clerk/clerk-react'
import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchCar from './components/MostSearchCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import ScrollAnimation from './components/ScrollAnimation'

function Home() {
  return (
    <div>
      <ScrollAnimation />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header/>
        <Hero/>
        <Category />
        <MostSearchCar />
        <InfoSection/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home