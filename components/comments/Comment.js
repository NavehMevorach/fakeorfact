import { Avatar } from '@mui/material'

function Comment({ owner, ownerId, parentId, body, createdAt, replies }) {
  return (
    <div className="flex">
      <Avatar />
      {body}
      {replies.length > 0 && (
        <div>
          {replies.map((reply) => (
            <Comment key={replies.id} {...reply} replies={[]} />
          ))}
        </div>
      )}
    </div>
  )
}
export default Comment
