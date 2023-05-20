import { Link } from 'react-router-dom'
import config from 'src/config'

function Header() {
  return (
    <header className='bg-orange'>
      <div className='container'>
        <div className='flex h-24 items-start justify-end gap-4 py-2'>
          <Link to={config.routes.register} className='text-md py-2 text-white'>
            Đăng ký
          </Link>
          <Link to={config.routes.login} className='text-md py-2 text-white'>
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
