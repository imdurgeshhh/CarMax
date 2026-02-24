import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function DropdownField({ item, handleInputChange, formData }) {
  const value = formData?.[item?.name] ?? ''

  const onValueChange = (selectedValue) => {
    handleInputChange(item.name, selectedValue)
  }

  return (
    <div>
      <Select onValueChange={onValueChange}
        required={item.required}
        value={value}
        >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={item?.label} />
        </SelectTrigger>
        <SelectContent>
          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default DropdownField