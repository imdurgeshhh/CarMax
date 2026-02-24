import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CiSearch } from "react-icons/ci";
import Data from '../Shared/Data'
import { Link } from 'react-router-dom';

function Search() {

  const [cars, setCars]=useState(null);
  const [make, setMake]=useState(null);
  const [price, setPrice]=useState(null);

  return (
  <div className=' justify-between p-2 md:p-5 bg-white rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]'>
    <Select onValueChange={(value)=>setCars(value)}>
      <SelectTrigger className="w-50 outline-none md:border-none shadow-none text-lg bg-white">
        <SelectValue placeholder="Cars" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem  className='bg-white' value="New" >New</SelectItem>
        <SelectItem className='bg-white' value="Used" >Used</SelectItem>
        <SelectItem className='bg-white' value="Certified Pre-Owned" >Certified Pre-Owned</SelectItem>
      </SelectContent>
    </Select>

    <Separator orientation='vertical' className='hidden md:block'/>

    <Select onValueChange={(value)=>setMake(value)}>
      <SelectTrigger className="w-50 outline-none md:border-none shadow-none text-lg bg-white">
        <SelectValue placeholder="Car Makes" />
      </SelectTrigger>
      <SelectContent className=''>
        {Data.CarMakes.map((maker) =>(
          <SelectItem value={maker.name}>{maker.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Separator orientation='vertical' className='hidden md:block'/>

    <Select onValueChange={(value)=>setPrice(value)}>
      <SelectTrigger className="w-50 outline-none md:border-none shadow-none text-lg bg-white">
        <SelectValue placeholder="Priceing" />
      </SelectTrigger>
      <SelectContent className=''>
        {Data.Pricing.map((price)=>
        <SelectItem value={price.amount} >{price.amount}</SelectItem>
        )}
      </SelectContent>
    </Select>
    <Link to={'/search?cars='+cars+"&make="+make+"&price"+price}>
    <CiSearch className='text-[50px] bg-blue rounded-full p-3 hover:scale-105 transition-all cursor-pointer'/>
    </Link>
  </div>
  )
}

export default Search