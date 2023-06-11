import { Outlet } from 'react-router-dom'
import UserSidebar from './components/UserSidebar'
import { Helmet } from 'react-helmet-async'

function UserProfile() {
  return (
    <>
      <Helmet>
        <title>Nón Trùm | Hồ Sơ Người Dùng</title>
        <meta name='description' content='Quản lí người dùng dành cho người quản trị' />
      </Helmet>
      <div className='flex h-full min-h-fit w-full'>
        <div className='flex-auto'>
          <UserSidebar />
        </div>
        <div className='w-full flex-auto'>
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default UserProfile
