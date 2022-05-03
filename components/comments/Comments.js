import AddComment from './AddComment'
import Comment from './Comment'

function Comments({ comments }) {
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
      <h2 className="text-lg font-semibold mb-7">{`Comments ${'0'}`}</h2>
      {/* Need to check if he is SIgnIn and only if he does to show him the AddComment */}
      <div>
        <AddComment />
      </div>
      <div>
        {/* TODO -> Only render root comments */}
        {comments.map((comment) => {
          if (comment.parentId === null) {
            return (
              <Comment
                key={comment.id}
                {...comment}
                replies={getReplies(comment.id)}
              />
            )
          }
        })}
      </div>
    </div>
  )
}
export default Comments
