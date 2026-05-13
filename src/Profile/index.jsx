import React, { useState } from 'react'
import Header from '@/components/Header'
import MyListing from './components/MyListing'
import Inbox from './components/Inbox'
import Profile from './components/Profile'
import { FiList, FiInbox, FiUser } from 'react-icons/fi'

const tabs = [
  { id: 'my-listing', label: 'My Listing', icon: FiList },
  { id: 'inbox', label: 'Inbox', icon: FiInbox },
  { id: 'profile', label: 'Profile', icon: FiUser },
]

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('my-listing');

  return (
    <div className='min-h-screen bg-gray-950 text-white pb-30'>
      <Header/>
      <div className='pt-20 px-4 md:px-10 lg:px-20 my-6 md:my-10'>

        {/* Glassmorphism Tab Bar */}
        <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 flex gap-1 w-full'>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'text-white/40 bg-transparent border-none hover:text-white/60'
                  }
                `}
              >
                <Icon className='w-4 h-4' />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className='mt-6'>
          {activeTab === 'my-listing' && <MyListing />}
          {activeTab === 'inbox' && <Inbox />}
          {activeTab === 'profile' && <Profile />}
        </div>

      </div>
    </div>
  )
}

export default ProfilePage
