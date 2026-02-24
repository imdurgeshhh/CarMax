import React from 'react'
import { Input } from '@/components/ui/input'

function InputField({ item, handleInputChange, formData }) {
  return (
    <div>
      <Input
        type={item?.fieldType}
        name={item?.name}
        required={item?.required}
        value={formData?.[item?.name] ?? ''}
        onChange={(e) => handleInputChange(item.name, e.target.value)}
      />
    </div>
  )
}

export default InputField