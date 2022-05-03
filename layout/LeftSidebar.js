import Link from 'next/link'
import NavLink from '../components/NavLink'

function LeftSidebar() {
  return (
    <div className="lg:block hidden top-[75px] sticky max-h-screen overflow-y-scroll w-56 lg:-translate-x-0 -translate-x-56">
      <nav className="space-y-5 p-1">
        <NavLink emoji="🏠" text="Home" dest="/" />
        <NavLink emoji="❤️" text="Bookmarks" dest="/bookmarks " />
        <NavLink emoji="👨‍🍼" text="Profile" dest="/user/1234" />
      </nav>
    </div>
  )
}
export default LeftSidebar
