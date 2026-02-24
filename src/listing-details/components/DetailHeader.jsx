import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";

function DetailHeader({ carDetails }) {
  return (
    <div>
      {carDetails?.listingTitle? <div>
        <h2 className='font-bold text-3xl'>{carDetails?.listingTitle}</h2>
        <p className='text-sm'>{carDetails?.tagline}</p>

        <div className='flex gap-2 mt-3'>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3'>
            <IoCalendarOutline className='h-7 w-7 text-blue-500'/>
            <h2 className='text-blue-500 text-sm'>{carDetails?.year}</h2>
          </div>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3'>
            <BsSpeedometer2 className='h-7 w-7 text-blue-500'/>
            <h2 className='text-blue-500 text-sm'>{carDetails?.mileage}</h2>
          </div>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3'>
            <GiGearStickPattern className='h-7 w-7 text-blue-500'/>
            <h2 className='text-blue-500 text-sm'>{carDetails?.transmission}</h2>
          </div>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3'>
            <FaGasPump className='h-7 w-7 text-blue-500'/>
            <h2 className='text-blue-500 text-sm'>{carDetails?.transmission}</h2>
          </div>
        </div>
      </div>:

      <div className='w-full rounded-xl h-25 bg-slate-200 animate-pulse'>

      </div>}
    </div>
  )
}

export default DetailHeader
