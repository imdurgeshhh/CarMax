import { Button } from '@/components/ui/button';
import { MdOutlineLocalOffer } from "react-icons/md";
import React from 'react'

function Pricing({ carDetails, isEditing, onFieldChange }) {
  const sellingPrice = carDetails?.sellingPrice;
  const originalPrice = carDetails?.originalPrice;

  return (
    <div className='p-5 md:p-10 rounded-xl border shadow-md'>
      {isEditing ? (
        <div className='space-y-4'>
          <div>
            <label className='text-xs text-gray-500 mb-1 block'>Selling Price *</label>
            <div className='flex items-center gap-1'>
              <span className='text-xl font-bold'>₹</span>
              <input
                type='text'
                value={sellingPrice || ''}
                onChange={(e) => onFieldChange('sellingPrice', e.target.value)}
                className='w-full text-2xl md:text-3xl font-bold border-b-2 border-blue-400 bg-blue-50/50 px-2 py-1 rounded-t outline-none focus:border-blue-600 transition-colors'
                placeholder='0'
              />
            </div>
          </div>
          <div>
            <label className='text-xs text-gray-500 mb-1 block'>Original Price</label>
            <div className='flex items-center gap-1'>
              <span className='text-base'>₹</span>
              <input
                type='text'
                value={originalPrice || ''}
                onChange={(e) => onFieldChange('originalPrice', e.target.value)}
                className='w-full border-b-2 border-blue-400 bg-blue-50/50 px-2 py-1 rounded-t outline-none focus:border-blue-600 transition-colors'
                placeholder='0'
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <h2 className='text-sm md:text-base'>Our Price</h2>
          <h2 className='font-bold text-2xl md:text-4xl'>{sellingPrice ? `₹${sellingPrice}` : 'Price not available'}</h2>
          {originalPrice && (
            <h2 className='text-gray-400 line-through text-sm mt-1'>₹{originalPrice}</h2>
          )}
          <Button className='w-full bg-blue-600 mt-5 md:mt-7 min-h-[44px]' size='lg'>
            <MdOutlineLocalOffer className='text-lg mr-2' /> Make an Offer Price
          </Button>
        </>
      )}
    </div>
  )
}

export default Pricing
