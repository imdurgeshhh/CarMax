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

  return (
    <div className='px-4 md:px-12 lg:px-24 overflow-hidden'>
        <h2 className='font-bold text-[clamp(1.2rem,2.5vw,1.8rem)] text-center mt-8 md:mt-14 mb-4 md:mb-6 text-white'>Most Searched Cars</h2>

      <div className='relative'>
        <Carousel opts={{ align: "start", loop: false }} className='w-full'>
          <CarouselContent className='-ml-2 md:-ml-4'>    
            {carList && carList.map((car, index)=>(
              <CarouselItem key={index} className='pl-2 md:pl-4 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4'>
              <CarItem car={car} />
              </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious className='absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-10 bg-white/15 backdrop-blur-sm border-white/20 text-white hover:bg-white/25 w-9 h-9 md:w-10 md:h-10 rounded-full flex' />
          <CarouselNext className='absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-10 bg-white/15 backdrop-blur-sm border-white/20 text-white hover:bg-white/25 w-9 h-9 md:w-10 md:h-10 rounded-full flex' />
        </Carousel>
      </div>
    </div>
  )
}

export default MostSearchCar