import { Button, IconButton, Badge } from '@material-tailwind/react'
import { ShoppingCartIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import routes from 'src/constants/routes'

function HeaderNavList() {
  return (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2'>
      <form className='flex w-96 items-center'>
        <label htmlFor='simple-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-gray-500 dark:text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <input
            type='text'
            id='simple-search'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Search'
            required
          />
        </div>
        <IconButton
          type='submit'
          className='ml-2 rounded-lg border border-blue-700  p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          <MagnifyingGlassIcon className='h-6 w-6'></MagnifyingGlassIcon>
        </IconButton>
      </form>
      <NavLink to={routes.home}>
        <Button variant='text' color='blue-gray' className='flex items-center gap-3'>
          <NavLink
            to={routes.home}
            className={({ isActive }) =>
              classNames('', {
                'text-purple-500': isActive
              })
            }
          >
            <HomeIcon className='h-6 w-6' />
          </NavLink>
          <NavLink
            to={routes.home}
            className={({ isActive }) =>
              classNames('', {
                'text-purple-500': isActive
              })
            }
          >
            Trang chủ
          </NavLink>
        </Button>
      </NavLink>

      <NavLink to={routes.cart}>
        <Button variant='text' color='blue-gray' className='flex items-center gap-3'>
          <Badge content='5'>
            <NavLink
              to={routes.cart}
              className={({ isActive }) =>
                classNames('', {
                  'text-purple-500': isActive
                })
              }
            >
              <ShoppingCartIcon className='h-6 w-6' />
            </NavLink>
          </Badge>
          <NavLink
            to={routes.cart}
            className={({ isActive }) =>
              classNames('', {
                'text-purple-500': isActive
              })
            }
          >
            Giỏ hàng
          </NavLink>
        </Button>
      </NavLink>
    </ul>
  )
}

export default HeaderNavList
