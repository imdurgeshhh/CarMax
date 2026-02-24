import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { db } from './../../../configs'
import { CarImages, CarListing } from './../../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CarItem from '@/components/CarItem'
import { FaTrashAlt } from "react-icons/fa";
import Service from '@/Shared/Service'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

function MyListing() {
    const { user, isLoaded } = useUser();
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
            GetUserCarListing();
        }
    }, [isLoaded, user?.primaryEmailAddress?.emailAddress]);

    const GetUserCarListing = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log("Fetching cars for email:", user?.primaryEmailAddress?.emailAddress);

            const result = await db.select().from(CarListing)
                .leftJoin(CarImages, eq(CarListing.id, CarImages.CarListingId))
                .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
                .orderBy(desc(CarListing.id));

            
            const resp = Service.FormatResult(result);
            setCarList(resp);
        } catch (error) {
            console.error("Error fetching cars:", error);
            setError(error.message);
            setCarList([]);
        } finally {
            setLoading(false);
        }
    };

    const DeleteCar = async (id) => {
        try {
            await db.delete(CarImages).where(eq(CarImages.CarListingId, id));
            await db.delete(CarListing).where(eq(CarListing.id, id));
            GetUserCarListing(); // Refresh the list
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl mt-6'>My Listing</h2>
                <Link to={'/Add Listing'}>
                    <Button className='rounded-lg px-4 py-2'>+ Add New Listing</Button>
                </Link>
            </div>
            
            {loading && <p className='mt-4 text-gray-500'>Loading listings...</p>}
            {error && <p className='mt-4 text-red-500'>Error: {error}</p>}
            {!loading && carList.length === 0 && !error && <p className='mt-4 text-gray-500'>No listings found. Create one!</p>}
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                {carList.map((item, index) => (
                    <div key={index}>
                        <CarItem car={item} />
                        <div className='mt-3 bg-gray-50 rounded-lg flex justify-between gap-2'>
                            <Link to={'/Add%20Listing?mode=edit&id='+item?.id} className='flex-1 h-9 text-sm'>
                                <Button variant='outline' className='flex-1 h-9 text-sm'>Edit</Button>
                            </Link>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size='icon' className='h-9 w-9 bg-red-500 text-white hover:bg-red-600'><FaTrashAlt className='h-4 w-4'/></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-gray-50">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your listing
                                            from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => DeleteCar(item.id)}>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyListing
