import IconField from '@/Add Listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

function Specification({ carDetails }) {
    
  return (
    <div className='p-10 rounded-xl border shadow-md mt-7'>
        <h2 className='font-medium text-2xl'>Specifications</h2>
        {carDetails? CarSpecification.map((item,index)=>(
            <div key={index} className='mt-2 flex items-center justify-between'>
                <h2 className='flex gap-2'><IconField icon={item.icon}/>{item.label}</h2>
                <h2>{carDetails?.[item.name] || 'N/A'}</h2>
            </div>
        )):
        <div className='w-full h-125 rounded-xl bg-slate-200 animate-pulse'>

        </div>
        }
        {/* {carDetails?.length>0&&carDetails.map((CarItem,index)=>(
            <div>
                <IconField icon={CarSpecification[index].icon}/>
            </div>
        ))} */}
    </div>
  )
}

export default Specification
