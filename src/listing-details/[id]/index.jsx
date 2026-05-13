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
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FiEdit3, FiSave, FiX } from 'react-icons/fi';

function ListingDetails() {
  const {id} = useParams();
  const {user} = useUser();
  const [carDetails, setDetails] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [editFeatures, setEditFeatures] = useState({});
  const [saving, setSaving] = useState(false);

  // Check if current user is the listing owner
  const isOwner = user?.primaryEmailAddress?.emailAddress 
    && carDetails?.createdBy === user.primaryEmailAddress.emailAddress;

  useEffect(() => {
    GetCarDetails();
  }, [])
  
  const GetCarDetails = async() => {
    const result = await db.select().from(CarListing)
      .innerJoin(CarImages, eq(CarListing.id, CarImages.CarListingId))
      .where(eq(CarListing.id, id));

    const resp = Service.FormatResult(result);
    setDetails(resp[0]);
  }

  const handleStartEdit = () => {
    // Clone current details into edit state
    setEditData({...carDetails});
    setEditFeatures(carDetails?.feature ? {...carDetails.feature} : {});
    setIsEditing(true);
  }

  const handleCancelEdit = () => {
    setEditData({});
    setEditFeatures({});
    setIsEditing(false);
  }

  const handleFieldChange = (name, value) => {
    setEditData(prev => ({...prev, [name]: value}));
  }

  const handleFeatureChange = (name, value) => {
    setEditFeatures(prev => ({...prev, [name]: value}));
  }

  const handleSave = async() => {
    // Validation — check required fields
    const requiredFields = ['listingTitle', 'sellingPrice', 'category', 'condition', 'make', 'model', 'year', 'driveType', 'transmission', 'fuelType', 'mileage', 'color', 'door', 'listingDescription'];
    const missing = requiredFields.filter(name => {
      const val = editData[name];
      return val === undefined || val === null || String(val).trim() === '';
    });
    if (missing.length > 0) {
      toast.error(`Please fill required fields: ${missing.join(', ')}`);
      return;
    }

    setSaving(true);
    try {
      await db.update(CarListing).set({
        listingTitle: editData.listingTitle,
        tagline: editData.tagline,
        originalPrice: editData.originalPrice,
        sellingPrice: editData.sellingPrice,
        category: editData.category,
        condition: editData.condition,
        make: editData.make,
        model: editData.model,
        year: editData.year,
        driveType: editData.driveType,
        transmission: editData.transmission,
        fuelType: editData.fuelType,
        mileage: editData.mileage,
        engineSize: editData.engineSize,
        cylinder: editData.cylinder,
        color: editData.color,
        door: editData.door,
        vin: editData.vin,
        offerType: editData.offerType,
        listingDescription: editData.listingDescription,
        feature: editFeatures,
      }).where(eq(CarListing.id, Number(id)));

      toast.success('Listing updated successfully!');
      setIsEditing(false);
      // Re-fetch updated data
      await GetCarDetails();
    } catch (err) {
      console.error('Error updating listing:', err);
      toast.error('Failed to update listing. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
        <Header/>

        <div className='mt-16 p-4 md:p-10 lg:p-20 bg-gray-950 text-white'>
            {/* Edit button — owner only */}
            {isOwner && !isEditing && (
              <div className='flex justify-end mb-4'>
                <Button 
                  onClick={handleStartEdit}
                  className='bg-blue-600 hover:bg-blue-500 text-white gap-2'
                >
                  <FiEdit3 /> Edit Listing
                </Button>
              </div>
            )}

            {/* header Detail component */}
            <DetailHeader 
              carDetails={isEditing ? editData : carDetails} 
              isEditing={isEditing}
              onFieldChange={handleFieldChange}
            />

          <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-6 md:mt-10 gap-5'>
            {/* left */}
            <div className='md:col-span-2'>

              {/* image gallery */}
              <ImageGallery carDetails={carDetails}/>

              {/* Description */}
              <Description 
                carDetails={isEditing ? editData : carDetails}
                isEditing={isEditing}
                onFieldChange={handleFieldChange}
              />
              {/* Feature List */}
              <Features 
                features={isEditing ? editFeatures : carDetails?.feature}
                isEditing={isEditing}
                onFeatureChange={handleFeatureChange}
              />
              {/* Finanacial Calculator */}
              <FinanacialCalculator carDetails={carDetails?.feature}/>
            </div>
            {/* right */}
            <div>

              {/* price */}
              <Pricing 
                carDetails={isEditing ? editData : carDetails}
                isEditing={isEditing}
                onFieldChange={handleFieldChange}
              />

              {/* car Specification */}
              <Specification 
                carDetails={isEditing ? editData : carDetails}
                isEditing={isEditing}
                onFieldChange={handleFieldChange}
              />

              {/* owner details */}
              <OnwersDetails carDetails={carDetails}/>

            </div>
          </div>

          {/* Floating Save/Cancel bar when editing */}
          {isEditing && (
            <div className='fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl p-4 z-50'>
              <div className='max-w-5xl mx-auto flex justify-end gap-3'>
                <Button 
                  variant='outline' 
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className='gap-2 min-h-[44px]'
                >
                  <FiX /> Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                  disabled={saving}
                  className='bg-green-600 hover:bg-green-500 text-white gap-2 min-h-[44px]'
                >
                  <FiSave /> {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          )}

          <div className='bg-gray-900 rounded-2xl py-8 mt-6 -mx-4 md:-mx-10 lg:-mx-20 px-4 md:px-10 lg:px-20'>
            <MostSearchCar/>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ListingDetails
