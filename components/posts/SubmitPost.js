import { Avatar } from '@mui/material'

function SubmitPost({
  handleSubmit,
  handleClose,
  title,
  setTitle,
  url,
  setUrl,
  postBody,
  setPostBody,
  setPostImg,
  err,
  user,
  postImgName,
  isLoading,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex w-full justify-center items-center mb-5">
        <Avatar src={user?.photoURL} />
        <input
          className="dark:bg-transparent dark:border dark:border-white dark:rounded-sm flex-1 ml-3 py-2 px-4 focus:bordr-0 focus:outline-none"
          placeholder="Enter The Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <svg
          onClick={handleClose}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer dark:fill-white ml-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <input
        className=" dark:bg-transparent dark:border dark:border-white dark:rounded-sm w-full border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 mb-5"
        placeholder="Enter The Link "
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        placeholder="Explain... (Optional)"
        className="dark:bg-transparent dark:border dark:border-white dark:rounded-sm w-full border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 h-72"
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}></textarea>
      <div className="relative flex items-center h-full px-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-100">
        <div className="cursor-pointer">
          <input
            type="file"
            onChange={setPostImg}
            name="img"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6 cursor-pointer">
            <path
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              className="cursor-pointer"></path>
          </svg>
        </div>
        <div>{postImgName}</div>
      </div>
      <button className="flex mt-5 items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-black border border-gray-300 border-blue-600 rounded-md  focus:outline-none ">
        {isLoading ? (
          <svg
            role="status"
            className="w-4 h-4 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#000"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#fff"
            />
          </svg>
        ) : (
          'Submit'
        )}
      </button>
      <p className="text-left text-sm text-[#FF9494] font-mono mt-3">
        {!err
          ? ''
          : 'Ooops... it seems there was an error please make sure your post have title and URL'}
      </p>
    </form>
  )
}
export default SubmitPost
