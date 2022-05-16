import { useState } from 'react'
import { db } from '../../firebase'
import { useAuth } from './../../auth/AuthContext'
import { Avatar } from '@mui/material'
import { serverTimestamp } from 'firebase/firestore'

function AddPost() {
  const { user } = useAuth()
  const [isWritingPost, setIsWritingPost] = useState(false)
  function handleClick() {
    setIsWritingPost(!isWritingPost)
  }

  function submitPost() {
    // TODO: Run validationa

    const docRef = doc(db, 'posts', post.id)
    const postUpdated = { ...post, timestamp: serverTimestamp() }
    updateDoc(docRef, postUpdated)

    // Refresh Posts Context so the new post will appear

    // Show a msg that post was created

    // Change back to create Post
    handleClick()
  }

  return (
    <div className="flex justify-center items-center pb-5 px-10 lg:mt-0 mt-5 lg:space-x-3">
      <Avatar />
      {isWritingPost ? (
        <div className="flex">
          <div>
            <input placeholder="Enter Your Title" />
            <svg
              onClick={handleClick}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <textarea className="w-full border border-gray-100 rounded-lg form-textarea font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 h-72"></textarea>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="relative flex items-center w-full pl-5 lg:pl-1">
          <div className="text-xs w-full transition-all ease-out duration-200 flex items-center justify-between cursor-pointer h-12 rounded-full px-4 text-gray bg-light-gray hover:bg-gray/10 ml-0">
            <span>Start Writing Here...</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default AddPost
