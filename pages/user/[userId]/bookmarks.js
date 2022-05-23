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
      <Feed posts={posts} />
    </>
  )
}
export default Bookmarks

export const getServerSideProps = async (ctx) => {
  const {
    params: { userId },
  } = ctx
  const res = await getUserBookmarks(userId)
  const posts = []
  res.forEach((el) => {
    el.timestamp = Math.floor(new Date(el.timestamp.seconds))
    posts.push(el)
  })
  console.log(posts)
  // Get Bookamarks

  return {
    props: {
      posts,
    },
  }
}
