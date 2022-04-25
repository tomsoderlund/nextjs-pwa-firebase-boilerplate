import React, { useState } from 'react'

import { firebaseApp } from 'lib/data/firebase'
import showNotification from 'lib/showNotification'

import { googleEvent } from 'components/page/GoogleAnalytics'

import { Container, Form, Button } from 'react-bootstrap';


const LoginForm = ({ buttonText = 'Entrar', thankyouText = '', googleEventName = 'user_login', redirectTo, onCompleted }) => {
  const [inProgress, setInProgress] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [inputs, setInputs] = useState({ email: '', password: '' })
  const handleInputChange = ({ target }) => setInputs({ ...inputs, [target.name]: target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setInProgress(true)

    try {
      // Firebase login with just email link, no password
      const actionCodeSettings = {
        url: `${window.location.origin}/authenticate${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : '/home'}`,
        handleCodeInApp: true
      }
      await firebaseApp.auth().signInWithEmailAndPassword(inputs.email, inputs.password)
      window.localStorage.setItem('emailForSignIn', inputs.email)
      handleInputChange({ target: { name: 'email', value: '' } })
      setIsSubmitted(true)
      if (googleEventName) googleEvent(googleEventName)
      if (onCompleted) onCompleted(null, inputs)
    } catch (error) {
      console.warn(error.message || error)
      showNotification(`Could not log in: ${error.message}`, 'error')
      if (onCompleted) onCompleted(error)
    } finally {
      setInProgress(false)
    }
  }

  return (
    <Form className='login-form' onSubmit={handleSubmit}>
      {!isSubmitted ? (
        <Container>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            
          <Form.Control
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            value={inputs.email}
            required
            placeholder='Seu email'
            onChange={handleInputChange}
            disabled={inProgress}
          />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            
          <Form.Control
            id='password'
            name='password'
            type='password'
            autoComplete='password'
            value={inputs.password}
            required
            placeholder='Seu password'
            onChange={handleInputChange}
            disabled={inProgress}
          />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Button
            type='submit'
            className={'progress-animation' + (inProgress ? ' in-progress' : '')}
            disabled={inProgress}
          >
            {buttonText}
          </Button>
          </Form.Group>
        </Container>
      ) : (
        <p className='thankyou'>{thankyouText}</p>
      )}
    </Form>
  )
}

export default LoginForm
