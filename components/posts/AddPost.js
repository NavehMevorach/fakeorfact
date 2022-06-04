import { useState } from 'react'
import { useAuth } from './../../auth/AuthContext'
import { Avatar } from '@mui/material'
import SubmitPost from './SubmitPost'
import { addPost, addImageToPost, getFirebaseTimestamp } from './../../api'

function AddPost({ setCurrentPosts }) {
  const { user } = useAuth()
  const [isWritingPost, setIsWritingPost] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [postBody, setPostBody] = useState('')
  const [postImg, setPostImg] = useState(null)
  const [postImgName, setPostImgName] = useState(null)
  const [err, setErr] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  function handleClick() {
    resetFields()
    setIsWritingPost(!isWritingPost)
  }

  function resetFields() {
    setPostBody('')
    setTitle('')
    setUrl('')
    setPostImg('')
    setErr('')
    setPostImgName('')
    setIsWritingPost(false)
    setIsLoading(false)
  }

  const runValidation = () => {
    // 1. Check Title Exist and longer than 10 Chars

    if (!title) {
      return false
    }
    // 2. Check if Link is exist and valid url
    const expression =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    const regex = new RegExp(expression)
    if (url && url.match(regex)) {
      return true
    }
    return false
  }

  async function submitPost(e) {
    e.preventDefault()
    if (!runValidation()) {
      setErr(true)
      return
    }

    setIsLoading(true)
    // Create the post data object
    const post = {
      uid: user.uid,
      userImg: user.photoURL,
      username: user.displayName,
      title,
      url,
      postBody,
      comments: [],
      fake: [],
      fact: [],
      timestamp: getFirebaseTimestamp(),
    }
    const postId = await addPost(post)
    if (postId) {
      if (postImg) {
        // Upload Img to DB
        const a = await addImageToPost(postId, postImg)
        alert('Post was submitted')
        setCurrentPosts((prevState) =>
          [{ postId, ...post, postImg: a }].concat(prevState)
        )
      } else {
        setCurrentPosts((prevState) => [{ postId, ...post }].concat(prevState))
      }
    } else {
      alert("Post wasn't submitted")
    }
    resetFields()
  }

  function readImage(e) {
    const reader = new FileReader()
    if (e.target.files[0]) {
      setPostImgName(e.target.files[0].name)
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setPostImg(readerEvent.target.result)
    }
  }

  return (
    <div className="flex justify-center items-center pb-5 px-10 lg:mt-0 mt-5 lg:space-x-3 lg:pt-4">
      {isWritingPost ? (
        <SubmitPost
          handleSubmit={submitPost}
          handleClose={handleClick}
          title={title}
          setTitle={setTitle}
          url={url}
          setUrl={setUrl}
          postBody={postBody}
          setPostBody={setPostBody}
          postImg={postImg?.name}
          setPostImg={readImage}
          err={err}
          setErr={setErr}
          user={user}
          postImgName={postImgName}
          isLoading={isLoading}
        />
      ) : (
        <>
          <Avatar src={user?.photoURL} />
          <div
            onClick={handleClick}
            className="relative flex items-center w-full pl-5 lg:pl-1">
            <div className="text-xs w-full transition-all ease-out duration-200 flex items-center justify-between cursor-pointer h-12 rounded-full px-4 text-gray bg-light-gray hover:bg-gray/10 ml-0">
              <span>Start Writing Here...</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default AddPost
