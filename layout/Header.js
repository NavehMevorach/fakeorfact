import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar } from '@mui/material'
import Modal from '../components/modals/Modal'
import { motion, AnimatePresence } from 'framer-motion'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { addUser, checkIfDocExists } from '../api'
import { useAuth } from './../auth/AuthContext'
import { useRouter } from 'next/router'

function Header() {
  const router = useRouter()
  const [mode, setMode] = useState('light')
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const closeLogin = () => setLoginModalOpen(false)
  const openLogin = () => setLoginModalOpen(true)
  const closeSignup = () => setSignupModalOpen(false)
  const openSignup = () => setSignupModalOpen(true)
  const [darkmode, setDarkmode] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
    localStorage.setItem('mode', mode)
  }, [mode])

  function switchModals(action = 'closeLogin') {
    if (action === 'closeSignup') {
      closeSignup()
      openLogin()
    } else {
      closeLogin()
      openSignup()
    }
  }

  async function login() {
    const cred = await signInWithPopup(auth, provider)
    const isExists = await checkIfDocExists('users', cred.user.uid)
    if (!isExists) {
      await addUser(cred)
    } else {
      console.log('user is already exists')
    }
    closeLogin()
    closeSignup()
  }

  function logout() {
    auth.signOut()
    router.push('/')
  }

  return (
    <header className="w-full fixed items-center transition-all transform ease duration-200 h-16 z-50 border-b border-light-gray bg-white dark:bg-black">
      <div className="relative transition-width ease-out duration-200 z-20 justify-center h-full flex mx-auto px-5 lg:px-3 xl:px-0 w-full max-w-6xl flex-center">
        <div className="relative flex items-center justify-start h-full lg:w-[135px] flex-shrink-0">
          <Link href="/">
            <a className="dark:text-white relative w-30 h-10 overflow-hidden font-bold font-mono text-[24px]">
              BusTrust
            </a>
          </Link>
        </div>
        <div className="relative flex items-center w-full pl-5 lg:pl-1">
          {/* <div className="text-xs w-full transition-all ease-out duration-200 flex items-center justify-between cursor-pointer h-9 rounded-full px-4 text-gray bg-light-gray hover:bg-gray/10 ml-0">
            <span>Search</span>
            <span className="hidden sm:block leading-4 py-0.5 px-1 ml-1.5 border border-gray-300 rounded-lg text-xs no-underline space-x-1">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </div> */}
        </div>

        {user ? (
          <div className="relative flex items-center justify-end flex-shrink-0 lg:w-80">
            <button
              className="dark:text-white text-md mr-5"
              onClick={() => {
                // document.querySelector('body').classList.toggle('dark')
                // setDarkmode(!darkmode)
                setMode(mode === 'dark' ? 'light' : 'dark')
              }}>
              {`${darkmode ? '🌙' : '☀️'}`}
            </button>
            <button className="relative flex items-center justify-center h-8 px-4 overflow-hidden font-medium dark:text-white text-black transition duration-300 ease-out border dark:border-white text-xs rounded-full  mr-4 group">
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
              <span className="absolute flex items-center justify-center w-full h-full dark:text-white text-black transition-all duration-300 transform group-hover:translate-x-full ease">
                Post
              </span>
              <span className="relative invisible">Post</span>
            </button>
            <div onClick={logout} className="cursor-pointer">
              <Avatar src={user.photoURL} />
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-end flex-shrink-0 lg:w-80">
            <button
              className="dark:text-white text-md mr-5"
              onClick={() => {
                document.querySelector('body').classList.toggle('dark')
                setDarkmode(!darkmode)
              }}>
              {`${darkmode ? '🌙' : '☀️'}`}
            </button>
            <motion.button
              onClick={() => (loginModalOpen ? closeLogin() : openLogin())}
              className="flex items-center h-8 px-4 mr-2 text-xs font-medium dark:text-black text-gray bg-light-gray rounded-full cursor-pointer hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white">
              Login
            </motion.button>
            <motion.button
              onClick={() => (signupModalOpen ? closeSignup() : openSignup())}
              className="relative flex items-center justify-center h-8 px-4 overflow-hidden font-medium text-black transition duration-300 ease-out border dark:border-white text-xs rounded-full group">
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
              <span className="absolute flex items-center justify-center w-full h-full dark:text-white text-black transition-all duration-300 transform group-hover:translate-x-full ease">
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
              <p className="text-gray">Login using your Google</p>
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={login}
                  type="button"
                  className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
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
              <p className="text-gray">Signup using your Google</p>
              <div className="flex flex-col justify-center items-center">
                <button
                  onClick={login}
                  type="button"
                  className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                  <svg
                    className="w-4 h-4 mr-2 -ml-1"
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
