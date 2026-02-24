import React, { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'

function CheckboxField({ item }) {
  const [checked, setChecked] = useState(false)

  return (
    <div className='flex gap-2 items-center'>
      <Checkbox
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label className='text-sm'>{item?.label}</label>
    </div>
  )
}

export default CheckboxField
