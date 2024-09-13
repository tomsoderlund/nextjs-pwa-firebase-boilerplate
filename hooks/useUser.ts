/*
  import useUser from 'hooks/useUser'
  const { user } = useUser()
*/
import { useState, useEffect } from 'react'
import { getAuth, User } from 'firebase/auth'

import { firebaseApp } from 'lib/data/firebase'

interface UserHook {
  user: User | null
  signOut: () => Promise<void>
}

export default function useUser (): UserHook {
  const [user, setUser] = useState<User | null>(null)
  const auth = getAuth(firebaseApp)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    try {
      await auth.signOut()
    } catch (error: unknown) {
      console.warn(`Warning: ${(error instanceof Error) ? error.message : 'Unknown error'}`)
    }
  }

  return { user, signOut }
}
