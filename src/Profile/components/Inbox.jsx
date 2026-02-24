import React, { useEffect, useState } from 'react'
import { App as SendbirdApp, SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';

function Inbox() {

    const {user} =useUser();
    const [userId,setUserId]= useState();
    const [channelUrl,setChannelUrl]= useState();
    useEffect(()=>{
        if(user){
            // Use Clerk's user.id which is a unique identifier without email characters
            // Sendbird requires user_id to NOT contain email addresses
            setUserId(user.id);
        }
    },[user])

  return (
    <div>
        <div style={{ width:'100%', height:'500px' }}>
      <SendBirdProvider appId={import.meta.env.VITE_SENDBIRD_APP_ID}
      userId={userId}
      nickname={user.fullName}
      profileUrl={user?.imageUrl}
      allowProfileEdit={true}
      >
        
        <div className='grid grid-cols-1 gap-5 md:grid-cols-3 h-full'>
            {/* Channel list */}
            <div className='p-5 border shadow-lg'>
                <GroupChannelList 
                onChannelSelect={(channel)=>{
                    setChannelUrl(channel?.url)
                }}
                channelListQueryParams={
                    {
                        includeEmpty:true
                    }}
                />
            </div>
            {/* massege area */}
            <div className='md:col-span-2 shadow-lg'>
                <GroupChannel channelUrl={channelUrl} />
            </div>
        </div>
        


      </SendBirdProvider>
      
        </div>
    </div>
  )
}

export default Inbox