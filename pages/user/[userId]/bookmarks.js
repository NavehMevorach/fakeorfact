import Head from 'next/head'
import Feed from '../../../components/Feed'
import { getUserBookmarks } from './../../../api'
function Bookmarks({ posts }) {
  return (
    <>
      <Head>
        <title>Bookmarks</title>
        <meta name="description" content="Fake or Fact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed posts={posts} isUserPage={true} />
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
    post.timestamp = post.timestamp.toDate().toDateString()
  })

  return {
    props: {
      posts,
    },
  }
}
