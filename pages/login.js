import React from 'react'

import LoginForm from 'components/user/LoginForm'

import { Container } from 'react-bootstrap';

function LoginPage ({ query }) {
  return (
    <Container>
      <h1>Login</h1>

      <LoginForm />
    </Container>
  )
}


export default LoginPage

export const getStaticProps = () => ({
  props: {
    title: 'Log in' // used in _app.js
  },
  revalidate: 31536000 // refresh once a year
})
