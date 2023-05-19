import { Outlet } from 'react-router-dom'

import Footer from 'src/components/Footer'
import AuthHeader from 'src/components/AuthHeader'

function AuthLayout() {
  return (
    <div>
      <AuthHeader />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AuthLayout
