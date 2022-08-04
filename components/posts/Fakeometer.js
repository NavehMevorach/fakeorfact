function Fakeometer({ fakeAmount, factAmount }) {
  return (
    <div className="flex  flex-1 w-full h-2 my-auto rounded-full">
      <div
        className={`h-full fakeometer-fake dark:bg-[#ef2626] bg-[#f68d8d] rounded-tl-full rounded-bl-full`}></div>
      <div
        className={`h-full fakeometer-fact bg-[#a1dffe] rounded-tr-full rounded-br-full`}></div>

      <style jsx>
        {`
          .fakeometer-fact {
            width: ${(factAmount / (fakeAmount + factAmount)) * 100}%;
          }
          .fakeometer-fake {
            width: ${(fakeAmount / (fakeAmount + factAmount)) * 100}%;
          }
        `}
      </style>
    </div>
  )
}
export default Fakeometer
