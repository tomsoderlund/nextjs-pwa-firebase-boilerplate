import React, { useEffect } from 'react'
import Router from 'next/router'
import querystring from 'querystring'

import { config } from 'config/config'
import { firebaseApp } from 'lib/data/firebase'

const titleCase = (str: string): string => str.replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())
const emailToName = (email: string): string => titleCase(email.split('@')[0].replace(/\./g, ' '))

interface EmailAuthenticatePageProps {
  query: { [key: string]: string }
}

const EmailAuthenticatePage: React.FC<EmailAuthenticatePageProps> = ({ query }) => {
  useEffect(() => {
    async function signinUserAndRedirect () {
      if (firebaseApp.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          email = window.prompt('Please provide your email again for confirmation (the email was opened in a new window):') || ''
        }
        try {
          const { user } = await firebaseApp.auth().signInWithEmailLink(email, window.location.href)
          if ((user != null) && !user.displayName) {
            user.updateProfile({ displayName: emailToName(user.email || '') })
          }
          window.localStorage.removeItem('emailForSignIn')
          const { redirectTo } = querystring.parse(window.location.href.split('?')[1])
          Router.push(redirectTo ? decodeURIComponent(redirectTo as string) : '/')
        } catch (error) {
          console.warn(`Warning: ${(error as Error).message || error}`, error)
        }
      }
    }
    signinUserAndRedirect()
  }, [query])

  return (
    <>
      <h1>Logging in to {config.appName}...</h1>
    </>
  )
}

export default EmailAuthenticatePage

export const getStaticProps = () => ({
  props: {
    title: 'Logging in'
  }
})
