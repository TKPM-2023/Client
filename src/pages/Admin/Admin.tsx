import { Outlet } from 'react-router-dom'

import useTitle from 'src/hooks/useTitle'
import Sidebar from './components/Sidebar'

function Admin() {
  useTitle('Trang Quản Trị')

  return (
    <div className='flex'>
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
