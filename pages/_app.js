import Layout from '../layout/Layout'
import '../styles/globals.css'
import { AuthProvider } from '../auth/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
