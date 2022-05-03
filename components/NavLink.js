import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

function NavLink({ text, emoji, dest, intended = false }) {
  const router = useRouter()
  const isActive = router.asPath === dest
  return (
    <Link href={dest} className={`${intended && 'pl-4'}`}>
      <a
        className={`${
          isActive
            ? 'text-black font-bold'
            : 'font-medium text-black/70 hover:text-black'
        } flex  items-center space-x-1.5 group text-sm`}>
        <span className="text-black">{emoji}</span>
        <span>{text}</span>
        {!isActive && (
          <Image
            src="/assets/icons/chevron_right.svg"
            height="20px"
            width="20px"
            className="ease duration-100 opacity-0 group-hover:opacity-100 -translate-x-1/2 group-hover:translate-x-0 translate-y-[0.5px]"
          />
        )}
      </a>
    </Link>
  )
}
export default NavLink
