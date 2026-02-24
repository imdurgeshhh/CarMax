import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Home from './home'
import Contact from './contact'
import { ClerkProvider } from '@clerk/clerk-react'
import ProfilePage from './Profile'
import AddListing from './Add Listing'
import { Toaster } from 'sonner'
import SearchByCategory from './search/categoty'
import SearchByOption from './search'
import ListingDetails from './listing-details/[id]'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/contact',
    element:<Contact/>
  },
  {
    path:'/Profile',
    element:<ProfilePage/>
  },
  {
    path:'/Profile/inbox',
    element:<Navigate to="/Profile" replace/>
  },
  {
    path:'/Add Listing',
    element:<AddListing/>
  },
  {
    path:'/search',
    element:<SearchByOption/>
  },
  {
    path:'/search/:category',
    element:<SearchByCategory/>
  },
  {
    path:'/listing-details/:id',
    element:<ListingDetails/>
  }
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router}/>
      <Toaster />
    </ClerkProvider>,
)
