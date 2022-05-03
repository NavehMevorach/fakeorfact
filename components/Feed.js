import Post from './posts/Post'

function Feed({ posts }) {
  return (
    <div>
      {posts.map((data, i) => (
        <Post key={i} data={data} />
      ))}
    </div>
  )
}
export default Feed
