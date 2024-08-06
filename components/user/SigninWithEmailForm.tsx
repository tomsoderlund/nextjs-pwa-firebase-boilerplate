import React, { useState } from 'react'
// import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'

// import { firebaseApp } from 'lib/firebase'
// import showNotification from 'lib/showNotification'
// import makeRestRequest from 'lib/makeRestRequest'
// import { googleEvent } from 'components/page/GoogleAnalytics'

// const anonymizeEmail = email => email.split('@').map((part, isDomain) => isDomain ? part : part[0] + new Array(part.length).join('•')).join('@')

interface SimpleEvent {
  target: {
    name: string
    value: string
  }
}

interface SigninWithEmailFormProps {
  buttonText?: string
  thankyouText?: string
  googleEventName?: string
  redirectTo?: string
  onCompleted?: (error: Error | null, inputs: { email: string }) => void
}

const SigninWithEmailForm = ({ buttonText = 'Sign in', thankyouText = 'Check your email for a sign-in link!', googleEventName = 'user_login', redirectTo, onCompleted }: SigninWithEmailFormProps): React.ReactElement => {
  const [inProgress, setInProgress] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  // const auth = getAuth(firebaseApp)

  const [inputs, setInputs] = useState({ email: '' })
  const handleInputChange = ({ target }: SimpleEvent): void => setInputs({ ...inputs, [target.name]: target.value })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setInProgress(true)

    try {
      // Firebase sign-in with just email link, no password
      // const actionCodeSettings = {
      //   url: `${window.location.origin}/signin/authenticate${redirectTo !== undefined ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
      //   handleCodeInApp: true
      // }
      // await sendSignInLinkToEmail(auth, inputs.email, actionCodeSettings)
      window.localStorage.setItem('emailForSignIn', inputs.email)
      // makeRestRequest('POST', '/api/notifications', { email: anonymizeEmail(inputs.email) })
      handleInputChange({ target: { name: 'email', value: '' } })
      setIsSubmitted(true)
      // if (googleEventName) googleEvent(googleEventName)
      onCompleted?.(null, inputs)
    } catch (error: any) {
      console.warn(error.message as string)
      // showNotification(`Could not sign in: ${error.message}`, 'error')
      onCompleted?.(null, inputs)
    } finally {
      setInProgress(false)
    }
  }

  return (
    <div>
      {!isSubmitted
        ? (
          <>
            <form className='signin-form' onSubmit={(event) => { void handleSubmit(event) }}>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                placeholder='Your email'
                required
                value={inputs.email}
                onChange={handleInputChange}
                disabled={inProgress}
              />
              <button
                type='submit'
                color='primary'
                disabled={inProgress}
              >
                Sign in
              </button>
            </form>
            <div style={{ marginTop: '1em' }}>
              (No password necessary, we will send a sign-in link to your email inbox)
            </div>
          </>
          )
        : (
          <div className='thankyou'>{thankyouText}</div>
          )}
    </div>
  )
}

export default SigninWithEmailForm
