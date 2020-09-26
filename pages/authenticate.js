import React, { useEffect } from 'react'
import Router from 'next/router'
import querystring from 'querystring'

import { config } from 'config/config'
import { firebaseApp } from 'lib/firebase'

import Page from 'components/Page'

const titleCase = str => str.replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())
const emailToName = (email) => titleCase(email.split('@')[0].replace(/\./g, ' '))

function EmailAuthenticatePage ({ query }) {
  useEffect(() => {
    async function loginUserAndRedirect () {
      // Confirm the link is a sign-in with email link.
      if (firebaseApp.auth().isSignInWithEmailLink(window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn')
        if (!email) {
          // User opened the link on a different device. To prevent session fixation attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email again for confirmation (the email was opened in a new window):')
        }
        try {
          const { user } = await firebaseApp.auth().signInWithEmailLink(email, window.location.href)
          // Add user.displayName if missing
          if (!user.displayName) {
            user.updateProfile({ displayName: emailToName(user.email) })
          }
          // Clear email from storage
          window.localStorage.removeItem('emailForSignIn')
          // Redirect browser
          const { redirectTo } = querystring.parse(window.location.href.split('?')[1])
          Router.push(redirectTo ? decodeURIComponent(redirectTo) : '/')
          // You can access the new user via result.user
          // Additional user info profile not available via: result.additionalUserInfo.profile == null
          // You can check if the user is new or existing: result.additionalUserInfo.isNewUser
        } catch (error) {
          console.warn(`Warning: ${error.message || error}`, error)
        }
      }
    }
    loginUserAndRedirect()
  }, [query])

  return (
    <Page title='Logging in'>
      <h2>Logging in to {config.appName}...</h2>
    </Page>
  )
}

export default EmailAuthenticatePage
