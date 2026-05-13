import React, { useState } from 'react'

function ImageGallery({ carDetails }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = carDetails?.images?.[0]?.imageUrl;
  return (
    <div>
        {imageUrl && !imgError ? (
          <img 
            src={imageUrl} 
            className='w-full h-[250px] md:h-[350px] lg:h-[400px] object-cover rounded-xl' 
            alt={carDetails?.listingTitle || 'Car image'}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className='w-full h-[250px] md:h-[350px] lg:h-[400px] rounded-xl bg-gray-200 flex items-center justify-center'>No Image Available</div>
        )}
    </div>
  )
}

export default ImageGallery
