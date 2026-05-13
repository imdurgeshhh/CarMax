import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LuFuel } from "react-icons/lu";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { Separator } from '@/components/ui/separator'
import { MdOpenInNew } from "react-icons/md";
import { IoCarSportOutline } from "react-icons/io5";


function CarItem({ car }) {
  const [imgError, setImgError] = useState(false);

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

  // Resolve image URL — handle relative paths
  const rawImageUrl = car?.images?.[0]?.imageUrl;
  const imageUrl = rawImageUrl
    ? rawImageUrl.startsWith('http')
      ? rawImageUrl
      : `${import.meta.env.VITE_API_BASE_URL || ''}${rawImageUrl}`
    : null;

  // Fallback component when image fails or doesn't exist
  const ImageFallback = () => (
    <div className='w-full aspect-video bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex flex-col items-center justify-center gap-2'>
      <IoCarSportOutline className='text-gray-500 text-4xl' />
      <span className='text-gray-500 text-xs'>No Image Available</span>
    </div>
  );

  return (
    <Link to={'/listing-details/'+car?.id}>
      <div className='rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:shadow-lg cursor-pointer overflow-hidden transition-shadow duration-200 relative h-full flex flex-col'>
        <span className='absolute top-2 left-2 bg-green-500 px-2 py-0.5 rounded-full text-xs text-white z-10 font-medium'>New</span>
        {imageUrl && !imgError ? (
          <img 
            src={imageUrl} 
            className='w-full aspect-video object-cover'
            alt={title || 'car'}
            onError={() => setImgError(true)}
          />
        ) : (
          <ImageFallback />
        )}
        <div className='p-3 flex-1 flex flex-col'>
          <h2 className='font-bold text-white text-[clamp(0.8rem,1.5vw,1rem)] mb-2 whitespace-nowrap overflow-hidden text-ellipsis flex-shrink-0' title={title}>{title}</h2>
          <Separator />
          {/* Info row — separated columns with proper spacing */}
          <div className='grid grid-cols-3 mt-3 gap-2'>
            <div className='flex flex-col items-center gap-1 px-1'>
              <LuFuel className='text-sm text-white flex-shrink-0'/>
              <span className='text-white text-[0.7rem] leading-tight text-center'>{mileage}<br/>Miles</span>
            </div>
            <div className='flex flex-col items-center gap-1 px-1 border-l border-r border-white/15'>
              <IoSpeedometerOutline className='text-sm text-white flex-shrink-0' />
              <span className='text-white text-[0.7rem] leading-tight text-center'>{fuelType}</span>
            </div>
            <div className='flex flex-col items-center gap-1 px-1'>
              <GiGearStickPattern className='text-sm text-white flex-shrink-0' />
              <span className='text-white text-[0.7rem] leading-tight text-center'>{transmission}</span>
            </div>
          </div>
          <Separator className='my-2'/>
            <div className='flex items-center justify-between mt-auto'>
              <h2 className='font-bold text-base text-white'>₹{sellingPrice}</h2>
              <span className='text-blue-400 text-xs flex gap-1 items-center hover:text-blue-300 transition-colors'>
                <MdOpenInNew className='flex-shrink-0' />
                View Details
              </span>
            </div>
        </div>
      </div>
    </Link>
  )
}

export default CarItem
