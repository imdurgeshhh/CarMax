import { useUser, SignIn } from '@clerk/clerk-react'

/**
 * ProtectedRoute – wraps any page that requires authentication.
 * If not signed in, shows the page blurred with Clerk's SignIn card overlay.
 */
function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return null
  }

  if (!isSignedIn) {
    return (
      <>
        {/* Blurred background – renders the actual page behind */}
        <div style={{
          filter: 'blur(8px)',
          pointerEvents: 'none',
          userSelect: 'none',
          minHeight: '100vh',
        }}>
          {children}
        </div>

        {/* Clerk SignIn card overlay */}
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
          <SignIn
            appearance={{
              elements: {
                rootBox: 'z-[10000]',
                card: 'shadow-2xl',
              }
            }}
          />
        </div>
      </>
    )
  }

  return children
}

export default ProtectedRoute
