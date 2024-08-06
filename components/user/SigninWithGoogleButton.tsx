import React from 'react'
import { useRouter } from 'next/router'

import { firebase } from 'lib/data/firebase'

const SigninWithGoogleButton = () => {
  const router = useRouter()

  const handleGoogleSignin = async (event) => {
    event.preventDefault()
    // See https://firebase.google.com/docs/auth/web/google-signin
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        router.push('/')
        // ...
      }).catch((error) => {
        console.warn('Google signin error:', error)
      })
  }
  return (
    <div className='google-signin-container'>
      <button onClick={handleGoogleSignin} className='google-signin-button'>
        <img src='/images/google_g.svg' />Sign in with Google
      </button>
      <style jsx>{`
        .google-signin-button {
          background: white;
          color: black;
          border: 1px solid #DADCE0;
          border-radius: 4px;
          min-width: unset;
          margin: 1em 0;
        }
        .google-signin-button img {
          margin-right: 10px;
        }
      `}
      </style>
    </div>
  )
}
export default SigninWithGoogleButton
