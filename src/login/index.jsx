import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function Login() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950'>
      <div className='w-full max-w-md px-4'>
        <div className='text-center mb-8'>
          <img src='/logo.svg' alt='CarMax' className='w-40 mx-auto mb-4' />
          <p className='text-gray-400 text-sm'>Sign in to access your account</p>
        </div>
        <SignIn
          routing='path'
          path='/login'
          signUpUrl='/login'
          afterSignInUrl='/'
          appearance={{
            elements: {
              rootBox: 'mx-auto w-full',
              card: 'bg-gray-900/80 backdrop-blur-md border border-white/10 shadow-2xl',
            }
          }}
        />
      </div>
    </div>
  )
}

export default Login
