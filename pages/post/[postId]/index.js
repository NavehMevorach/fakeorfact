import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Moment from 'react-moment'
import { getPosts } from '../../../data'
import { getComments } from '../../../data'
import Comments from '../../../components/comments/Comments'
import Fakeometer from '../../../components/posts/Fakeometer'
import { Avatar } from '@mui/material'

function PostPage({ posts, comments }) {
  const {
    userID,
    avatarUrl,
    owner = 'Jordan Smith',
    ownerID,
    postedAt,
    title = 'Web3 Acronyms',
    text = 'The awesome world of Web3 is fascinating; however, there are so many acronyms that it may have you scratch ',
    imgUrl,
    dest,
    dataSrc = 'https://medium.com/analytics-vidhya/matrix-factorization-as-a-recommender-system-727ee64683f0',
    fake,
    fact,
    isBookmarked,
  } = posts.posts[0]
  const [fakeAmount, setFakeAmount] = useState(20)
  const [factAmount, setFactAmount] = useState(30)

  const dateToFormat = '1976-04-19T12:59-0500'

  return (
    <>
      <Head></Head>
      <div>
        <div className="relative hidden w-full flex-1 overflow-hidden rounded-t-lg md:block">
          <img
            src={imgUrl}
            className="object-cover w-full h-auto rounded-t-lg"
          />
        </div>
        <div className="bg-light-gray h-10 w-full flex items-center justify-start sm:px-8 px-3 space-x-3">
          <Avatar src="/assets/img/avatar.png" className="h-7 w-7" />
          <Link href="/">
            <a className="text-sm font-medium text-text leading-none hover:underline ease">
              {owner}
            </a>
          </Link>
          <span className="text-xs text-gray">·</span>
          <Moment format="D MMM YYYY" className="text-xs text-gray">
            {dateToFormat}
          </Moment>
        </div>
        <div className="md:px-5 px-8 ">
          <div className="flex items-center justify-center pt-4 space-x-3">
            <butto
              className="cursor-pointer"
              onClick={() =>
                setFakeAmount((prevState) => prevState + 1)
              }>{`${fakeAmount} Fake`}</butto>
            <Fakeometer fakeAmount={fake} factAmount={fact} />
            <button
              className="cursor-pointer"
              onClick={() =>
                setFactAmount((prevState) => prevState + 1)
              }>{`${factAmount} Fact`}</button>
          </div>
          <a className="block cursor-pointer text-sm max-w-sm truncate ... space-x-3 text-gray hover:text-black ease mt-6">
            <span>🔗</span>
            <span>{dataSrc}</span>
          </a>
          <h2 className="mt-6 mb-5 text-4xl font-bold text-black">{title}</h2>
          <p className="max-w-full pb-10 text-gray">{text}</p>
          <Comments comments={comments} />
        </div>
      </div>
    </>
  )
}
export default PostPage

export async function getServerSideProps(context) {
  const postId = context.params.postId
  // Need to be changed to get post by the Post Id in the slug
  const posts = await getPosts()
  const comments = await getComments()
  const post = posts.posts[0]
  return {
    props: { posts, comments },
  }
}
