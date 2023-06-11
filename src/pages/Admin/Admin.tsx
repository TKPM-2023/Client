import { Outlet } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import { Helmet } from 'react-helmet-async'

function Admin() {
  return (
    <div className='flex'>
      <Helmet>
        <title>Trang Quản Trị | Bảng Điều Khiển</title>
        <meta name='description' content='Bảng điều khiển dành cho người quản trị' />
      </Helmet>
      <Sidebar />
      <div className='grow'>
        <div className='h-14 border-b border-b-gray-200'>Header</div>
        <div className='py-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
