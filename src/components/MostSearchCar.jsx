import FakeData from '@/Shared/FakeData'
import React, { useEffect, useState } from 'react'
import CarItem from './CarItem'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Service from '@/Shared/Service'
import { db } from './../../configs'
import { CarImages, CarListing } from './../../configs/schema'
import { desc, eq } from 'drizzle-orm'

function MostSearchCar() {

  const [carList, setCarList]=useState([]);
  useEffect(()=>{
    GetPopularCarList()
  },[])

    const GetPopularCarList=async()=>{
      const result = await db.select().from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.CarListingId))
        .orderBy(desc(CarListing.id))
        .limit(10)

        const resp=Service.FormatResult(result);
        
        setCarList(resp);
    }

  useEffect(()=>{
    GetPopularCarList()
  },[])
  return (
    <div className='px-2 mx-24'>
        <h2 className='font-bold text-3xl text-center mt-16 mb-7 text-white'>Most Search Car</h2>

      <Carousel>
        <CarouselContent>    
          {carList && carList.map((car, index)=>(
            <CarouselItem key={index} className='basis-1/4'>
            <CarItem car={car} />
            </CarouselItem>
        ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default MostSearchCar