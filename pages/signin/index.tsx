import React from 'react'

import { config } from 'config/config'

import SigninWithEmailForm from 'components/user/SigninWithEmailForm'
import SigninWithGoogleButton from 'components/user/SigninWithGoogleButton'

function SigninPage ({ query }) {
  return (
    <>
      <h1>Sign in to {config.appName}</h1>
      <SigninWithGoogleButton />
      <p>or sign in with email:</p>
      <SigninWithEmailForm />
    </>
  )
}

export default SigninPage

export const getStaticProps = () => ({
  props: {
    title: 'Sign in' // used in _app.js
  }
})
