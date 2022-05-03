function Fakeometer({ fakeAmount = 150, factAmount = 50, isFinished = false }) {
  return (
    <div className="flex-1 w-full h-2 my-auto rounded-full">
      {isFinished ? (
        <div className={`h-full w-full rounded-full`}></div>
      ) : (
        <div
          className={`${
            fakeAmount === factAmount
              ? 'fakeometer-tie'
              : factAmount > fakeAmount
              ? 'fakeometer-fact'
              : 'fakeometer-fake'
          } h-full w-full rounded-full`}></div>
      )}
      <style jsx>
        {`
          .fakeometer-tie {
            background: linear-gradient(90deg, #ff0000 0%, #00acff 100%);
          }
          .fakeometer-fact {
            background: linear-gradient(90deg, #ff0000 0%, #00acff 100%);
          }

          .fakeometer-fake {
            background: linear-gradient(
              90deg,
              #ff0000 ${(fakeAmount / factAmount) * 10 + '%'},
              #00acff 100%
            );
          }
        `}
      </style>
    </div>
  )
}
export default Fakeometer
