import { useState } from 'react'

function RightSidebar() {
  const [isSortOpen, setIsSortOpen] = useState(true)
  const [sortBy, setSortBy] = useState('Latest')

  function changeSortBy(changeTo) {
    setSortBy(changeTo)
  }

  return (
    <div className="dark:bg-black lg:block hidden top-[75px] sticky max-h-screen overflow-y-hidden w-[500px] ml-4 my-4  border  border-light-gray">
      <div
        onClick={() => setIsSortOpen(!isSortOpen)}
        className="text-xs cursor-pointer py-4 px-5 justify-between flex items-center font-medium leading-6 text-gray-900 group">
        <svg
          className={`ease-in duration-200 w-4 h-4 mr-1`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
        <span className="mr-auto dark:text-white">{`Sort By ${sortBy}`}</span>
        <svg
          className={`w-3.5 h-3.5 ml-1 transition-all duration-300 transform stroke-current group-hover:opacity-100 text-gray-500 group-hover:text-black linear ${
            isSortOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"></path>
        </svg>
      </div>
      <div
        className={`${
          isSortOpen ? 'flex h-full' : 'h-0 hidden'
        } bg-light-gray dark:bg-transparent transition-all ease-out duration-200 py-4 px-5  flex-wrap text-xs text-gray/80 overflow-hidden`}>
        <button
          onClick={() => changeSortBy('Latest')}
          className={` w-full flex items-center group px-4 py-2 ${
            sortBy === 'Latest'
              ? 'text-black dark:text-white'
              : 'hover:text-black dark:hover:text-white'
          } `}>
          <svg
            className={`${
              sortBy === 'Latest'
                ? 'scale-100'
                : 'group-hover:scale-100 scale-0'
            } w-3.5 h-3.5  transition absolute left-2.5 ease-out duration-200  text-black ml-1`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Latest</span>
        </button>
        <button
          onClick={() => changeSortBy('Oldest')}
          className={`w-full flex items-center group px-4 py-2 ${
            sortBy === 'Oldest'
              ? 'text-black dark:text-white'
              : 'hover:text-black dark:hover:text-white'
          } `}>
          <svg
            className={`${
              sortBy === 'Oldest'
                ? 'scale-100'
                : 'group-hover:scale-100 scale-0'
            } w-3.5 h-3.5  transition absolute left-2.5 ease-out duration-200  text-black ml-1`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"></path>
          </svg>
          <span>Oldest</span>
        </button>
      </div>
    </div>
  )
}
export default RightSidebar
