import { Outlet } from 'react-router-dom'
import UserSidebar from './components/UserSidebar'
import useTitle from 'src/hooks/useTitle'

function UserProfile() {
  useTitle('Hồ sơ người dùng')

  return (
    <>
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
