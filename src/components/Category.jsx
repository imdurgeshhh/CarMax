import React from 'react'
import { Link } from 'react-router-dom'
import Data from '@/Shared/Data'
function Category() {
  return (
    <div className='mt-10 md:mt-20'>
        <h2 className='font-bold text-[clamp(1.2rem,2.5vw,1.8rem)] text-center mb-4 md:mb-6 text-white'>Browse By Type</h2>

        <div className='grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-3 md:gap-4 px-4 md:px-8 lg:px-20 max-w-6xl mx-auto'>
            {Data.Category.map((category, index) =>(
            <Link to={'search/'+ category.name} key={index}>
            <div className='border border-white/20 rounded-xl p-2 md:p-3 items-center flex flex-col hover:shadow-md cursor-pointer backdrop-blur-md bg-white/10 min-h-[44px] transition-all hover:bg-white/20'>
                <img src={category.icon} width={35} height={35} className='invert w-[clamp(1.5rem,3vw,2rem)]' alt={category.name} />
                <h2 className='mt-1.5 text-white text-sm md:text-base text-center leading-tight font-medium'>{category.name}</h2>
            </div>
            </Link>
            ))}
        </div>
    </div>
  )
}

export default Category