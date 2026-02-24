import { UserButton, useUser, SignInButton } from '@clerk/clerk-react'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

function Header() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
    
    }, [isLoaded, isSignedIn, user]);

    const getEmail = () => {
        if (!user) return null;
        // common Clerk shapes
        return (
            user?.primaryEmailAddress?.emailAddress ||
            user?.primary_email_address?.email ||
            user?.emailAddresses?.[0]?.emailAddress ||
            user?.email
        );
    }

    const displayEmail = getEmail();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <div className={`flex justify-between items-center shadow-sm px-5 py-3 fixed top-0 w-full bg-white z-50 transition-transform duration-300 ${isVisible ? '' : '-translate-y-full'}`} style={{ backgroundColor: 'white' }}>
        <Link to="/">
            <img src='/logo.svg' width={150} height={90} className='cursor-pointer' />
        </Link>

        <ul className='hidden md:flex gap-16'>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer'>
                <Link to="/" style={{ color: 'black' }}>Home</Link>
            </li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Search</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>
                <Link to="/Profile" style={{ color: 'black' }}>Profile</Link>
            </li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Contact Us</li>
        </ul>

        <div className='flex items-center gap-5'>
            {isLoaded ? (
                <>
                    {isSignedIn ? (
                        <>
                            <div >
                                
                                <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonBox: 'w-8 h-8' } }} />
                            </div>
                            <Link to={'/Add Listing'}>
                                <Button className="text-white bg-blue-700">Submit Listing</Button>
                            </Link>
                        </>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <SignInButton mode="modal">
                                <Button className="text-white bg-blue-700">Sign In</Button>
                            </SignInButton>
                            <Link to={'/Add Listing'}>
                                <Button className="text-white bg-blue-700">Submit Listing</Button>
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    </div>
  )
}

export default Header
