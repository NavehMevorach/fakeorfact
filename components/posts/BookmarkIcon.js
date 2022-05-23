import { useState } from 'react'
import { updateUserBookmarks, removePostFromUserBookmarks } from './../../api'
function BookmarkIcon({ clicked = false, uid, postId }) {
  const [isClicked, setIsClicked] = useState(clicked)

  function handleClick() {
    // Send Data to DB
    if (isClicked) {
      removePostFromUserBookmarks(uid, postId)
    } else {
      updateUserBookmarks(uid, postId)
    }
    // Update  State
    setIsClicked(!isClicked)
  }

  return (
    <div
      onClick={handleClick}
      className={`h-10 w-10 z-50 flex justify-center items-center group ease duration-100`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 h-5 w-5 ${
          !clicked ? 'group-hover:fill-black ease duration-100' : 'fill-black'
        }`}
        fill={`${clicked ? '#000' : 'none'}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </div>
  )
}
export default BookmarkIcon
