import React from 'react'
import { Textarea } from "@/components/ui/textarea"

function TextAreaField({ item, handleInputChange, formData }) {
  return (
    <div>
      <Textarea onChange={(e) => handleInputChange(item.name, e.target.value)}
        required={item.required}
        value={formData?.[item?.name] ?? ''}
      />
    </div>
  )
}

export default TextAreaField
