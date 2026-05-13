import Service from '@/Shared/Service';
import { db } from './../../configs';
import { CarImages, CarListing } from './../../configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '@/components/Header';
import { Search } from 'lucide-react';
import CarItem from '@/components/CarItem';

function SearchByOption() {

    const [searchParams] = useSearchParams();
    const [carList, setCarList]=useState([]);
    const condition=searchParams.get('cars');
    const make=searchParams.get('make');
    const price=searchParams.get('price');

    
    useEffect(()=>{
      GetCarList();
    },[])

    const GetCarList=async()=>{
      const result=await db.select().from(CarListing)
      .innerJoin(CarImages,eq(CarListing.id,CarImages.CarListingId))
      .where(condition!=undefined&&eq(CarListing.condition,condition))
      .where(make!=undefined&&eq(CarListing.make,make))
      .where(price!=undefined&&eq(CarListing.sellingPrice,price))

      const resp = Service.FormatResult(result);
      console.log(resp);
      setCarList(resp);
    }

  return (
     <div>
        <Header/>

        <div className='mt-15 p-4 md:p-8 lg:p-16 bg-black flex justify-center'>
            <Search/>
        </div>
        <div className='p-4 md:p-10 lg:px-20'>
            <h2 className='font-bold text-lg md:text-xl'>{condition}</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mt-5 md:mt-7'>
                {carList?.length>0? carList.map((item)=>(
                    <div key={item.id}>
                        <CarItem car={item}/>
                    </div>
                )):
                [1,2,3,4,5,6].map((item,index)=>(
                     <div key={index} className='h-[250px] md:h-75 rounded-xl bg-slate-200 animate-pulse'>

                    </div>
                ))
                }
            </div>
        </div>
    </div>
  )
}

export default SearchByOption