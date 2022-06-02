import { Avatar } from '@mui/material'
import Moment from 'react-moment'
import Link from 'next/link'

function Comment({
  uid,
  parent,
  username,
  userImg,
  commentBody,
  timestamp,
  replies,
}) {
  async function handleEdit() {}

  async function handleDelete() {}
  return (
    <div className="mb-5">
      <div className="flex">
        <Avatar src={userImg} className="w-7 h-7" />
        <div className="relative w-full border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 ml-3">
          <div className="flex space-x-1">
            <Link href={`/user/${uid}`}>
              <a className="text-sm font-medium text-text leading-none hover:underline ease">
                {username}
              </a>
            </Link>
            <span className="text-xs text-gray">·</span>
            <Moment className="text-xs text-gray" fromNow>
              {timestamp}
            </Moment>
          </div>
          <div className="mt-3">{commentBody}</div>
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
