import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Sidebar from './components/Sidebar'
import Header from './components/Header'

function Admin() {
  return (
    <div className='flex h-screen'>
      <Helmet>
        <title>Trang Quản Trị | Bảng Điều Khiển</title>
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
