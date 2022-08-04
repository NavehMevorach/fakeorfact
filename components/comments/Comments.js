import { useAuth } from '../../auth/AuthContext'
import AddComment from './AddComment'
import Comment from './Comment'

function Comments({ comments, setComments }) {
  const { user } = useAuth()
  function getReplies(commentId) {
    return comments
      .filter((comments) => comments.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
  }
  return (
    <div className="relative w-full text-left">
      <h2 className="dark:text-white text-lg font-semibold mb-7">{`Comments ${'0'}`}</h2>
      {user && (
        <div>
          <AddComment setComments={setComments} />
        </div>
      )}
      <div>
        {/* TODO -> Only render root comments */}
        {comments.map((comment) => {
          if (comment.parent === null) {
            return (
              <Comment
                key={comment.commentId}
                {...comment}
                replies={getReplies(comment.commentId)}
              />
            )
          }
        })}
      </div>
    </div>
  )
}
export default Comments
