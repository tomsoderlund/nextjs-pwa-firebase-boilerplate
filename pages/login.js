import React, { useState } from 'react'

import { config } from 'config/config'
import { firebaseApp } from 'lib/firebase'
import { googleEvent } from 'components/GoogleAnalytics'
// import createNotification from 'lib/createNotification'

import Page from 'components/Page'

const LoginForm = ({ buttonText = 'Log in', thankyouText = 'Check your email for a login link!', googleEventAction = 'Log in' }) => {
  const [personInfo, setPersonInfo] = useState({ email: '' })
  const setPersonInfoField = (field, value) => setPersonInfo({ ...personInfo, [field]: value })

  const [inProgress, setInProgress] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setInProgress(true)

    const actionCodeSettings = {
      url: config.appUrl + 'authenticate',
      handleCodeInApp: true
    }

    try {
      await firebaseApp.auth().sendSignInLinkToEmail(personInfo.email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', personInfo.email)
      setPersonInfoField('email', '')
      setIsSubmitted(true)
      if (googleEventAction) googleEvent(googleEventAction)
    } catch (error) {
      console.warn(error.message || error)
      window.alert(error.message)
      // createNotification(`Could not log in: ${err.message}`, 'error')
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
            className='primary'
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
    <Page title='Log in'>
      <h2>Log in to {config.appName}</h2>
      <p>No password necessary – we will send a magic login link to your email inbox.</p>
      <LoginForm />
    </Page>
  )
}

export default LoginPage
