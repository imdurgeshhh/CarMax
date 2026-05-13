import React from 'react'
import { IoCalendarOutline } from "react-icons/io5";
import { BsSpeedometer2 } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { FaGasPump } from "react-icons/fa";

function DetailHeader({ carDetails, isEditing, onFieldChange }) {
  return (
    <div >
      {carDetails?.listingTitle ? <div>
        {isEditing ? (
          <div className='space-y-3'>
            <div>
              <label className='text-xs text-gray-500 mb-1 block'>Listing Title *</label>
              <input
                type='text'
                value={carDetails.listingTitle || ''}
                onChange={(e) => onFieldChange('listingTitle', e.target.value)}
                className='w-full text-xl md:text-2xl lg:text-3xl font-bold border-b-2 border-blue-400 bg-blue-50/50 px-2 py-1 rounded-t outline-none focus:border-blue-600 transition-colors'
                placeholder='Enter listing title...'
              />
            </div>
            <div>
              <label className='text-xs text-gray-500 mb-1 block'>Tagline</label>
              <input
                type='text'
                value={carDetails.tagline || ''}
                onChange={(e) => onFieldChange('tagline', e.target.value)}
                className='w-full text-sm border-b-2 border-blue-400 bg-blue-50/50 px-2 py-1 rounded-t outline-none focus:border-blue-600 transition-colors'
                placeholder='Enter tagline...'
              />
            </div>
          </div>
        ) : (
          <>
            <h2 className='font-bold text-xl md:text-2xl lg:text-3xl'>{carDetails?.listingTitle}</h2>
            <p className='text-xs md:text-sm mt-1'>{carDetails?.tagline}</p>
          </>
        )}

        <div className='flex flex-wrap gap-2 mt-3'>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3'>
            <IoCalendarOutline className='h-5 w-5 md:h-7 md:w-7 text-blue-500'/>
            <h2 className='text-blue-500 text-xs md:text-sm'>{carDetails?.year}</h2>
          </div>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3'>
            <BsSpeedometer2 className='h-5 w-5 md:h-7 md:w-7 text-blue-500'/>
            <h2 className='text-blue-500 text-xs md:text-sm'>{carDetails?.mileage}</h2>
          </div>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3'>
            <GiGearStickPattern className='h-5 w-5 md:h-7 md:w-7 text-blue-500'/>
            <h2 className='text-blue-500 text-xs md:text-sm'>{carDetails?.transmission}</h2>
          </div>
          <div className='flex gap-2 items-center bg-blue-50 rounded-full p-1 px-3'>
            <FaGasPump className='h-5 w-5 md:h-7 md:w-7 text-blue-500'/>
            <h2 className='text-blue-500 text-xs md:text-sm'>{carDetails?.fuelType}</h2>
          </div>
        </div>
      </div>:

      <div className='w-full rounded-xl h-20 md:h-25 bg-slate-200 animate-pulse'>

      </div>}
    </div>
  )
}

export default DetailHeader
