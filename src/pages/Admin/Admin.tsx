import { Outlet } from 'react-router-dom'

import useTitle from 'src/hooks/useTitle'
import Sidebar from './Sidebar'

function Admin() {
  useTitle('Trang Quản Trị')

  return (
    <div className='flex'>
      <Sidebar />
      <div className='grow'>
        <div className='h-14 border'>Header</div>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
