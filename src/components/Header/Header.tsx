import { useContext } from 'react'
import { Link } from 'react-router-dom'

import config from 'src/config'
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

  console.log(profile)

  return (
    <header className='bg-header'>
      <div className='container'>
        <nav className='flex h-20 justify-between py-2.5'>
          <Link to={config.routes.home} className='flex w-40 items-center lg:w-56'>
            <img src={images.logo} alt='Logo' className='w-full object-cover' />
          </Link>
          <ul className='flex items-center gap-4'>
            <Popover
              as='li'
              className='flex cursor-default items-center gap-1 px-3 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:bg-orange-300 hover:text-black'
              renderPopover={
                <div className='flex min-w-[260px] gap-6 rounded-sm bg-white p-4 shadow-md'>
                  <div>
                    <p className='py-2.5 pr-3 text-xs font-semibold uppercase text-black'>Nón xe đạp</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón xe đạp ROC
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón xe đạp Royal
                    </Link>
                  </div>

                  <div>
                    <p className='py-2.5 pr-3 text-xs font-semibold uppercase text-black'>Nón nửa đầu</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón nửa đầu có kính
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón nửa đầu không kính
                    </Link>
                  </div>

                  <div>
                    <p className='py-2.5 pr-3 text-xs font-semibold uppercase text-black'>Nón bảo hiểm 3/4</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón 3/4 có kính
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón 3/4 không kính
                    </Link>
                  </div>

                  <div>
                    <p className='py-2.5 pr-3 text-xs font-semibold uppercase text-black'>Nón bảo hiểm fullface</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Fullface trên 1.5 triệu
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Fullface dưới 1.5 triệu
                    </Link>
                  </div>

                  <div>
                    <p className='py-2.5 pr-3 text-xs font-semibold uppercase text-black'>Nón trẻ em</p>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Nón trẻ em không kính
                    </Link>
                    <div className='border-b border-gray-200'></div>
                    <Link
                      to={config.routes.home}
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
                    to={config.routes.home}
                    className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                  >
                    Kính
                  </Link>
                  <div className='border-b border-gray-200'></div>
                  <Link
                    to={config.routes.home}
                    className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                  >
                    Găng tay
                  </Link>
                  <div className='border-b border-gray-200'></div>
                  <Link
                    to={config.routes.home}
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

            {isAuthenticated && (
              <Popover
                as='li'
                placement='bottom-end'
                className='flex cursor-default items-center gap-1 px-3 py-4 text-sm font-semibold text-white transition duration-300 hover:opacity-70'
                renderPopover={
                  <div className='min-w-[200px] rounded-sm bg-white px-4 py-2 shadow-md'>
                    <Link
                      to={config.routes.profile}
                      className='block py-2.5 pr-3 text-sm font-medium capitalize text-black/70 hover:text-black'
                    >
                      Tài khoản của tôi
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
                  <img
                    src='https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/332294296_872079104071978_8443506191486236265_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ncdA72EMyS0AX-ioKAG&_nc_ht=scontent.fsgn5-14.fna&oh=00_AfAYQR8aHfxBXitFgHxw-s0MdAyHLeEtXnSJjI_exNg8LQ&oe=646D891D'
                    alt='avatar'
                    className='w-full rounded-full object-cover'
                  />
                </div>
                <span>{profile?.first_name + ' ' + profile?.last_name}</span>
              </Popover>
            )}

            {!isAuthenticated && (
              <li className='flex items-center gap-1'>
                <Link
                  to={config.routes.login}
                  className='flex items-center gap-1 px-2 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:opacity-70'
                >
                  Đăng nhập
                </Link>
                <Link
                  to={config.routes.register}
                  className='flex items-center gap-1 px-2 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:opacity-70'
                >
                  Đăng ký
                </Link>
              </li>
            )}

            <li className='mr-2'>
              <button
                type='button'
                className='flex cursor-pointer rounded-md bg-orange-300 p-1.5 text-sm font-semibold text-black transition duration-300 hover:bg-orange-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </li>

            <Popover
              as='li'
              renderPopover={
                <div className='min-w-[260px] rounded-sm bg-white p-4 shadow-md'>Chưa có sản phẩm trong giỏ hàng.</div>
              }
            >
              <button
                type='button'
                className='flex cursor-pointer rounded-md bg-orange-300 p-1.5 text-sm font-semibold text-black transition duration-300 hover:bg-orange-500'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='h-5 w-5'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                  />
                </svg>
              </button>
            </Popover>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
