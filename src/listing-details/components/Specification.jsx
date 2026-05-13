import IconField from '@/Add Listing/components/IconField'
import CarSpecification from '@/Shared/CarSpecification'
import carDetailsConfig from '@/Shared/carDetails.json'
import React from 'react'

function Specification({ carDetails, isEditing, onFieldChange }) {

  // Get dropdown options for a field from carDetails.json
  const getFieldConfig = (fieldName) => {
    return carDetailsConfig.carDetails.find(f => f.name === fieldName);
  }

  return (
    <div className='p-3 md:p-4 rounded-xl border shadow-md mt-5 md:mt-7'>
        <h2 className='font-medium text-base md:text-lg mb-1'>Specifications</h2>
        {carDetails ? CarSpecification.map((item, index) => {
          const config = getFieldConfig(item.name);
          const isDropdown = config?.fieldType === 'dropdown';
          const options = config?.options || [];

          return (
            <div key={index} className='mt-1 flex items-center justify-between gap-2'>
              <h2 className='flex gap-1.5 items-center text-xs md:text-sm flex-shrink-0'>
                <IconField icon={item.icon} size="sm"/>{item.label}
              </h2>
              {isEditing ? (
                isDropdown ? (
                  <select
                    value={carDetails?.[item.name] || ''}
                    onChange={(e) => onFieldChange(item.name, e.target.value)}
                    className='border-b-2 border-blue-400 bg-blue-50/50 px-2 py-1 rounded-t outline-none focus:border-blue-600 transition-colors text-sm text-right max-w-[180px]'
                  >
                    <option value=''>Select...</option>
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={config?.fieldType === 'number' ? 'number' : 'text'}
                    value={carDetails?.[item.name] || ''}
                    onChange={(e) => onFieldChange(item.name, e.target.value)}
                    className='border-b-2 border-blue-400 bg-blue-50/50 px-2 py-1 rounded-t outline-none focus:border-blue-600 transition-colors text-sm text-right max-w-[180px]'
                    placeholder={item.label}
                  />
                )
              ) : (
                <h2 className='text-xs md:text-sm text-right'>{carDetails?.[item.name] || 'N/A'}</h2>
              )}
            </div>
          );
        }):
        <div className='w-full h-[300px] md:h-125 rounded-xl bg-slate-200 animate-pulse'>

        </div>
        }
    </div>
  )
}

export default Specification
