import { Button } from '@/components/ui/button';
import { MdOutlineLocalOffer } from "react-icons/md";
import React from 'react'

function Pricing({ carDetails }) {
  const sellingPrice = carDetails?.sellingPrice;
  return (
    <div className='p-10 rounded-xl border shadow-md'>
        <h2>Our Price</h2>
        <h2 className='font-bold text-4xl'>{sellingPrice ? `₹${sellingPrice}` : 'Price not available'}</h2>

        <Button className=' w-full bg-blue-600 mt-7'size='lg'><MdOutlineLocalOffer className='text-lg mr-2' /> Make an Offer Price</Button>
    </div>
  )
}

export default Pricing
