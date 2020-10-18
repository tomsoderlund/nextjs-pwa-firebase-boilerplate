import React, { useState } from 'react'

import { config } from 'config/config'
import { firebaseApp } from 'lib/firebase'
import { googleEvent } from 'components/page/GoogleAnalytics'
import showNotification from 'lib/showNotification'

const LoginForm = ({ buttonText = 'Log in', thankyouText = 'Check your email for a login link!', googleEventAction = 'user_login', redirectTo, onCompleted }) => {
  const [personInfo, setPersonInfo] = useState({ email: '' })
  const setPersonInfoField = (field, value) => setPersonInfo({ ...personInfo, [field]: value })

  const [inProgress, setInProgress] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setInProgress(true)

    const actionCodeSettings = {
      url: `${window.location.origin}/authenticate${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
      handleCodeInApp: true
    }

    try {
      await firebaseApp.auth().sendSignInLinkToEmail(personInfo.email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', personInfo.email)
      setPersonInfoField('email', '')
      setIsSubmitted(true)
      if (googleEventAction) googleEvent(googleEventAction)
      if (onCompleted) onCompleted(null, personInfo)
    } catch (error) {
      console.warn(error.message || error)
      showNotification(`Could not log in: ${error.message}`, 'error')
      if (onCompleted) onCompleted(error)
    } finally {
      setInProgress(false)
    }
  }

  return (
    <form className='signup-form' onSubmit={handleSubmit}>
      {!isSubmitted ? (
        <>
          <input
            id='email'
            type='email'
            value={personInfo.email}
            required
            placeholder='Your email'
            onChange={event => setPersonInfoField('email', event.target.value)}
            disabled={inProgress}
          />
          <button
            type='submit'
            className={'progress-button' + (inProgress ? ' in-progress' : '')}
            disabled={inProgress}
          >
            {buttonText}
          </button>
        </>
      ) : (
        <p className='thankyou'>{thankyouText}</p>
      )}
    </form>
  )
}

function LoginPage ({ query }) {
  return (
    <>
      <h1>Log in to {config.appName}</h1>

      <LoginForm />

      <p>No password necessary – we will send a magic login link to your email inbox.</p>
    </>
  )
}

export default LoginPage

export const getStaticProps = () => ({
  props: {
    title: 'Log in' // used in _app.js
  },
  revalidate: 31536000 // refresh once a year
})
