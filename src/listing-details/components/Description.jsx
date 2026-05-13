import React from 'react'

function Description({ carDetails, isEditing, onFieldChange }) {
  const description = carDetails?.listingDescription;
  return (
    <div>
      {carDetails?.listingDescription || isEditing ? 
        <div className='p-5 md:p-10 rounded-xl bg-gray-950 shadow-md mt-4 md:mt-6 border'>
          <h2 className='my-2 font-medium text-xl md:text-2xl'>Description</h2>
          {isEditing ? (
            <textarea
              value={carDetails?.listingDescription || ''}
              onChange={(e) => onFieldChange('listingDescription', e.target.value)}
              className='w-full min-h-[120px] border-2 border-blue-400 bg-blue-50/50 px-3 py-2 rounded outline-none focus:border-blue-600 transition-colors text-sm md:text-base resize-y'
              placeholder='Enter listing description...'
            />
          ) : (
            <p className='text-sm md:text-base'>{description || 'No description available.'}</p>
          )}
        </div>
      :
      <div className='w-full h-20 md:h-25 mt-5 md:mt-7 bg-slate-200 rounded-xl animate-pulse'>
      </div>}
    </div>
  )
}

export default Description
