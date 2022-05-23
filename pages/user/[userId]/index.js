function User() {
  return <div>index</div>
}
export default User

export const getServerSideProps = async (ctx) => {
  const { params } = ctx
  console.log(params)
  return {
    props: {
      user: [],
    },
  }
}
