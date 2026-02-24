/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';

const SendBirdApplicationId=import.meta.env.VITE_SENDBIRD_APP_ID;
const SendBirdApiToken=import.meta.env.VITE_SENDBIRD_API_TOKEN;
const FormatResult=(resp)=>{
    // resp: array of rows returned by drizzle with joined tables
    // handle different casing e.g., CarListing vs carListing, CarImages vs carImages
    const resultById = {};
    const finalResult = [];

    resp.forEach((row)=>{
        const listing = row.CarListing || row.carListing || row.car_listing || row.listing;
        const image = row.CarImages || row.carImages || row.car_images || row.image || row.images;

        let listingId = listing?.id;
        if (!listingId) {
            // try from image foreign key
            listingId = image?.CarListingId || image?.carListingId || image?.car_listing_id || image?.car_listing || listingId;
        }

        if (!listingId) return; // skip rows without a listing id

        if (!resultById[listingId]) {
            resultById[listingId] = {
                car: listing || {},
                images: []
            };
        }

        if (image) {
            resultById[listingId].images.push(image);
        }
    });

    Object.values(resultById).forEach(({car, images})=>{
        finalResult.push({
            ...car,
            images
        });
    });

    return finalResult;
}

const CreateSendBirdUser=(userId,nickName,profileUrl)=>{
    
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/users',{
        user_id:userId,
        nickname:nickName,
        profile_url:profileUrl,
        issue_access_token:false
    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    });
}


const CreateSendBirdChannel=(users,title)=>{
    return axios.post('https://api-'+SendBirdApplicationId+'.sendbird.com/v3/group_channels',{
        user_ids:users,
        is_distinct:true,
        name:title,
        operator_ids:[users[0]]

    },{
        headers:{
            'Content-Type':'application/json',
            'Api-Token':SendBirdApiToken
        }
    })
}

export default{
    FormatResult,
    CreateSendBirdUser,
    CreateSendBirdChannel
}