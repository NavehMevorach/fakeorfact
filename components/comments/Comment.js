import { Avatar } from '@mui/material'

function Comment({ owner, ownerId, parentId, body, createdAt, replies }) {
  return (
    <div className="mb-5">
      <div className="flex">
        <Avatar />
        <div className="w-full border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 ml-3">
          <div>User Posted Att</div>
          <div>{body}</div>
          <div>
            <span>Edit</span>
            <span>Delete</span>
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
