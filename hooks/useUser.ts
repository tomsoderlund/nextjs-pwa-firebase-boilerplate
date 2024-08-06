/*
  import useUser from 'hooks/useUser'
  const { user } = useUser()
*/
import { useState, useEffect } from 'react'

import { firebaseApp } from 'lib/data/firebase'

export default function useUser () {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      firebaseApp.auth().onAuthStateChanged(firebaseUser => setUser(firebaseUser))
    } catch (error) {
      console.warn(`Warning: ${error.message || error}`)
    }
  }, [])

  const signOut = () => firebaseApp.auth().signOut()

  return { user, signOut }
}
