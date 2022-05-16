import React, { useState, useEffect, useContext, createContext } from 'react'
import nookies from 'nookies'
import { getAuth } from 'firebase/auth'

const AuthContext = createContext({
  user: null,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', '', { path: '/' })
      } else {
        const token = await user.getIdToken()
        setUser(user)
        nookies.set(undefined, 'token', token, { path: '/' })
      }
    })
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = firebaseClient.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
