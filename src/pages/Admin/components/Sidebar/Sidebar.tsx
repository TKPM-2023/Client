import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import routes from 'src/constants/routes'

function Sidebar() {
  return (
    <nav className='flex h-screen min-w-[14rem] shrink-0 flex-col overflow-hidden border px-4'>
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
              className='h-4 w-4 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              xmlnsXlink='http://www.w3.org/1999/xlink'
              version='1.1'
              id='Capa_1'
              viewBox='0 0 391.285 391.285'
              xmlSpace='preserve'
            >
              <g>
                <g>
                  <path d='M263.73,307.765c0-5.521,4.479-10,10-10h82.16c39.17-80.935,45.631-143.653,20.365-187.437    C340.73,48.766,234.967,51.734,234.967,51.734c-95.389,0-155.629,66.681-155.629,66.681    C48.596,151.021,17.42,212.788,3.693,254.349c0,0-2.344,7.198-2.898,9.635C0.376,265.824,0,267.673,0,269.569v50.006    c0,5.347,2.082,10.372,5.865,14.149c3.775,3.771,8.795,5.85,14.135,5.85h0.021l302.215-0.046    c7.266-0.009,13.963-4.262,17.479-10.618c2.074-3.75,4.078-7.462,6.027-11.145H273.73    C268.209,317.765,263.73,313.29,263.73,307.765z M196.78,191.544c-12.779,7.604-42.428,15.399-68.588,22.279    c-12.086,3.179-23.502,6.181-33.443,9.155c-16.244,4.864-33.916,9.454-52.648,13.678c18.221-44.276,44.697-85.143,69.117-106.392    c0,0,100.499,0,109.527,0s14.955,3.781,15,11.143C235.745,159.292,222.635,176.162,196.78,191.544z' />
                  <path d='M211.745,138.766c-5.515,0-10,4.486-10,10c0,5.515,4.485,10,10,10c5.517,0,10-4.485,10-10    C221.745,143.251,217.26,138.766,211.745,138.766z' />
                </g>
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
