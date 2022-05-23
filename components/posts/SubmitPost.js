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
  postImg,
  setPostImg,
  err,
  setErr,
  user,
}) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <div className="flex w-full justify-center items-center mb-5">
        <Avatar src={user?.photoURL} />
        <input
          className="flex-1 ml-3 py-2 px-1 focus:bordr-0 focus:outline-none"
          placeholder="Enter The Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <svg
          onClick={handleClose}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
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
        className="w-full border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 mb-5"
        placeholder="Enter The Link "
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <textarea
        placeholder="Explain... (Optional)"
        className="w-full border border-light-gray rounded-lg font-mono leading-loose tracking-tighter outline-none focus:outline-none sm:px-3 sm:py-3 py-3 sm:text-sm text-gray-600 h-72"
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}></textarea>
      <div className="relative flex items-center h-full px-4 font-medium text-gray-600 cursor-pointer hover:bg-gray-100">
        <div className="cursor-pointer">
          <input
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0])
              return setPostImg(e.target.files[0])
            }}
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
        <div>{postImg}</div>
      </div>
      <button className="flex mt-5 items-center justify-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-black border border-gray-300 border-blue-600 rounded-md  focus:outline-none ">
        Submit
      </button>
    </form>
  )
}
export default SubmitPost
