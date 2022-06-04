import { useState } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'
import { Avatar } from '@mui/material'
import { useAuth } from '../../auth/AuthContext'
import CommentSubmitForm from './CommentSubmitForm'
import { addComment, getFirebaseTimestamp } from './../../api'

function AddComment({ setComments }) {
  const router = useRouter()
  const { user } = useAuth()
  const [commentBody, setCommentBody] = useState('')
  const [commentImg, setCommentImg] = useState('')
  const [err, setErr] = useState('')
  const [isWritingAComment, SetIsWritingAComment] = useState(false)
  function handleClick() {
    SetIsWritingAComment(!isWritingAComment)
  }

  function resetFields() {
    setCommentBody('')
    setCommentImg('')
    setErr('')
    SetIsWritingAComment(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // TODO: Run Validations

    const comment = {
      uid: user.uid,
      userImg: user.photoURL,
      username: user.displayName,
      postId: router.query.postId,
      commentBody,
      commentImg,
      upvote: [],
      downvote: [],
      parent: null,
      timestamp: getFirebaseTimestamp(),
    }
    const commentId = await addComment(comment)
    if (commentId) {
      alert('Comment was submitted')
      setComments((prevComments) =>
        [{ commentId, ...comment }].concat(prevComments)
      )
    } else {
      alert("Comment wasn't submitted")
    }
    resetFields()
  }

  return (
    <div className="flex mb-5">
      {isWritingAComment ? (
        <CommentSubmitForm
          handleSubmit={handleSubmit}
          handleClose={handleClick}
          commentBody={commentBody}
          setCommentBody={setCommentBody}
          commentImg={commentImg}
          setCommentImg={setCommentImg}
          err={err}
          setErr={setErr}
          user={user}
        />
      ) : (
        <>
          <Link href="/">
            <a>
              <Avatar src={user?.photoURL} />
            </a>
          </Link>
          <div
            onClick={handleClick}
            className="relative flex items-center w-full pl-5 lg:pl-1">
            <div className="text-xs w-full transition-all ease-out duration-200 flex items-center justify-between cursor-pointer h-9 rounded-full px-4 text-gray bg-light-gray hover:bg-gray/10 ml-0">
              <span>Leave a Comment</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default AddComment
