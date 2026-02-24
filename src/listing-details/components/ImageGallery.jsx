import React from 'react'

function ImageGallery({ carDetails }) {
  const imageUrl = carDetails?.images?.[0]?.imageUrl;
  return (
    <div>
        {imageUrl ? (
          <img src={imageUrl} className='w-full h-100 object-cover rounded-xl' />
        ) : (
          <div className='w-full h-75 rounded-xl bg-gray-200 flex items-center justify-center'>No Image Available</div>
        )}
    </div>
  )
}

export default ImageGallery
