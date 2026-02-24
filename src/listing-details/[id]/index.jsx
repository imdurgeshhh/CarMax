import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DetailHeader from '../components/DetailHeader'
import { db } from './../../../configs';
import { CarImages, CarListing } from './../../../configs/schema';
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';
import ImageGallery from '../components/ImageGallery';
import Description from '../components/Description';
import Features from '../components/Features';
import Pricing from '../components/Pricing';
import Specification from '../components/Specification';
import OnwersDetails from '../components/OnwersDetails';
import Footer from '@/components/Footer';
import FinanacialCalculator from '../components/FinanacialCalculator';
import MostSearchCar from '@/components/MostSearchCar';

function ListingDetails() {
  const {id}=useParams();
  const [carDetails,setDetails]=useState();

  useEffect(()=>{
    GetCarDetails();
  },[])
  
  const GetCarDetails=async()=>{
      const result = await db.select().from(CarListing)
      .innerJoin(CarImages,eq(CarListing.id,CarImages.CarListingId))
      .where(eq(CarListing.id,id));

      const resp=Service.FormatResult(result);
      setDetails(resp[0]);
  }

  return (
    <div>
        <Header/>

        <div className='mt-16 p-10 md:p-20'>
            {/* header Detail component */}
            <DetailHeader carDetails={carDetails}/>

          <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5'>
            {/* left */}
            <div className='md:col-span-2'>

              {/* image gallery */}
              <ImageGallery carDetails={carDetails}/>

              {/* Description */}
              <Description carDetails={carDetails}/>
              {/* Feature List */}
              <Features features={carDetails?.feature}/>
              {/* Finanacial Calculator */}
              <FinanacialCalculator carDetails={carDetails?.feature}/>
            </div>
            {/* right */}
            <div>

              {/* price */}
              <Pricing carDetails={carDetails}/>

              {/* car Specification */}
              <Specification carDetails={carDetails}/>

              {/* owner details */}
              <OnwersDetails carDetails={carDetails}/>

            </div>
          </div>
          <MostSearchCar/>
        </div>
        <Footer/>
    </div>
  )
}

export default ListingDetails
