import { Avatar } from '@mui/material'
import Moment from 'react-moment'
import Link from 'next/link'
import { upvoteComment, downvoteComment } from './../../api'
import { useAuth } from '../../auth/AuthContext'
import { useState } from 'react'

function Comment({
  uid,
  parent,
  username,
  userImg,
  commentBody,
  timestamp,
  replies,
  commentId,
  upvote,
  downvote,
}) {
  const { user } = useAuth()
  const [upvoteState, setUpvoteState] = useState(upvote)
  const [downvoteState, setDownvoteState] = useState(downvote)

  async function handleEdit() {}

  async function handleDelete() {}

  async function handleUpvote() {
    if (user) {
      const id = user.uid
      if (!upvoteState.includes(id)) {
        const res = await upvoteComment(id, commentId)
        if (res) {
          setUpvoteState((prevState) => prevState.concat(id))
          if (downvoteState.includes(id))
            setDownvoteState((prevState) =>
              prevState.filter((userId) => userId !== id)
            )
        }
      }
    }
  }

  async function handleDownvote() {
    if (user) {
      const id = user.uid
      if (!downvoteState.includes(id)) {
        const res = await downvoteComment(id, commentId)
        if (res) {
          setDownvoteState((prevState) => [id, ...prevState])
          if (upvoteState.includes(id))
            setUpvoteState((prevState) =>
              prevState.filter((userId) => userId !== id)
            )
        }
      }
    }
  }
  return (
    <div className="mb-5">
      <div className="flex">
        <Avatar src={userImg} className="w-7 h-7" />
        <div className="relative w-full border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 ml-3">
          <div className="flex space-x-1">
            <Link href={`/user/${uid}`}>
              <a className="dark:text-white text-sm font-medium text-text leading-none hover:underline ease">
                {username}
              </a>
            </Link>
            <span className="text-xs text-gray">·</span>
            <Moment className="text-xs text-gray" fromNow>
              {timestamp}
            </Moment>
          </div>
          <div className="dark:text-white mt-3">{commentBody}</div>
          <div className="absolute bottom-1 right-2 flex space-x-3 text-xs font-bold font-mono">
            <span
              onClick={handleEdit}
              className="cursor-pointer text-black/60 hover:text-black ease-linear duration-150">
              Edit
            </span>
            <span
              onClick={handleDelete}
              className="cursor-pointer text-black/60 hover:text-black ease-linear duration-150">
              Delete
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ml-3">
          <button
            onClick={handleUpvote}
            className={`${
              upvoteState.includes(user?.uid)
                ? 'text-[#000] font-bold dark:text-white'
                : 'hover:text-[#000] dark:hover:text-white/50 hover:font-bold ease-linear duration-100 text-gray'
            }`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs">{upvoteState.length}</span>
          </button>
          <button
            onClick={handleDownvote}
            className={`${
              downvoteState.includes(user?.uid)
                ? 'text-[#000] font-bold dark:text-white'
                : 'hover:text-[#000] dark:hover:text-white/50 hover:font-bold ease-linear duration-100 text-gray'
            }`}>
            <span className="text-xs">{downvoteState.length}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
      {replies.length > 0 && (
        <div className="ml-10 mt-5">
          {replies.map((reply) => (
            <Comment key={replies.id} {...reply} replies={[]} />
          ))}
        </div>
      )}
    </div>
  )
}
export default Comment
