import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { db } from '../../../configs';
import { CarImages } from './../../../configs/schema';
import { eq } from 'drizzle-orm';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload a single file to Cloudinary using unsigned upload.
 * Returns the secure_url from Cloudinary's response.
 */
async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    );

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Cloudinary upload failed (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    
    // Apply Cloudinary URL transformation for consistent 16:9 aspect ratio
    // Insert /c_fill,ar_16:9,g_auto,q_auto,f_auto/ into the URL
    const transformedUrl = data.secure_url.replace(
        '/upload/',
        '/upload/c_fill,ar_16:9,g_auto,q_auto,f_auto/'
    );
    return transformedUrl;
}

function UploadImage({triggerUploadImages, setLoader, carInfo, mode}) {

    const [selectedFileList, setSelectedFileList] = useState([])
    const [EditCarImageList, setEditCarImageList] = useState([]);

    useEffect(() => {
        if(mode == 'edit'){
            setEditCarImageList([]);
            carInfo?.images.forEach((image) => {
                setEditCarImageList(prev => [...prev, image?.imageUrl]);
            })
        }
    }, [carInfo])

    useEffect(() => {
        if(triggerUploadImages) {
            UploadImagesToServer()
        }
    }, [triggerUploadImages])

    const onFileSelected = (event) => {
        const files = event.target.files;
        const newFiles = Array.from(files);
        setSelectedFileList([...selectedFileList, ...newFiles]);
    }

    const onImageRemove = (Image) => {
        const result = selectedFileList.filter((item) => item != Image);
        setSelectedFileList(result);
    }

    const onImageRemoveFromDB = async(image, index) => {
        await db.delete(CarImages).where(eq(CarImages.id, carInfo?.images[index]?.id)).returning({id: CarImages.id});
        const imageList = EditCarImageList.filter(item => item != image);
        setEditCarImageList(imageList);
    }

    const UploadImagesToServer = async() => {
        setLoader(true);
        try {
            if (!selectedFileList || selectedFileList.length === 0) {
                // nothing to upload — still unlock loader so page doesn't freeze
                setLoader(false);
                return;
            }

            for (const file of selectedFileList) {
                // Upload to Cloudinary instead of Firebase Storage
                const downloadUrl = await uploadToCloudinary(file);
                console.log('Uploaded to Cloudinary, URL:', downloadUrl);

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
            EditCarImageList.map((Image,index) => (
                <div key={index}>
                    <IoMdCloseCircle className='absolute m-2 text-lg text-white'
                    onClick={() => onImageRemoveFromDB(Image,index)}
                    />
                    <img src={Image} className='w-full h-33 object-cover rounded-xl' />
                </div>
            ))
            }

            {selectedFileList.map((Image,index) => (
                <div key={index}>
                    <IoMdCloseCircle className='absolute m-2 text-lg text-white'
                    onClick={() => onImageRemove(Image,index)}
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