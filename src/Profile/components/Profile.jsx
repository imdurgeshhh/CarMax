import React, { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useClerk } from '@clerk/clerk-react'

function Profile() {
  const { user, isLoaded, isSignedIn } = useUser()
  const { user: clerkUser } = useClerk()
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumbers?.[0]?.phoneNumber || '')
  const [photoUrl, setPhotoUrl] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-5">
        <p className="text-lg text-gray-600 mb-4">Please sign in to view your profile</p>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await clerkUser.update({
        firstName: firstName,
        lastName: lastName,
      })
      
      if (phoneNumber) {
        await clerkUser.createPhoneNumber({
          phoneNumber: phoneNumber
        })
      }

      if (photoUrl) {
        await clerkUser.setProfileImage({
          url: photoUrl
        })
      }

      setIsEditing(false)
      window.location.reload()
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setFirstName(user?.firstName || '')
    setLastName(user?.lastName || '')
    setPhoneNumber(user?.phoneNumbers?.[0]?.phoneNumber || '')
    setPhotoUrl('')
    setIsEditing(false)
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col items-center mb-4">
          {/* Profile Photo */}
          <div className="mb-2">
            {isEditing ? (
              <div className="flex flex-col items-center">
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500">
                    <span className="text-3xl text-gray-500">
                      {user?.firstName?.[0] || user?.username?.[0] || 'U'}
                    </span>
                  </div>
                )}
                <Input
                  type="text"
                  placeholder="Enter photo URL"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="mt-2 w-48"
                />
              </div>
            ) : (
              <>
                {user?.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500">
                    <span className="text-3xl text-gray-500">
                      {user?.firstName?.[0] || user?.username?.[0] || 'U'}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Name */}
          {isEditing ? (
            <div className="flex gap-2 mt-1">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-28"
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-28"
              />
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.fullName || user?.username || 'User'}
            </h2>
          )}
          
          {/* Email */}
          <p className="text-gray-600 mt-1 text-base">
            {user?.primaryEmailAddress?.emailAddress || 'No email'}
          </p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* First Name */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600 block text-sm">First Name</span>
              {isEditing ? (
                <Input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              ) : (
                <span className="font-medium text-gray-800">
                  {user?.firstName || '-'}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600 block text-sm">Last Name</span>
              {isEditing ? (
                <Input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              ) : (
                <span className="font-medium text-gray-800">
                  {user?.lastName || '-'}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600 block text-sm">Email</span>
              <span className="font-medium text-gray-800">
                {user?.primaryEmailAddress?.emailAddress || '-'}
              </span>
            </div>

            {/* Phone Number */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600 block text-sm">Phone Number</span>
              {isEditing ? (
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              ) : (
                <span className="font-medium text-gray-800">
                  {user?.phoneNumbers?.[0]?.phoneNumber || 'Not provided'}
                </span>
              )}
            </div>

            {/* Username */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600 block text-sm">Username</span>
              <span className="font-medium text-gray-800">
                {user?.username || '-'}
              </span>
            </div>

            {/* Created At */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-gray-600 block text-sm">Member Since</span>
              <span className="font-medium text-gray-800">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-3">
          {isEditing ? (
            <>
              <Button 
                className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-1.5"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button 
                className="bg-gray-500 text-white hover:bg-gray-600 px-6 py-1.5"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-1.5"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
