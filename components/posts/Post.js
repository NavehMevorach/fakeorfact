import Moment from 'react-moment'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Avatar } from '@mui/material'
import Fakeometer from './Fakeometer'
import BookmarkIcon from './BookmarkIcon'

function Post({
  data: {
    user,
    avatarUrl,
    owner,
    ownerID,
    postedAt,
    title,
    text,
    imgUrl,
    dest,
    dataSrc,
    fake,
    fact,
    isBookmarked,
  },
}) {
  const router = useRouter()
  function handlePostClick() {
    router.push(dest)
  }
  return (
    <div
      onClick={handlePostClick}
      className="relative z-0 flex flex-col cursor-pointer justify-between p-6 sm:p-8 sm:pt-12 duration-500 border-b border-light-gray hover:bg-light-gray ease bg-white space-y-3">
      <div className="flex space-x-3">
        <Link href="/post/1234/">
          <a className="relative z-10">
            <Avatar src={avatarUrl} />
          </a>
        </Link>
        <div className="flex flex-col flex-1 w-full space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex w-full items-center justify-between">
              <div className="flex space-x-1">
                <Link href="/">
                  <a className="text-sm font-medium text-text leading-none hover:underline ease">
                    {owner}
                  </a>
                </Link>
                <span className="text-xs text-gray">·</span>
                <Moment className="text-xs text-gray" fromNow>
                  {postedAt}
                </Moment>
              </div>
              <div className="relative z-10   flex justify-center items-center">
                <BookmarkIcon clicked={isBookmarked} />
              </div>
            </div>
            <h2 className="text-base font-medium theme-text line-clamp-2 leading-tight">
              {title}
            </h2>
          </div>
          <p className="text-sm text-gray/70 line-clamp-2">{text}</p>
          <a className="block cursor-pointer text-sm max-w-sm truncate ... space-x-3 text-gray hover:text-black ease">
            <span>🔗</span>
            <span>{dataSrc}</span>
          </a>
          <div className="relative hidden w-full flex-1 overflow-hidden rounded-t-lg md:block">
            <img
              src={imgUrl}
              className="object-cover w-full h-auto rounded-t-lg"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center pt-4 md:pl-0 ml-11 space-x-3">
        <div>Fake</div>
        <Fakeometer fakeAmount={fake} factAmount={fact} />
        <div>Fact</div>
      </div>
    </div>
  )
}
export default Post
