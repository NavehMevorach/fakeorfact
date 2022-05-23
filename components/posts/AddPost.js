import { useState } from 'react'
import { useAuth } from './../../auth/AuthContext'
import { Avatar } from '@mui/material'
import SubmitPost from './SubmitPost'
import { addPost, updateUserPosts } from './../../api'
import { v4 } from 'uuid'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { storage } from './../../firebase'
function AddPost() {
  const { user } = useAuth()
  const [isWritingPost, setIsWritingPost] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [postBody, setPostBody] = useState('')
  const [postImg, setPostImg] = useState(null)
  const [err, setErr] = useState('')
  function handleClick() {
    setIsWritingPost(!isWritingPost)
  }

  function resetFields() {
    setPostBody('')
    setTitle('')
    setUrl('')
    setPostImg('')
    setErr('')
    setIsWritingPost(false)
  }

  async function handleImg() {
    if (postImg === null) return null
    const imageRef = ref(storage, `images/${postImg.name + v4()}`)
    const res = await uploadBytes(imageRef, postBody)
    const imgUrl = await getDownloadURL(res.ref)
    return imgUrl
  }

  async function submitPost(e) {
    e.preventDefault()
    // TODO: Run validationa
    // 1. Check Title Exist and longer than 10 Chars
    // 2. Check if Link is exist and valid url

    // Upload Img to DB
    const imgUrl = await handleImg()
    // Create the post data object
    const post = {
      uid: user.uid,
      userImg: user.photoURL,
      username: user.displayName,
      title,
      url,
      postBody,
      postImg: imgUrl,
    }
    const postId = await addPost(post)
    if (postId) {
      await updateUserPosts(user.uid, postId)
      alert('Post was submitted')
      // TODO: Refresh Posts Context so the new post will appear
    } else {
      alert("Post wasn't submitted")
    }
    resetFields()
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
          setPostImg={setPostImg}
          err={err}
          setErr={setErr}
          user={user}
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
