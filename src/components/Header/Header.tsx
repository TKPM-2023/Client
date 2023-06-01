import { useContext } from 'react'
import { Link } from 'react-router-dom'

import routes from 'src/constants/routes'
import images from 'src/assets/images'
import Popover from '../Popover'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'

function Header() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)

  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
  }

  return (
    <header className='bg-header'>
      <div className='container'>
        <nav className='flex h-20 justify-between py-2.5'>
          <Link to={routes.home} className='flex w-40 items-center lg:w-56'>
            <img src={images.logo} alt='Logo' className='w-full object-cover' />
          </Link>
          <ul className='flex items-center gap-4'>
            <Popover
              as='li'
              className='flex cursor-default items-center gap-1 px-3 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:bg-orange-300 hover:text-black'
              renderPopover={
                <div className='flex min-w-[260px] gap-6 rounded-sm bg-white p-4 shadow-md'>
                  <div>
                    <p className='py-2.5 pr-3 text-sm font-semibold uppercase text-black'>Nón xe đạp</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón xe đạp ROC
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón xe đạp Royal
                    </Link>
                  </div>

                  <div>
                    <p className='py-2.5 pr-3 text-sm font-semibold uppercase text-black'>Nón nửa đầu</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón nửa đầu có kính
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón nửa đầu không kính
                    </Link>
                  </div>

                  <div>
                    <p className='py-2.5 pr-3 text-sm font-semibold uppercase text-black'>Nón bảo hiểm 3/4</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón 3/4 có kính
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón 3/4 không kính
                    </Link>
                  </div>

                  <div>
                    <p className='py-2.5 pr-3 text-sm font-semibold uppercase text-black'>Nón bảo hiểm fullface</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Fullface trên 1.5 triệu
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Fullface dưới 1.5 triệu
                    </Link>
                  </div>

                  <div>
                    <p className='py-2.5 pr-3 text-sm font-semibold uppercase text-black'>Nón trẻ em</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón trẻ em không kính
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón trẻ em có kính
                    </Link>
                  </div>
                </div>
              }
            >
              <span>Nón bảo hiểm</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </Popover>

            <Popover
              as='li'
              className='flex cursor-default items-center gap-1 px-3 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:bg-orange-300 hover:text-black'
              renderPopover={
                <div className='min-w-[260px] rounded-sm bg-white px-4 py-2 shadow-md'>
                  <Link
                    to={routes.home}
                    className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                  >
                    Kính
                  </Link>
                  <div className='border-b border-gray-200'></div>
                  <Link
                    to={routes.home}
                    className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                  >
                    Găng tay
                  </Link>
                  <div className='border-b border-gray-200'></div>
                  <Link
                    to={routes.home}
                    className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                  >
                    Khác
                  </Link>
                </div>
              }
            >
              <span>Phụ kiện</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-4 w-4'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
              </svg>
            </Popover>

            {/* User dropdown */}
            {isAuthenticated && (
              <Popover
                as='li'
                placement='bottom-end'
                className='flex cursor-default items-center gap-1 px-3 py-4 text-sm font-semibold text-white transition duration-300 hover:opacity-70'
                renderPopover={
                  <div className='min-w-[200px] rounded-sm bg-white px-4 py-2 shadow-md'>
                    <Link
                      to={routes.profile}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Tài khoản của tôi
                    </Link>

                    <div className='border-b border-gray-200'></div>

                    <Link
                      to={routes.admin}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Trang quản trị
                    </Link>

                    <div className='border-b border-gray-200'></div>

                    <button
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                }
              >
                <div className='w-6'>
                  <img src={images.avatar} alt='avatar' className='w-full rounded-full object-cover' />
                </div>
                <span>{profile?.first_name + ' ' + profile?.last_name}</span>
              </Popover>
            )}

            {!isAuthenticated && (
              <li className='flex items-center gap-1'>
                <Link
                  to={routes.login}
                  className='flex items-center gap-1 px-2 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:opacity-70'
                >
                  Đăng nhập
                </Link>
                <Link
                  to={routes.register}
                  className='flex items-center gap-1 px-2 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:opacity-70'
                >
                  Đăng ký
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div></div>
      </div>
    </header>
  )
}

export default Header
