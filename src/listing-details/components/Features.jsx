import React from 'react'
import { FaCheck } from "react-icons/fa";

function Features({ features }) {

    console.log(features)
  return (
    <div className='mt-6'>
        <div className='p-10 bg-white rounded-xl border shadow-md my-7'>
            <h2 className='font-medium text-2xl'>Features</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-4 gap-7'>
                {features && typeof features === 'object' && !Array.isArray(features) ? (
                    Object.entries(features).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 mb-2">
                            <FaCheck className="bg-blue-100 text-blue-500 text-lg p-1 rounded-full" />
                            <span>{key}</span>
                        </div>
                    ))
                ) : Array.isArray(features) && features.length > 0 ? (
                    features.map((feature, index) => (
                        <div className="flex items-center gap-2 mb-2">
                            <FaCheck className="text-blue-500 bg-blue-100 text-lg p-1 rounded-full " />
                            <h2>{feature}</h2>
                        </div>
                    ))
                ) : (
                    <p>No features available.</p>
                )}
            </div>
        </div>
    </div>
  )
}

export default Features
