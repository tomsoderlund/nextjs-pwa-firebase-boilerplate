/*
  import useUser from 'hooks/useUser'
  const { user } = useUser()
*/
import { useState, useEffect } from 'react'
import { User } from 'firebase/app'

import { firebaseApp } from 'lib/data/firebase'

interface UserHook {
  user: User | null
  signOut: () => Promise<void>
}

export default function useUser (): UserHook {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      firebaseApp.auth().onAuthStateChanged(firebaseUser => setUser(firebaseUser))
    } catch (error: unknown) {
      console.warn(`Warning: ${(error instanceof Error) ? error.message : 'Unknown error'}`)
    }
  }, [])

  const signOut = async () => await firebaseApp.auth().signOut()

  return { user, signOut }
}
