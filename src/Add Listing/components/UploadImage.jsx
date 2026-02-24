import { storage } from './../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from '../../components/ui/button';
import { db } from '../../../configs';
import { CarImages, CarListing } from './../../../configs/schema';
import { eq } from 'drizzle-orm';

function UploadImage({triggerUploadImages,setLoader, carInfo, mode}) {

    const [selectedFileList,setSelectedFileList]=useState([])
    const [EditCarImageList,setEditCarImageList]=useState([]);

    useEffect(()=>{
        if(mode=='edit'){
            setEditCarImageList([]);
            carInfo?.images.forEach((image)=>{
                setEditCarImageList(prev=>[...prev,image?.imageUrl]);
                
            })
        }
    },[carInfo])

    useEffect(()=>{
        if(triggerUploadImages)
        {
            UploadImagesToServer()
        }
    },[triggerUploadImages])

    const onFileSelected=(event)=>{
        const files=event.target.files;
        const newFiles = Array.from(files);
        setSelectedFileList([...selectedFileList, ...newFiles]);
    }

    const onImageRemove=(Image)=>{
        const result = selectedFileList.filter((item)=>item!=Image);
        setSelectedFileList(result);
    }
    const onImageRemoveFromDB=async(image, index) =>{

        await db.delete(CarImages).where(eq(CarImages.id,carInfo?.images[index]?.id)).returning({id:CarImages.id});
        const imageList= EditCarImageList.filter(item=>item!=image);
        setEditCarImageList(imageList);
    }

     const UploadImagesToServer=async()=>{
        setLoader(true);
        try {
            if (!selectedFileList || selectedFileList.length === 0) {
                // nothing to upload
                return;
            }

            for (const file of selectedFileList) {
                const ext = (file.name && file.name.split('.').pop()) || 'jpeg';
                const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
                const storageRef = ref(storage, 'Car-Marketplace/' + fileName);
                const metaData = {
                    contentType: file.type || 'image/jpeg'
                };

                await uploadBytes(storageRef, file, metaData);
                const downloadUrl = await getDownloadURL(storageRef);
                console.log('Uploaded and got URL:', downloadUrl);

                await db.insert(CarImages).values({
                    imageUrl: downloadUrl,
                    CarListingId: triggerUploadImages
                });
            }
        } catch (err) {
            console.error('Error uploading images:', err);
        } finally {
            setLoader(false);
        }
    }

  return (
    <div>
        <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>

            {mode=='edit' &&
            EditCarImageList.map((Image,index)=> (
                <div key={index}>
                    <IoMdCloseCircle className='absolute m-2 text-lg text-white'
                    onClick={()=>onImageRemoveFromDB(Image,index)}
                    />
                    <img src={Image} className='w-full h-33 object-cover rounded-xl' />
                </div>
            ))
            }

            {selectedFileList.map((Image,index)=> (
                <div key={index}>
                    <IoMdCloseCircle className='absolute m-2 text-lg text-white'
                    onClick={()=>onImageRemove(Image,index)}
                    />
                    <img src={URL.createObjectURL(Image)} className='w-full h-33 object-cover rounded-xl' />
                </div>
            ))}

            <label htmlFor='upload-images'>
                <div className='border rounded-xl border-dotted border-blue-600 bg-blue-100 p-10 cursor-pointer hover:shadow-md'>
                    <h2 className='text-lg text-center text-blue-600'>+</h2>
                </div>
            </label>
            <input type="file" multiple={true} id='upload-images'
            onChange={onFileSelected}
            className='opacity-0'
            />
        </div>

    </div>
  )
}

export default UploadImage