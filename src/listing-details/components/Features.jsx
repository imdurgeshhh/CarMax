import React from 'react'
import { FaCheck } from "react-icons/fa";
import featuresConfig from '@/Shared/features.json'
import { Checkbox } from "@/components/ui/checkbox"

function Features({ features, isEditing, onFeatureChange }) {

    console.log(features)

  if (isEditing) {
    return (
      <div className='mt-4 md:mt-6 '>
       <div className='p-5 md:p-10 bg-gray-950 text-white rounded-xl border shadow-md my-5 md:my-7'>
          <h2 className='font-medium text-xl md:text-2xl mb-4'>Features</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {featuresConfig.features.map((item, index) => (
              <div key={index} className='flex gap-2 items-center min-h-[44px]'>
                <Checkbox 
                  checked={features?.[item.name] || false}
                  onCheckedChange={(value) => onFeatureChange(item.name, value)} 
                />
                <span className='text-sm md:text-base'>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='mt-4 md:mt-6'>
        <div className='p-5 md:p-10 bg-gray-950 text-white rounded-xl border border-gray-800 shadow-md my-5 md:my-7'>
            <h2 className='font-medium text-xl md:text-2xl'>Features</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 md:mt-5 lg:grid-cols-4 gap-4 md:gap-7'>
                {features && typeof features === 'object' && !Array.isArray(features) ? (
                    Object.entries(features).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 mb-1 md:mb-2">
                            <FaCheck className="bg-blue-900 text-blue-400 text-lg p-1 rounded-full flex-shrink-0" />
                            <span className='text-sm md:text-base'>{key}</span>
                        </div>
                    ))
                ) : Array.isArray(features) && features.length > 0 ? (
                    features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 mb-1 md:mb-2">
                            <FaCheck className="bg-blue-900 text-blue-400 text-lg p-1 rounded-full flex-shrink-0" />
                            <h2 className='text-sm md:text-base'>{feature}</h2>
                        </div>
                    ))
                ) : (
                    <p className='text-gray-400'>No features available.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Features
