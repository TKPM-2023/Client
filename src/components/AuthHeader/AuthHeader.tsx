import { Link, useMatch } from 'react-router-dom'
import routes from 'src/constants/routes'

function AuthHeader() {
  const registerMatch = useMatch(routes.register)
  const isRegisterPage = Boolean(registerMatch)

  return (
    <header className='py-5'>
      <div className='container'>
        <nav className='flex items-center gap-6'>
          <Link to={routes.home} className='flex cursor-pointer items-center'>
            <span className='hidden md:block'>
              <img
                src='https://www.october16th.store/assets/logo-3c597220.png'
                alt='logo'
                className='h-12 w-12 object-contain '
              />
            </span>
            <div className='text-center'>
              <span className='font-sigmar !mb-0 text-2xl text-purple-600'>TKPM</span>
              <h1 className='text-zinc-400 !mb-0 -mt-2 text-sm'>Final Project</h1>
            </div>
          </Link>
          <h2 className='text-xl lg:text-2xl'>{isRegisterPage ? 'Đăng ký' : 'Đăng nhập'}</h2>
        </nav>
      </div>
    </header>
  )
}

export default AuthHeader
