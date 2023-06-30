import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import routes from 'src/constants/routes'

function Sidebar() {
  return (
    <nav className='flex h-full min-w-[14rem] shrink-0 flex-col overflow-hidden border px-4'>
      <h1 className='text-sn py-6 text-center font-semibold uppercase'>Trang quản trị</h1>

      <div className='h-[1px] bg-gray-200'></div>

      <ul>
        <li>
          <NavLink
            to={routes.admin}
            end={true}
            className={({ isActive }) =>
              classNames('flex items-center gap-2 py-3.5 text-black transition-colors hover:text-cyan-600', {
                'text-cyan-600': isActive
              })
            }
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 fill-current' viewBox='0 0 24 24'>
              <rect width='24' height='24' fill='white' />
              <path
                d='M15.024 22C16.2771 22 17.3524 21.9342 18.2508 21.7345C19.1607 21.5323 19.9494 21.1798 20.5646 20.5646C21.1798 19.9494 21.5323 19.1607 21.7345 18.2508C21.9342 17.3524 22 16.2771 22 15.024V12C22 10.8954 21.1046 10 20 10H12C10.8954 10 10 10.8954 10 12V20C10 21.1046 10.8954 22 12 22H15.024Z'
                fill='#323232'
              />
              <path
                d='M2 15.024C2 16.2771 2.06584 17.3524 2.26552 18.2508C2.46772 19.1607 2.82021 19.9494 3.43543 20.5646C4.05065 21.1798 4.83933 21.5323 5.74915 21.7345C5.83628 21.7538 5.92385 21.772 6.01178 21.789C7.09629 21.9985 8 21.0806 8 19.976L8 12C8 10.8954 7.10457 10 6 10H4C2.89543 10 2 10.8954 2 12V15.024Z'
                fill='#323232'
              />
              <path
                d='M8.97597 2C7.72284 2 6.64759 2.06584 5.74912 2.26552C4.8393 2.46772 4.05062 2.82021 3.4354 3.43543C2.82018 4.05065 2.46769 4.83933 2.26549 5.74915C2.24889 5.82386 2.23327 5.89881 2.2186 5.97398C2.00422 7.07267 2.9389 8 4.0583 8H19.976C21.0806 8 21.9985 7.09629 21.789 6.01178C21.772 5.92385 21.7538 5.83628 21.7345 5.74915C21.5322 4.83933 21.1798 4.05065 20.5645 3.43543C19.9493 2.82021 19.1606 2.46772 18.2508 2.26552C17.3523 2.06584 16.2771 2 15.024 2H8.97597Z'
                fill='#323232'
              />
            </svg>

            <span className='text-sm font-medium uppercase'>Bảng điều khiển</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={routes.manageOrders}
            className={({ isActive }) =>
              classNames('flex items-center gap-2 py-3.5 text-black transition-colors hover:text-cyan-600', {
                'text-cyan-600': isActive
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4 fill-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
              />
            </svg>

            <span className='text-sm font-medium uppercase'>Đơn hàng</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={routes.manageUsers}
            className={({ isActive }) =>
              classNames('flex items-center gap-2 py-3.5 text-black transition-colors hover:text-cyan-600', {
                'text-cyan-600': isActive
              })
            }
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-4 w-4 fill-current'>
              <path
                fillRule='evenodd'
                d='M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z'
                clipRule='evenodd'
              />
            </svg>

            <span className='text-sm font-medium uppercase'>Người dùng</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={routes.manageProducts}
            className={({ isActive }) =>
              classNames('flex items-center gap-2 py-3.5 text-black transition-colors hover:text-cyan-600', {
                'text-cyan-600': isActive
              })
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              viewBox='0 0 122.88 122.25'
              xmlSpace='preserve'
              className='h-4 w-4 fill-current'
            >
              <g>
                <path d='M122.57,29.25l0.31,62.88c0.01,3.28-2.05,6.1-5,7.29l0.01,0.01l-54.64,22.09c-0.99,0.4-2.05,0.6-3.12,0.6 c-0.11,0-0.22,0-0.33-0.01c-0.47,0.08-0.95,0.13-1.42,0.13c-1.06,0-2.11-0.21-3.08-0.62L4.94,100.46l0-0.01 C2.03,99.22-0.01,96.32,0,92.94l0.3-62.08c-0.04-0.66,0-1.33,0.12-1.99c0.02-0.95,0.22-1.88,0.58-2.76 c0.84-2.04,2.47-3.55,4.42-4.33l0-0.01L57.98,0.6c2.14-0.86,4.44-0.77,6.4,0.07l52.47,18.97c3.14,1.13,5.13,3.96,5.27,7.01 C122.41,27.49,122.57,28.37,122.57,29.25L122.57,29.25z M51.51,108.46l0.39-54.77L9.82,35.5L8.93,90.49L51.51,108.46L51.51,108.46 L51.51,108.46z M113.58,35.5L66.55,53.7l0.37,54.71l46.94-17.54L113.58,35.5L113.58,35.5L113.58,35.5z' />
              </g>
            </svg>

            <span className='text-sm font-medium uppercase'>Sản phẩm</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to={routes.manageCategories}
            className={({ isActive }) =>
              classNames('flex items-center gap-2 py-3.5 text-black transition-colors hover:text-cyan-600', {
                'text-cyan-600': isActive
              })
            }
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 fill-current' viewBox='0 0 24 24'>
              <path
                d='M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z'
                fill='#292D32'
              />
              <path
                d='M7.24 13.4297H5.34C3.15 13.4297 2 14.5797 2 16.7597V18.6597C2 20.8497 3.15 21.9997 5.33 21.9997H7.23C9.41 21.9997 10.56 20.8497 10.56 18.6697V16.7697C10.57 14.5797 9.42 13.4297 7.24 13.4297Z'
                fill='#292D32'
              />
              <path
                d='M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z'
                fill='#292D32'
              />
              <path
                d='M17.7099 22.0019C20.0792 22.0019 21.9999 20.0812 21.9999 17.7119C21.9999 15.3426 20.0792 13.4219 17.7099 13.4219C15.3406 13.4219 13.4199 15.3426 13.4199 17.7119C13.4199 20.0812 15.3406 22.0019 17.7099 22.0019Z'
                fill='#292D32'
              />
            </svg>

            <span className='text-sm font-medium uppercase'>Thể loại</span>
          </NavLink>
        </li>
      </ul>

      <Link
        to={routes.home}
        className='mb-12 mt-auto flex items-center justify-center gap-1 rounded bg-cyan-600 px-3 py-2 text-sm font-medium capitalize text-white shadow-sm transition-colors duration-200 hover:bg-cyan-700 dark:bg-white dark:text-black dark:hover:bg-white/80'
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
          <path d='M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z' />
        </svg>
        Trở về trang chủ
      </Link>
    </nav>
  )
}

export default Sidebar
