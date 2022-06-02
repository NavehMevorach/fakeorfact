import { Avatar } from '@mui/material'
import { useState } from 'react'
import Feed from '../../../components/Feed'
import { getUserPosts, getUser, updateUserVerify } from './../../../api'
function User({ user, posts }) {
  const [file, setFile] = useState()
  const [isVerified, setIsVerified] = useState(user.verified)
  async function handleFile(e) {
    setFile(e.target.files[0])
    // Change user to verify
    const res = await updateUserVerify(user.uid)
    if (res) {
      setIsVerified(true)
    }
  }
  return (
    <div className="w-full h-full realative z-10 duration-500 border  border-light-gray">
      <div className="flex p-5 border-b border-light-gray items-end">
        <Avatar src={user.photoURL} className="h-20 w-20" />
        <div className="flex flex-col ml-3 font-bold">
          <span>{user.name}</span>
          <span className="text-xs">{`@${user.name}`}</span>
        </div>
        <div className="ml-auto flex space-x-3">
          <button
            className="border border-light-gray rounded-md px-3 py-1 text-sm shadow-sm font-medium text-gray/50"
            disabled={true}>
            Message
          </button>
          <button
            className="border border-light-gray rounded-md px-3 py-1 text-sm shadow-sm font-medium text-gray/50"
            disabled={true}>
            Follow
          </button>
        </div>
      </div>
      <div className="flex p-5 text-sm justify-start items-center border-b border-light-gray w-full">
        <p className="text-gray mr-3">
          <span className="text-black font-bold">{posts.length}</span> Posts
        </p>
        <p className="text-gray mr-3">
          <span className="text-black font-bold">6</span> Comments
        </p>
        <p className="text-gray">{`Joined at ${user.joinedAt.slice(4)}`}</p>
        {isVerified ? (
          <p className="text-[#24a0ed] ml-auto">Verified</p>
        ) : (
          <div className="ml-auto cursor-pointer flex relative">
            <input
              type="file"
              onChange={handleFile}
              name="img"
              className="absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer"
            />
            <button className="w-full h-full text-[#24a0ed] cursor-pointer">
              Upload Student ID
            </button>
          </div>
        )}
      </div>
      <Feed posts={posts} isUserPage={true} />
    </div>
  )
}
export default User

export const getServerSideProps = async (ctx) => {
  const {
    params: { userId },
  } = ctx
  // Fetch User Data
  const user = await getUser(userId)
  user.joinedAt = user.joinedAt.toDate().toDateString()
  // Fetch User Post
  const posts = await getUserPosts(userId)
  posts.forEach((post) => {
    post.timestamp = post.timestamp.toDate().toDateString()
  })
  return {
    props: {
      user,
      posts,
    },
  }
}
