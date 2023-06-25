import { Navigate, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import routes from 'src/constants/routes'
import { toast } from 'react-toastify'
import { role } from 'src/constants/users'

function Admin() {
  const { profile } = useContext(AppContext)

  if (profile?.role === role.user) {
    toast.warning('You have no permission to access this page!', { autoClose: 1000 })
    return <Navigate to={routes.home} />
  }
  return (
    <div className='flex h-screen'>
      <Helmet>
        <title>Bảng Điều Khiển | Trang Quản Trị</title>
        <meta name='description' content='Bảng điều khiển dành cho người quản trị' />
      </Helmet>
      <Sidebar />
      <div className='flex h-full grow flex-col'>
        <Header />
        <div className='grow overflow-auto bg-gray-100 py-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
