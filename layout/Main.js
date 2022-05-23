function Main({ children }) {
  return (
    <main className="flex flex-col w-full h-auto z-10 theme-border-t lg:theme-border overflow-hidden mb-4 border-x border-light-gray">
      {children}
    </main>
  )
}
export default Main
