import React from 'react'

import { config } from 'config/config'

import LoginForm from 'components/user/LoginForm'

function LoginPage ({ query }) {
  return (
    <>
      <h1>Sign in to {config.appName}</h1>

      <LoginForm />
    </>
  )
}

export default LoginPage

export const getStaticProps = () => ({
  props: {
    title: 'Sign in' // used in _app.js
  }
})
