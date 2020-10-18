import React from 'react'

import { config } from 'config/config'

import LoginForm from 'components/user/LoginForm'

function LoginPage ({ query }) {
  return (
    <>
      <h1>Log in to {config.appName}</h1>

      <LoginForm />

      <p>No password necessary – we will send a login link to your email inbox.</p>
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
