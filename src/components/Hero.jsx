import React from 'react'
import Search from './Search'
import backgroundImg from '../assets/weissach-package-3840x2160-23035.jpg'

function Hero() {
  return (
    <div className='relative w-full min-h-[80vh]'>
      {/* Content layer without blur */}
      <div className='relative z-10 flex flex-col items-center px-10 py-20 gap-6 h-150 w-full'>
            <h2 className='text-lg text-gray-400'></h2>
            <h2 className='text-[60px] font-bold text-white'>Find Your Dream Car</h2>
            
            <Search/>

      </div>
    </div>
  )
}

export default Hero
