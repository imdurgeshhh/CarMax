import React from 'react'
import Search from './Search'
import backgroundImg from '../assets/weissach-package-3840x2160-23035.jpg'

function Hero() {
  return (
    <div className='relative w-full min-h-[60vh] md:min-h-[80vh]'>
      {/* Content layer — pushed to top ~35% instead of centered */}
      <div className='relative z-10 flex flex-col items-center px-4 md:px-10 pt-32 md:pt-40 gap-4 md:gap-5 w-full'>
            <h2 className='text-[clamp(1.4rem,3vw,2.2rem)] font-bold text-white text-center leading-tight'>Find Your Dream Car</h2>
            
            <Search/>

      </div>
    </div>
  )
}

export default Hero
