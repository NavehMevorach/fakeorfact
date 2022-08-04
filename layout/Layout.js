import { useState } from 'react'
import Header from './Header'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import Main from './Main'

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <div className={`${darkMode && 'dark'} w-screen dark:bg-black`}>
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <div className=" flex relative w-full items-start mx-auto pt-16 max-w-6xl px-5 lg:px-3 xl:px-0">
        <LeftSidebar />
        <Main>{children}</Main>
        <RightSidebar />
      </div>
    </div>
  )
}
export default Layout
