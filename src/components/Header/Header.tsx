import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Collapse, Button, IconButton } from '@material-tailwind/react'
import ProfileMenu from './components/ProfileMenu'
import HeaderNavList from './components/HeaderNavList'
import routes from 'src/constants/routes'
import images from 'src/assets/images'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'
import cartApi from 'src/apis/cart.api'
import { useQuery } from '@tanstack/react-query'
import { CartProductType } from 'src/types/cart.type'

function Header() {
  const [openNav, setOpenNav] = useState(false)
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)

  const { data: data } = useQuery({
    queryKey: ['cart', profile?.cart_id],
    queryFn: () => cartApi.getCart(profile?.cart_id as string),
    keepPreviousData: false
  })

  const CartProduct = data?.data.data.cart_products

  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
  }

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false))
  }, [])

  return (
    <>
      <Navbar className='sticky inset-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4'>
        <div className='flex items-center justify-between text-blue-gray-900'>
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
          <div className='flex items-center gap-4'>
            <div className='mr-4 hidden lg:block'>
              <HeaderNavList listCartProduct={CartProduct as CartProductType[]} isAuthenticated={isAuthenticated} />
            </div>
            {!isAuthenticated && (
              <div className='hidden gap-2 lg:flex'>
                <Link to={routes.login}>
                  <Button variant='text' size='sm' color='blue-gray'>
                    Đăng nhập
                  </Button>
                </Link>
                <Link to={routes.register}>
                  <Button variant='gradient' size='sm'>
                    Đăng kí
                  </Button>
                </Link>
              </div>
            )}
            <IconButton
              variant='text'
              className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  className='h-6 w-6'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              )}
            </IconButton>
            {isAuthenticated && (
              <ProfileMenu
                avatarUrl={profile?.avatar?.url ? profile.avatar.url : images.avatar}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>
        <Collapse open={openNav}>
          <HeaderNavList listCartProduct={CartProduct as CartProductType[]} isAuthenticated={isAuthenticated} />
          {!isAuthenticated && (
            <div className='hidden gap-2 lg:flex'>
              <Link to={routes.login}>
                <Button variant='text' size='sm' color='blue-gray'>
                  Đăng nhập
                </Button>
              </Link>
              <Link to={routes.register}>
                <Button variant='gradient' size='sm'>
                  Đăng kí
                </Button>
              </Link>
            </div>
          )}
        </Collapse>
      </Navbar>
    </>
  )
}

export default Header
