import React from 'react'
import { Link } from 'react-router-dom'
import { LuFuel } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { Separator } from '@/components/ui/separator'
import { MdOpenInNew } from "react-icons/md";


function CarItem({ car }) {
  const getField = (obj, variants) => {
    if (!obj) return undefined;
    for (const v of variants) {
      if (Object.prototype.hasOwnProperty.call(obj, v)) return obj[v];
    }
    const keys = Object.keys(obj);
    for (const key of keys) {
      for (const v of variants) {
        if (key.toLowerCase() === v.toLowerCase()) return obj[key];
      }
    }
    return undefined;
  }
  
  const title = getField(car, ['listingTitle', 'listing_title', 'listingtitle', 'title']) || '';
  const mileage = getField(car, ['mileage', 'miles']) || '';
  const fuelType = getField(car, ['fuelType', 'fuel_type', 'fuel']) || '';
  const transmission = getField(car, ['transmission', 'transmission_type', 'trans']) || '';
  const sellingPrice = getField(car, ['sellingPrice', 'selling_price', 'price', 'originalPrice']) || '';


  return (
    <Link to={'/listing-details/'+car?.id}>
      <div className='rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:shadow-md cursor-pointer'>
        <h2 className='absolute m-2 bg-green-500 px-2 rounded-full text-sm text-white'>New</h2>
        {car?.images && car?.images.length > 0 ? (
          <img src={car?.images[0]?.imageUrl} width='100%' height={250}
          className='rounded-t-xl object-cover h-45'
          alt='car'
          />
        ) : (
          <div className='w-full h-64 bg-gray-300 rounded-t-xl flex items-center justify-center'>
            <span className='text-gray-500'>No Image</span>
          </div>
        )}
        <div className='p-4'>
          <h2 className='font-bold text-white text-lg mb-2 truncate'>{title}</h2>
          <Separator/>
          <div className='grid grid-cols-3 mt-5'>
            <div className='flex flex-col items-center'>
              <LuFuel className='text-lg text-white'/>
              <h2 className='text-white'>{mileage} Miles</h2>
            </div>
            <div className='flex flex-col items-center'>
              <IoSpeedometerOutline className='text-lg text-white' />
              <h2 className='text-white'>{fuelType}</h2>
            </div>
            <div className='flex flex-col items-center'>
              <GiGearStickPattern className='text-lg text-white' />
              <h2 className='text-white'>{transmission}</h2>
            </div>
          </div>
          <Separator className='my-2'/>
            <div className='flex items-center justify-between'>
              <h2 className='font-bold text-xl text-white'>₹{sellingPrice}</h2>
              <h2 className='text-blue-600 text-sm flex gap-2 items-center'>
                <MdOpenInNew />
                View Details</h2>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default CarItem
