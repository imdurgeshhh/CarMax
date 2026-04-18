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
  <div className=' justify-between p-2 md:p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-md md:rounded-full flex-col md:flex md:flex-row gap-10 px-5 items-center w-[60%]'>
    <Select onValueChange={(value)=>setCars(value)}>
      <SelectTrigger className="w-50 outline-none md:border-none shadow-none text-lg !bg-transparent text-white !border-transparent">
        <SelectValue placeholder="Cars" />
      </SelectTrigger>
      <SelectContent className='!bg-black/70 backdrop-blur-md !border-white/20'>
        <SelectItem className='!text-white !focus:bg-white/20 hover:!bg-white/20' value="New" >New</SelectItem>
        <SelectItem className='!text-white !focus:bg-white/20 hover:!bg-white/20' value="Used" >Used</SelectItem>
        <SelectItem className='!text-white !focus:bg-white/20 hover:!bg-white/20' value="Certified Pre-Owned" >Certified Pre-Owned</SelectItem>
      </SelectContent>
    </Select>

    <Separator orientation='vertical' className='hidden md:block'/>

    <Select onValueChange={(value)=>setMake(value)}>
      <SelectTrigger className="w-50 outline-none md:border-none shadow-none text-lg !bg-transparent text-white !border-transparent">
        <SelectValue placeholder="Car Makes" />
      </SelectTrigger>
      <SelectContent className='!bg-black/70 backdrop-blur-md !border-white/20'>
        {Data.CarMakes.map((maker) =>(
          <SelectItem className='!text-white hover:!bg-white/20' value={maker.name}>{maker.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>

    <Separator orientation='vertical' className='hidden md:block'/>

    <Select onValueChange={(value)=>setPrice(value)}>
      <SelectTrigger className="w-50 outline-none md:border-none shadow-none text-lg !bg-transparent text-white !border-transparent">
        <SelectValue placeholder="Pricing" />
      </SelectTrigger>
      <SelectContent className='!bg-black/70 backdrop-blur-md !border-white/20'>
        {Data.Pricing.map((price)=>
        <SelectItem className='!text-white hover:!bg-white/20' value={price.amount} >{price.amount}</SelectItem>
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