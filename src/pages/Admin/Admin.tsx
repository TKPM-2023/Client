import { Outlet } from 'react-router-dom'

import useTitle from 'src/hooks/useTitle'
import Sidebar from './Sidebar'

function Admin() {
  useTitle('Trang Quản Trị')

  return (
    <div className='flex'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Admin
