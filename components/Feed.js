import { useState, useEffect } from 'react'
import Post from './posts/Post'
import AddPost from '../components/posts/AddPost'
import FiltersBar from '../components/posts/FiltersBar'
import { useAuth } from '../auth/AuthContext'
import { getNextPost, getUser } from './../api'

function Feed({ posts, isUserPage = false }) {
  const [currentPosts, setCurrentPosts] = useState(posts)
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])
  const [isVerified, setIsVerified] = useState(false)
  const [lastPost, setLastPost] = useState(1)
  const { user } = useAuth()

  useEffect(() => {
    // Fetch Bookmark data
    async function fetchBookmarks(uid) {
      const { bookmarks, verified } = await getUser(uid)
      setBookmarkedPosts((prevState) => prevState.concat(bookmarks))
      setIsVerified(verified)
    }
    if (user) {
      fetchBookmarks(user.uid)
    }
  }, [user])

  async function fetchMorePost() {
    const [newPostsSnapshot, last] = await getNextPost(lastPost)
    setLastPost(last)
    const newPosts = []
    newPostsSnapshot.forEach((el) => {
      const data = el.data()
      data.timestamp = Date(data.timestamp.seconds)
      newPosts.push(data)
    })
    setCurrentPosts((prevPosts) => prevPosts.concat(newPosts))
  }
  console.log(user)
  return (
    <div className="text-center">
      {user && isVerified && !isUserPage && (
        <AddPost setCurrentPosts={setCurrentPosts} />
      )}
      <FiltersBar />
      {currentPosts.map((data, i) => (
        <Post
          key={i}
          {...data}
          isBookmarked={bookmarkedPosts.includes(data.postId)}
          setBookmarkedPosts={setBookmarkedPosts}
        />
      ))}
      {currentPosts.length === 0 ? (
        <p className="text-gray font-bold text-sm py-2">No Post Available</p>
      ) : (
        <button
          className="bg-black/60 hover:bg-black ease-linear duration-200 text-white py-2 px-4 rounded-full text-sm font-bold mt-5"
          onClick={fetchMorePost}>
          Load More
        </button>
      )}
    </div>
  )
}
export default Feed
