import Head from 'next/head'
import nookies from 'nookies'
import Feed from '../components/Feed'
import { getInitialPosts } from './../api'
// import { verifyIdToken } from '../firebaseAdmin'

export default function Home({ posts }) {
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

export const getServerSideProps = async (ctx) => {
  try {
    // const cookies = nookies.get(ctx)
    // const token = await verifyIdToken(cookies.token)

    // get the user authenticattio data
    // const { uid, email } = token

    let res = await getInitialPosts()
    const posts = []
    res.forEach((el) => {
      const data = el.data()
      data.timestamp = Math.floor(new Date(data.timestamp.seconds))
      posts.push(data)
    })
    return {
      props: {
        posts,
      },
    }
  } catch (err) {
    console.log(err)
    return {
      props: {
        posts: [],
      },
    }
  }
}
