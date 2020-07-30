import { useState, useEffect } from 'react'

import { firebaseApp } from '../lib/firebase'

// const { user } = useUser()
export default function useUser () {
  const [user, setUser] = useState(null)
  useEffect(() => firebaseApp.auth().onAuthStateChanged(firebaseUser => setUser(firebaseUser)), [])
  return { user }
}
