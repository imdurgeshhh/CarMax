import { Button } from '@/components/ui/button'
import Service from '@/Shared/Service';
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function OnwersDetails({ carDetails }) {

  const {user}=useUser();

  const navigation = useNavigate();


  const OnMessageOwnerButtonClick=async()=>{
    const userId=user.primaryEmailAddress.emailAddress.split('@')[0];
    const  ownerUserId=carDetails?.createdBy.split('@')[0];

    //create current user id
    try {   
      await Service.CreateSendBirdUser(userId,user?.fullName,user?.imageUrl)
      .then(resp=>{
        console.log(resp);
      })
    } catch (e) {}
    //Owner User id
    try {
      await Service.CreateSendBirdUser(ownerUserId,carDetails?.userName,carDetails?.userImageUrl)
      .then(resp=>{
        console.log(resp);
      })
    } catch (error) {}
    //create channel
    try {
      await Service.CreateSendBirdChannel([userId,ownerUserId,carDetails?.listingTitle])
      .then(resp=>{
        console.log(resp);
        console.log("Channel Created");
        navigation('/profile/inbox');
      })
    } catch (error) {
      
    }
  }
  return (
    <div className='p-5 md:p-10 border rounded-xl shadow-md mt-5 md:mt-7'>
      <h2 className='font-medium text-xl md:text-2xl mb-3'>Owner / Deals</h2>
        <img 
          src={carDetails?.userImageUrl} 
          alt="User Profile" 
          className='w-16 h-16 md:w-24 md:h-24 rounded-full object-cover'
        />
        <h2 className='mt-2 font-bold text-lg md:text-xl'>{carDetails?.userName}</h2>
        <h2 className='mt-2 text-gray-500 text-sm md:text-base break-all'>{carDetails?.createdBy}</h2>
        <Button className='w-full mt-4 md:mt-6 min-h-[44px]'
        onClick={OnMessageOwnerButtonClick}
        >Message Owner</Button>
    </div>
  )
}

export default OnwersDetails
