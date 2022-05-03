import { useState } from 'react'
import Link from 'next/link'
import { Avatar } from '@mui/material'

function AddComment() {
  const [isWritingAComment, SetIsWritingAComment] = useState(false)
  function handleClick(e) {}
  return (
    <div className="flex">
      <Link href="/">
        <a>
          <Avatar src="/assets/img/avatar.png" />
        </a>
      </Link>
      {isWritingAComment ? (
        <div></div>
      ) : (
        <div
          onClick={handleClick}
          className="relative flex items-center w-full pl-5 lg:pl-1">
          <div className="text-xs w-full transition-all ease-out duration-200 flex items-center justify-between cursor-pointer h-9 rounded-full px-4 text-gray bg-light-gray hover:bg-gray/10 ml-0">
            <span>Leave a Comment</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default AddComment
