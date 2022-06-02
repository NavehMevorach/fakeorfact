import { useState, useEffect } from 'react'
import Moment from 'react-moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Avatar } from '@mui/material'
import Fakeometer from './Fakeometer'
import BookmarkIcon from './BookmarkIcon'
import { removePostFromUserBookmarks, updateUserBookmarks } from './../../api'
import { useAuth } from '../../auth/AuthContext'

function Post({
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
  isBookmarked,
  setBookmarkedPosts,
}) {
  const router = useRouter()
  const { user } = useAuth()

  function handlePostClick(e) {
    router.push(`/post/${postId}`)
  }
  function handleBookmarkClick(e) {
    if (isBookmarked) {
      removePostFromUserBookmarks(user.uid, postId)
      setBookmarkedPosts((prevState) =>
        prevState.filter((item) => item !== postId)
      )
    } else {
      updateUserBookmarks(user.uid, postId)
      setBookmarkedPosts((prevState) => [...prevState, postId])
    }
  }
  return (
    <div className="relative z-10 flex flex-col ">
      <div
        onClick={handlePostClick}
        className="w-full h-full realative z-10 cursor-pointer justify-between p-6 sm:p-8 sm:pt-12 duration-500 border-b border-light-gray hover:bg-light-gray ease bg-white space-y-3">
        <div className="flex space-x-3">
          <Link href={`/user/${uid}/`}>
            <a className="relative z-10">
              <Avatar src={userImg} />
            </a>
          </Link>
          <div className="flex flex-col flex-1 w-full space-y-4 text-left">
            <div className="flex flex-col space-y-2">
              <div className="flex w-full items-center justify-between">
                <div className="flex space-x-1">
                  <Link href="/">
                    <a className="text-sm font-medium text-text leading-none hover:underline ease">
                      {username}
                    </a>
                  </Link>
                  <span className="text-xs text-gray">·</span>
                  <Moment className="text-xs text-gray" fromNow>
                    {timestamp}
                  </Moment>
                </div>
                {/* <div className="absolute right-10 z-50 flex justify-center items-center">
                  <BookmarkIcon
                    clicked={isBookmarked}
                    uid={uid}
                    postId={postId}
                  />
                </div> */}
              </div>
              <h2 className="text-base font-medium theme-text line-clamp-2 leading-tight">
                {title}
              </h2>
            </div>
            <p className="text-sm text-gray/70 line-clamp-2">{postBody}</p>
            <a className="block cursor-pointer text-sm max-w-sm truncate ... space-x-3 text-gray hover:text-black ease">
              <span>🔗</span>
              <span>{url}</span>
            </a>
            <div className="relative hidden w-full flex-1 overflow-hidden rounded-t-lg md:block">
              <img
                src={postImg}
                className="object-cover w-full h-auto rounded-t-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center pt-4 md:pl-0 ml-11 space-x-3">
          <div>{`${fake.length} Fake`}</div>
          <Fakeometer fakeAmount={fake} factAmount={fact} />
          <div>{`${fact.length} Fact`}</div>
        </div>
      </div>
      {user && (
        <div
          onClick={handleBookmarkClick}
          className="absolute right-10 top-10 z-50 flex justify-center items-center cursor-pointer">
          <BookmarkIcon clicked={isBookmarked} uid={uid} postId={postId} />
        </div>
      )}
    </div>
  )
}
export default Post
