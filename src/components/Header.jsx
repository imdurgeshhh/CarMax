import { UserButton, useUser, SignInButton } from '@clerk/clerk-react'
import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

function Header() {
    const { isSignedIn, user, isLoaded } = useUser();
    const [isVisible, setIsVisible] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <div className={`flex justify-between items-center shadow-sm px-4 md:px-5 py-3 fixed top-0 w-full z-50 transition-transform duration-300 bg-black/60 backdrop-blur-md border-b border-white/10 ${isVisible ? '' : '-translate-y-full'}`}>
        <Link to="/">
            <img src='/logo.svg' width={150} height={90} className='cursor-pointer w-[120px] md:w-[150px]' />
        </Link>

        {/* Desktop Nav Links */}
        <ul className='hidden md:flex gap-16'>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer'>
                <Link to="/" className='!text-white hover:!text-blue-400'>Home</Link>
            </li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer text-white hover:text-blue-400'>Search</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>
                <Link to="/Profile" className='!text-white hover:!text-blue-400'>Profile</Link>
            </li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer text-white hover:text-blue-400'>Contact Us</li>
        </ul>

        <div className='flex items-center gap-3 md:gap-5'>
            {isLoaded ? (
                <>
                    {isSignedIn ? (
                        <>
                            <div >
                                
                                <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonBox: 'w-8 h-8' } }} />
                            </div>
                            <Link to={'/Add Listing'} className='hidden md:block'>
                                <Button className='!bg-blue-600 !text-white hover:!bg-blue-500'>Submit Listing</Button>
                            </Link>
                        </>
                    ) : (
                        <div className='flex items-center gap-3'>
                            <SignInButton mode="modal">
                                <Button className='!bg-blue-600 !text-white hover:!bg-blue-500 text-sm md:text-base'>Sign In</Button>
                            </SignInButton>
                            <Link to={'/Add Listing'} className='hidden md:block'>
                                <Button className='!bg-blue-600 !text-white hover:!bg-blue-500'>Submit Listing</Button>
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}

            {/* Hamburger Button - Mobile Only */}
            <button
                className='md:hidden flex items-center justify-center w-10 h-10 text-white'
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
            >
                {mobileMenuOpen ? <HiX className='text-2xl' /> : <HiMenu className='text-2xl' />}
            </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
            <div className='absolute top-full left-0 w-full bg-black/90 backdrop-blur-md border-b border-white/10 md:hidden animate-in slide-in-from-top-2 duration-200'>
                <ul className='flex flex-col py-4 px-6 gap-1'>
                    <li className='py-3 border-b border-white/10'>
                        <Link to="/" className='!text-white hover:!text-blue-400 text-base font-medium block' onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    </li>
                    <li className='py-3 border-b border-white/10'>
                        <span className='text-white text-base font-medium block cursor-pointer'>Search</span>
                    </li>
                    <li className='py-3 border-b border-white/10'>
                        <Link to="/Profile" className='!text-white hover:!text-blue-400 text-base font-medium block' onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                    </li>
                    <li className='py-3 border-b border-white/10'>
                        <span className='text-white text-base font-medium block cursor-pointer'>Contact Us</span>
                    </li>
                    <li className='py-3'>
                        <Link to={'/Add Listing'} onClick={() => setMobileMenuOpen(false)}>
                            <Button className='!bg-blue-600 !text-white hover:!bg-blue-500 w-full min-h-[44px]'>Submit Listing</Button>
                        </Link>
                    </li>
                </ul>
            </div>
        )}

    </div>
  )
}

export default Header
