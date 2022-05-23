import { useState } from 'react'
import Post from './posts/Post'
import AddPost from '../components/posts/AddPost'
import FiltersBar from '../components/posts/FiltersBar'
import { useAuth } from '../auth/AuthContext'
import { getNextPost } from './../api'

function Feed({ posts }) {
  const [currentPosts, setCurrentPosts] = useState(posts)
  const [lastPost, setLastPost] = useState(1)
  const { user } = useAuth()

  async function fetchMorePost() {
    const [newPostsSnapshot, last] = await getNextPost(lastPost)
    setLastPost(last)
    const newPosts = []
    newPostsSnapshot.forEach((el) => {
      const data = el.data()
      data.timestamp = Date(data.timestamp.seconds)
      newPosts.push(data)
    })
    console.log(newPosts)
  }

  return (
    <div>
      {user && <AddPost />}
      <FiltersBar />
      {currentPosts.map((data, i) => (
        <Post key={i} {...data} />
      ))}
      {currentPosts.length === 0 ? (
        <p>Not Post Available</p>
      ) : (
        <button onClick={fetchMorePost}>Load More Posts</button>
      )}
    </div>
  )
}
export default Feed
