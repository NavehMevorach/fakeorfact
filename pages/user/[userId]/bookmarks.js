import Head from 'next/head'
import { useState } from 'react'
import Feed from '../../../components/Feed'
import { getUserBookmarks } from './../../../api'
function Bookmarks({ posts }) {
  const [bookmarkedPosts, setBookmarkedPosts] = useState(posts)
  return (
    <>
      <Head>
        <title>Bookmarks</title>
        <meta name="description" content="Fake or Fact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed posts={bookmarkedPosts} isUserPage={true} />
    </>
  )
}
export default Bookmarks

export const getServerSideProps = async (ctx) => {
  const {
    params: { userId },
  } = ctx
  const posts = await getUserBookmarks(userId)
  posts.forEach((post) => {
    post.timestamp = post.timestamp.toDate().toString()
  })

  return {
    props: {
      posts,
    },
  }
}
