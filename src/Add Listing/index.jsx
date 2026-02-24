import Header from '@/components/Header'
import React, { useEffect, useState } from 'react'
import carDetails from '../Shared/carDetails.json'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import InputField from './components/InputField'
import DropdownField from './components/DropdownField'
import { Textarea } from '@/components/ui/textarea'
import feature from '../Shared/features.json'
import { Checkbox } from "@/components/ui/checkbox"
import { db } from './../../configs'
import { CarImages, CarListing } from './../../configs/schema'
import TextAreaField from './components/TextAreaField'
import IconField from './components/IconField'
import UploadImage from './components/UploadImage'
import { BiLoaderAlt } from "react-icons/bi";
import { toast } from 'sonner'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import moment from 'moment'
import { eq } from 'drizzle-orm'
import Service from '@/Shared/Service'

function  AddListing() {

    const [formData, setFormData] = useState({});
    const [featuresData, setFeaturesData]= useState([]);
    const [triggerUploadImages,setTriggerUploadImages]=useState();
    const [searchParams]=useSearchParams();
    const [loader,setLoader]=useState(false);
    const [carInfo, setCarInfo]=useState();
    const navigate=useNavigate();
    const {user}=useUser();

    const mode=searchParams.get('mode');
    const recordId=searchParams.get('id');

    const GetListingDetail=async()=>{
        const result =await db.select().from(CarListing)
        .innerJoin(CarImages,eq(CarListing.id,CarImages.CarListingId))
        .where(eq(CarListing.id,recordId));

        const resp = Service.FormatResult(result)
        const fetched = resp && resp.length? resp[0] : null
        console.debug('[GetListingDetail] fetched', fetched, 'rawResp:', resp)
        setCarInfo(fetched)
        setFormData(resp[0]);
        setFeaturesData(resp[0].feature);
    }

    useEffect(()=>{
        if(mode=='edit')
        {
            GetListingDetail();
        }
    },[mode, recordId]);

    useEffect(() => {
        if (carInfo) {
            console.debug('[AddListing] setting formData from carInfo:', carInfo);
            setFormData(carInfo);
        }
    }, [carInfo]);



    const handleInputChange=(name,value) =>{
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))

        console.log(formData)
    }

    const handleFeatureChange=(name,value)=>{
        setFeaturesData((prevData)=>({
            ...prevData,
            [name]:value
        }))
        console.log(featuresData)
    }
    
    const onsubmit=async(e)=>{
        setLoader(true);
        e.preventDefault();
        console.log(formData);

        toast('Please Wait.....')
        if (mode=='edit') {
            const result = await db.update(CarListing).set({
                ...formData,
                    feature:featuresData,
                    createdBy:user?.primaryEmailAddress?.emailAddress || 'anonymous',
                    userName:user?.fullName,
                    userImageUrl:user?.imageUrl,
                    postedOn:moment().format('DD/MM/yyyy')
            }).where(eq(CarListing.id,recordId)).returning({id:CarListing.id});
            console.log(result);
            navigate('/profile')
            setLoader(false);
        }
        else{
            try{
                // Client-side validation for required fields
                const requiredFields = carDetails.carDetails.filter(f => f.required).map(f => f.name);
                const missing = requiredFields.filter(name => {
                    const val = formData[name];
                    return val === undefined || val === null || String(val).trim() === '';
                });
                if (missing.length > 0) {
                    toast.error(`Please fill required fields: ${missing.join(', ')}`);
                    setLoader(false);
                    return;
                }
                const insertResult=await db.insert(CarListing).values({
                    ...formData,
                    feature:featuresData,
                    createdBy:user?.primaryEmailAddress?.emailAddress || 'anonymous',
                    userName:user?.fullName,
                    userImageUrl:user?.imageUrl,
                    postedOn:moment().format('DD/MM/yyyy')

                }).returning({id:CarListing.id})

                if(insertResult && insertResult[0]?.id){
                    const listingId = insertResult[0].id;
                    
                    // Fetch carListing data
                    const carListingData = await db.select().from(CarListing).where(eq(CarListing.id, listingId));
                    
                    // Fetch carImages data
                    const carImagesData = await db.select().from(CarImages).where(eq(CarImages.CarListingId, listingId));
                    
                    const result = [carImagesData, carListingData];
                    console.log("Data Saved - carImages:", carImagesData, "carListing:", carListingData)
                    setTriggerUploadImages(listingId);
                    setLoader(false)
                }
            }catch(error){
                console.log("Error",error)
                setLoader(false);
            }
        }
    }

   

  return (
    <div> 
        <Header/>
        <div className='pt-20 px-10 md:px-20 my-10'>
            <h2 className='font-bold text-4xl'>Add New Listing</h2>
            <form className='p-10 border rounded-xl mt-10'>
                {/* Car Details */}
                <div>
                    <h2 className='font-medium text-xl mb-6'>Car Details</h2>
                    <div  className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {carDetails.carDetails.map((item, index)=>(
                            <div key={index}>
                                <label className='text-sm flex gap-2 items-center mb-1'>
                                    <IconField icon={item?.icon} />
                                    {item?.label}{item.required&&<span className='text-red-800'>*</span>}</label>
                                {item.fieldType=='text' || item.fieldType=='number'?
                                <InputField item={item} handleInputChange={handleInputChange} formData={formData}/>
                                :item.fieldType=='dropdown'
                                ?<DropdownField item={item} handleInputChange={handleInputChange} formData={formData}/>
                                :item.fieldType=='textarea'
                                ?<TextAreaField item={item} handleInputChange={handleInputChange} formData={formData}/>
                                :null}
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className='mt-6'/>
                {/* Feature List */}
                <div>
                    <h2 className='font-medium text-xl my-6'>Features</h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                        {feature.features.map((item,index)=>(
                            <div key={index} className='flex gap-2 items-center'>
                                 <Checkbox onCheckedChange={(value)=> handleFeatureChange(item.name,value)} 
                                    checked={featuresData?.[item.name]}
                                /><h2>{item.label}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Car Images */}
                <Separator className='mt-6'/>
               <UploadImage triggerUploadImages={triggerUploadImages}
               carInfo={carInfo}
               mode={mode}
               setLoader={(v)=>{setLoader(v); navigate('/profile')}}/>
                <div className='mt-10 flex justify-end'>
                    <Button type='button'
                    disabled={loader}
                    onClick={(e) =>onsubmit(e)}>
                        {!loader?'Submit':<BiLoaderAlt className='animate-spin text-lg' />}</Button>
                </div>
            </form>
             
        </div>
    </div>
  )
}

export default  AddListing