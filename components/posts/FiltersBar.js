const options = [
  ['🚀', 'Recent'],
  ['🔥', 'Hot'],
  ['⏰', 'Last Minute'],
  // ['❤️', 'Bookmarks'],
  // ['💪', "Your's"],
]

function FiltersBar() {
  return (
    <div className="border-t border-b border-light-gray">
      <div className="flex justify-center items-center w-full divide-x divide-light-gray">
        {options.map((el, i) => (
          <button
            key={i}
            className="relative flex items-center justify-center flex-1 w-auto h-12 px-2.5 text-xs font-medium cursor-pointertext-gray group">
            <span className="mr-3 -translate-y-[1px]">{el[0]}</span>
            <span>{el[1]}</span>
            <span className="absolute transition-all ease-out duration-200 h-0.5 bottom-0 bg-black w-0 left-1/2 group-hover:w-full group-hover:left-0"></span>
          </button>
        ))}
      </div>
    </div>
  )
}
export default FiltersBar
