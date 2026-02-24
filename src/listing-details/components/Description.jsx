import React from 'react'

function Description({ carDetails }) {
  const description = carDetails?.listingDescription;
  return (
    <div>
      {carDetails?.listingDescription? <div className='p-10 rounded-xl bg-white shadow-md mt-6 border'>
        <h2 className='my-2 font-medium text-2xl '>Description</h2>
        <p>{description || 'No description available.'}</p>
      </div>:
      <div className='w-full h-25 mt-7 bg-slate-200 rounded-xl animate-pulse'>
      </div>}
    </div>
  )
}

export default Description
