import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { config } from 'config/config'
import { firebaseApp } from 'lib/data/firebase'

interface SigninWithGoogleButtonProps {
  googleEventName?: string
  redirectTo?: string
}

const SigninWithGoogleButton = ({ redirectTo = config.startPagePath ?? '/' }: SigninWithGoogleButtonProps): React.ReactElement => {
  const router = useRouter()
  const auth = getAuth(firebaseApp)
  const provider = new GoogleAuthProvider()

  const handleGoogleSignin = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.preventDefault()
    // See https://firebase.google.com/docs/auth/web/google-signin
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    console.log('handleGoogleSignin:', { user })
    void router.push(redirectTo)
  }
  return (
    <div className='google-signin-container'>
      <button color='primary' onClick={(event) => { void handleGoogleSignin(event) }}>
        <Image src='/images/google_g.svg' alt='Google G Logo' width={24} height={24} style={{ marginRight: 6 }} />
        Sign in with Google
      </button>
      <style jsx>{`
        button {
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }
      `}
      </style>
    </div>
  )
}
export default SigninWithGoogleButton
