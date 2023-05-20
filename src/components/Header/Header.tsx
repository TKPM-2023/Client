import { Link } from 'react-router-dom'
import images from 'src/assets/images'
import config from 'src/config'

function Header() {
  return (
    <header className='bg-header'>
      <div className='container'>
        <nav className='flex justify-between py-2'>
          <Link to={config.routes.home} className='w-40 lg:w-56'>
            <img src={images.logo} alt='Logo' className='w-full object-cover' />
          </Link>
          <ul className='flex items-center gap-4'>
            <li className='flex cursor-default items-center gap-1 px-2 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:bg-orange-300 hover:text-black'>
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
            </li>
            <li className='flex cursor-default items-center gap-1 px-2 py-4 text-sm font-semibold uppercase text-white transition duration-300 hover:bg-orange-300 hover:text-black'>
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
            </li>
            <li>
              <div className='flex items-center gap-6'>
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
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
