import Head from 'next/head'
import nookies from 'nookies'
import Feed from '../components/Feed'
import { getInitialPosts, getFiveUsers } from './../api'

export default function Home({ posts, topUsers }) {
  return (
    <>
      <Head>
        <title>FakeOrFact</title>
        <meta name="description" content="Fake or Fact" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Feed posts={posts} />
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const res = await getInitialPosts()
    const posts = []
    res.forEach((el) => {
      const data = el.data()
      data.timestamp = data.timestamp.toDate().toString()
      // data.timestamp = new Date(data.timestamp.seconds * 1000).toString()
      posts.push(data)
    })

    const topUsersSnapshot = await getFiveUsers()
    const topUsers = []
    topUsersSnapshot.forEach((el) => {
      const userData = el.data()
      userData.timestamp = userData.timestamp.toDate().toString()
      topUsers.push(userData)
    })
    return {
      props: {
        posts,
        topUsers,
      },
    }
  } catch (err) {
    return {
      props: {
        posts: [],
        topUsers: [],
      },
    }
  }
}
