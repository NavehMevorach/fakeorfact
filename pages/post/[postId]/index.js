import { useState, useEffect } from 'react'
import Link from 'next/link'
import Moment from 'react-moment'
import Comments from '../../../components/comments/Comments'
import Fakeometer from '../../../components/posts/Fakeometer'
import { Avatar } from '@mui/material'
import { getPost, getPostComments, voteFake, voteFact } from './../../../api'
import { useAuth } from '../../../auth/AuthContext'

function PostPage({ post, comments }) {
  const {
    uid,
    postId,
    userImg,
    username,
    title,
    url,
    postBody,
    postImg,
    timestamp,
    fake,
    fact,
  } = post

  function checkUserVote() {
    if (fact.includes(user?.uid)) {
      return 'fact'
    }
    if (fake.includes(user?.uid)) {
      return 'fake'
    }
    return null
  }
  const { user } = useAuth()
  const [allComments, setComments] = useState(comments)
  const [userVote, setUserVote] = useState(checkUserVote())
  const [factVotes, setFactVotes] = useState(fact.length)
  const [fakeVotes, setFakeVotes] = useState(fake.length)

  useEffect(() => {
    setUserVote(checkUserVote())
  }, [user])

  async function handleFake() {
    if (userVote !== 'fake') {
      await voteFake(user.uid, postId)
      setFakeVotes((fakeVotes += 1))
    }
    if (userVote === 'fact') {
      setFactVotes((factVotes -= 1))
    }
    setUserVote('fake')
  }

  async function handleFact() {
    if (userVote !== 'fact') {
      await voteFact(user.uid, postId)
      setFactVotes((factVotes += 1))
    }
    if (userVote === 'fake') {
      setFakeVotes((fakeVotes -= 1))
    }
    setUserVote('fact')
  }

  return (
    <>
      <div>
        <div className="relative hidden w-full flex-1 overflow-hidden rounded-t-lg md:block">
          <img
            src={postImg}
            className="object-cover w-full h-auto rounded-t-lg"
          />
        </div>
        <div className="bg-light-gray h-10 w-full flex items-center justify-start sm:px-8 px-3 py-10 space-x-3">
          <Avatar src={userImg} className="h-7 w-7" />
          <Link href="/">
            <a className="text-sm font-medium text-text leading-none hover:underline ease">
              {username}
            </a>
          </Link>
          <span className="text-xs text-gray">·</span>
          <Moment format="D MMM YYYY" className="text-xs text-gray">
            {timestamp}
          </Moment>
        </div>
        <div className="md:px-5 px-8 ">
          <div className="flex items-center justify-center pt-4 space-x-3">
            <button
              className={`border border-light-gray rounded-md px-4 py-2 text-sm shadow-sm font-medium ${
                userVote === 'fake' && 'bg-black text-white'
              }`}
              onClick={handleFake}>{`${fakeVotes} Fake`}</button>
            <Fakeometer fakeAmount={fakeVotes} factAmount={factVotes} />
            <button
              className={`border border-light-gray rounded-md px-4 py-2 text-sm shadow-sm font-medium ${
                userVote === 'fact' && 'bg-black text-white'
              }`}
              onClick={handleFact}>{`${factVotes} Fact`}</button>
          </div>
          <a className="block cursor-pointer text-sm max-w-sm truncate ... space-x-3 text-gray hover:text-black ease mt-6">
            <span>🔗</span>
            <span>{url}</span>
          </a>
          <h2 className="mt-6 mb-5 text-4xl font-bold text-black">{title}</h2>
          <p className="max-w-full pb-10 text-gray">{postBody}</p>
          <Comments comments={allComments} setComments={setComments} />
        </div>
      </div>
    </>
  )
}
export default PostPage

export async function getServerSideProps(context) {
  const postId = context.params.postId
  const post = await getPost(postId)
  post.timestamp = post.timestamp.toDate().toString()
  const commentsRes = await getPostComments(postId)
  const comments = []
  commentsRes.forEach((comment) => {
    comment.timestamp = comment.timestamp.toDate().toString()
    comments.push(comment)
  })
  return {
    props: { post, comments },
  }
}
