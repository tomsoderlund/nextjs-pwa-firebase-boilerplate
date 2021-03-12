import { useState, useEffect } from 'react'

import { firebaseApp } from 'lib/data/firebase'

// const { user } = useUser()
export default function useUser () {
  const [user, setUser] = useState(null)
  useEffect(() => {
    try {
      firebaseApp.auth().onAuthStateChanged(firebaseUser => setUser(firebaseUser))
    } catch (error) {
      console.warn(`Warning: ${error.message || error}`)
    }
  }, [])
  return { user }
}
