import React, { useState, useEffect, useContext, createContext } from 'react'
import nookies from 'nookies'
import { auth } from './../firebase'

const AuthContext = createContext({
  user: null,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', '', {})
      } else {
        const token = await user.getIdToken()
        setUser(user)
        nookies.set(undefined, 'token', token, {})
      }
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
