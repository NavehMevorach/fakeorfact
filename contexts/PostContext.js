import React, { useState, useEffect, useContext, createContext } from 'react'
import { getAuth } from 'firebase/auth'
import { useAuth } from '../auth/AuthContext'

const PostsContext = createContext({
  posts: null,
})

export function AuthProvider({ children }) {
  const [posts, setPosts] = useState(null)
  const { user } = useAuth()
  useEffect(() => {
    // Fetch User
  }, [])

  return (
    <PostsContext.Provider value={{ user }}>{children}</PostsContext.Provider>
  )
}

export const usePosts = () => {
  return useContext(PostsContext)
}
