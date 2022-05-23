import NavLink from '../components/NavLink'
import { useAuth } from './../auth/AuthContext'

function LeftSidebar() {
  const { user } = useAuth()
  return (
    <div className="lg:block hidden top-[75px] sticky max-h-screen overflow-y-scroll w-56 lg:-translate-x-0 -translate-x-56">
      <nav className="space-y-5 p-1">
        <NavLink emoji="🏠" text="Home" dest="/" />
        {user ? (
          <>
            <NavLink
              emoji="❤️"
              text="Bookmarks"
              dest={`/user/${user.uid}/bookmarks`}
            />
            <NavLink emoji="👨‍🍼" text="Profile" dest={`/user/${user.uid}`} />
          </>
        ) : (
          <></>
        )}
      </nav>
    </div>
  )
}
export default LeftSidebar
