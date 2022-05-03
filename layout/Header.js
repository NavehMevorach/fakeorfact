import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar } from '@mui/material'
import Modal from '../components/modals/Modal'
import { motion, AnimatePresence } from 'framer-motion'

function Header({ isLoggedIn = false }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const closeLogin = () => setLoginModalOpen(false)
  const openLogin = () => setLoginModalOpen(true)
  const closeSignup = () => setSignupModalOpen(false)
  const openSignup = () => setSignupModalOpen(true)

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [third])

  function switchModals(action = 'closeLogin') {
    if (action === 'closeSignup') {
      closeSignup()
      openLogin()
    } else {
      closeLogin()
      openSignup()
    }
  }
  return (
    <header className="w-full fixed items-center transition-all transform ease duration-200 h-16 z-50 border-b border-light-gray bg-white">
      <div className="relative transition-width ease-out duration-200 z-20 justify-center h-full flex mx-auto px-5 lg:px-3 xl:px-0 w-full max-w-6xl flex-center">
        <div className="relative flex items-center justify-start h-full lg:w-[135px] flex-shrink-0">
          <Link href="/">
            <a className="relative w-7 h-7 overflow-hidden">
              <Image
                src="/assets/img/avatar.png"
                layout="fill"
                objectFit="contain"
              />
            </a>
          </Link>
        </div>
        <div className="relative flex items-center w-full pl-5 lg:pl-1">
          <div className="text-xs w-full transition-all ease-out duration-200 flex items-center justify-between cursor-pointer h-9 rounded-full px-4 text-gray bg-light-gray hover:bg-gray/10 ml-0">
            <span>Search</span>
            <span className="hidden sm:block leading-4 py-0.5 px-1 ml-1.5 border border-gray-300 rounded-lg text-xs no-underline space-x-1">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </div>
        </div>
        {isLoggedIn ? (
          <div className="relative flex items-center justify-end flex-shrink-0 lg:w-80">
            <button className="relative flex items-center justify-center h-8 px-4 overflow-hidden font-medium text-black transition duration-300 ease-out border text-xs rounded-full  mr-4 group">
              <span className="absolute flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#000"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                Post
              </span>
              <span className="relative invisible">Post</span>
            </button>
            <div className="cursor-pointer">
              <Avatar src="/assets/img/avatar.png" />
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-end flex-shrink-0 lg:w-80">
            <motion.button
              onClick={() => (loginModalOpen ? closeLogin() : openLogin())}
              className="flex items-center h-8 px-4 mr-2 text-xs font-medium text-gray bg-light-gray rounded-full cursor-pointer hover:bg-black hover:text-white">
              Login
            </motion.button>
            <motion.button
              onClick={() => (signupModalOpen ? closeSignup() : openSignup())}
              className="relative flex items-center justify-center h-8 px-4 overflow-hidden font-medium text-black transition duration-300 ease-out border text-xs rounded-full group">
              <span className="absolute flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-purple-500 group-hover:translate-x-0 ease">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                Signup
              </span>
              <span className="relative invisible">Signup</span>
            </motion.button>
          </div>
        )}
      </div>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {loginModalOpen && (
          <Modal handleClose={closeLogin}>
            <div className="bg-white w-full h-full rounded-md flex flex-col justify-center items-center space-y-4">
              <p className="text-gray">Login using your Twitter or Github ✌️</p>
              <div className="flex flex-col justify-center items-center">
                <button
                  type="button"
                  class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                  <svg
                    class="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path>
                  </svg>
                  Sign in with Twitter
                </button>
                <button
                  type="button"
                  class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                  <svg
                    class="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512">
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Sign in with Google
                </button>
              </div>
              <p className="text-xs text-gray">
                Don't Have an Account?{' '}
                <span
                  onClick={switchModals}
                  className="text-black font-bold cursor-pointer">
                  Click here to Signup
                </span>
              </p>
            </div>
          </Modal>
        )}
        {signupModalOpen && (
          <Modal handleClose={closeSignup}>
            <div className="bg-white w-full h-full rounded-md flex flex-col justify-center items-center space-y-4">
              <p className="text-gray">
                Signup using your Twitter or Github ✌️
              </p>
              <div className="flex flex-col justify-center items-center">
                <button
                  type="button"
                  class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
                  <svg
                    class="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="twitter"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512">
                    <path
                      fill="currentColor"
                      d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path>
                  </svg>
                  Signup with Twitter
                </button>
                <button
                  type="button"
                  class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                  <svg
                    class="w-4 h-4 mr-2 -ml-1"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="google"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512">
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                  </svg>
                  Signup with Google
                </button>
              </div>
              <p className="text-xs text-gray">
                Already Have an Account?{' '}
                <span
                  onClick={() => switchModals('closeSignup')}
                  className="text-black font-bold cursor-pointer">
                  Click here to Login
                </span>
              </p>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </header>
  )
}
export default Header
