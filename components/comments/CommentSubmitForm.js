import { Avatar } from '@mui/material'

function CommentSubmitForm({
  handleSubmit,
  handleClose,
  postComment,
  setCommentBody,
  commentImg,
  setCommentImg,
  err,
  setErr,
  user,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex w-full mb-5">
        <Avatar src={user?.photoURL} />
        <textarea
          placeholder="Explain... (Optional)"
          className="w-full border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 h-40 ml-3"
          value={postComment}
          onChange={(e) => setCommentBody(e.target.value)}></textarea>
      </div>
      <div className="flex space-x-2 justify-end">
        <button
          onClick={handleClose}
          className="flex mt-5 items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-black transition duration-150 ease-in-out bg-gray/20 dark:bg-gray rounded-md focus:outline-none ">
          Cancel
        </button>
        <button className="flex mt-5 items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-black border border-gray-300 border-blue-600 rounded-md  focus:outline-none ">
          Submit
        </button>
      </div>
    </form>
  )
}
export default CommentSubmitForm
