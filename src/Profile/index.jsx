import React from 'react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import MyListing from './components/MyListing'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Inbox from './components/Inbox'
import Profile from './components/Profile'

function ProfilePage() {
  return (
    <div>
        <Header/>
        <div className='pt-20 px-10  md:px-20 my-10'>
          <Tabs defaultValue="my-listing" className="w-full">
        <TabsList className='w-full flex justify-start'>
          <TabsTrigger value="my-listing">My Listing</TabsTrigger>
          <TabsTrigger value="indbox">Inbox</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="my-listing" className='mb-6'>
         <MyListing/>
        </TabsContent>
        <TabsContent value="indbox"><Inbox/></TabsContent>
        <TabsContent value="profile"><Profile/></TabsContent>
      </Tabs>
           
        </div>
    </div>
  )
}

export default ProfilePage
