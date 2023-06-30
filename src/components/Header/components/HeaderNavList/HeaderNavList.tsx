import { Button, IconButton, Menu, MenuHandler, MenuList, MenuItem, Typography } from '@material-tailwind/react'
import { ShoppingCartIcon, HomeIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate, createSearchParams } from 'react-router-dom'
import { SetStateAction, useState, useContext, useEffect } from 'react'
import { AppContext } from 'src/contexts/app.context'
import classNames from 'classnames'
import routes from 'src/constants/routes'
import { CartProductType } from 'src/types/cart.type'
import images from 'src/assets/images'

interface Props {
  listCartProduct: CartProductType[]
  isAuthenticated: boolean
}

function HeaderNavList({ listCartProduct, isAuthenticated }: Props) {
  const { setLocationCart } = useContext(AppContext)
  const currentURL = window.location.href
  const navigate = useNavigate()
  const [openMenu, setOpenMenu] = useState(false)
  const [searchParam, setSearchParam] = useState<string>('')

  const triggers = {
    onMouseEnter: () => setOpenMenu(true),
    onMouseLeave: () => setOpenMenu(false)
  }

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchParam(event.target.value)
  }

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    navigate({
      pathname: routes.search,
      search: createSearchParams({ name: searchParam }).toString()
    })
  }

  useEffect(() => {
    setLocationCart(document.querySelector<HTMLElement>('#cart-btn') as HTMLElement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-2'>
      <form onSubmit={handleSearch} className='flex w-96 items-center'>
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
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
            placeholder='Nhập tên sản phẩm'
            required
            value={searchParam}
            onChange={handleChange}
          />
        </div>
        <IconButton
          type='submit'
          className='ml-2 rounded-lg border border-blue-700  p-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          <MagnifyingGlassIcon className='h-6 w-6'></MagnifyingGlassIcon>
        </IconButton>
      </form>
      <NavLink
        to={routes.home}
        className={({ isActive }) =>
          classNames('', {
            'text-deep-purple-500': isActive
          })
        }
      >
        <Button variant='text' color='blue-gray' className='flex items-center gap-3 text-inherit'>
          <div className='text-inherit'>
            <HomeIcon className='h-6 w-6' />
          </div>
          <div className='text-inherit'>Trang chủ</div>
        </Button>
      </NavLink>

      <Menu open={openMenu} handler={setOpenMenu}>
        <MenuHandler>
          <NavLink
            to={routes.cart}
            className={({ isActive }) =>
              classNames('', {
                'text-deep-purple-500': isActive
              })
            }
          >
            <button
              {...triggers}
              id='cart-btn'
              type='button'
              className='relative inline-flex items-center rounded-lg bg-blue-700 p-3 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              <ShoppingCartIcon className='h-5 w-5 text-inherit' />
              <span className='sr-only'>Notifications</span>
              <div className='absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white dark:border-gray-900'>
                {listCartProduct?.length}
              </div>
            </button>
          </NavLink>
        </MenuHandler>
        <MenuList
          {...triggers}
          className={`hidden w-[28rem] grid-cols-4 gap-3 overflow-visible ${
            currentURL === `http://localhost:3000${routes.cart}` ? '' : 'lg:grid'
          }`}
        >
          {listCartProduct?.length === 0 || !isAuthenticated ? (
            <div className='col-span-4 mb-16 text-center'>
              <img src={images.emptyCart} alt='empty-cart' className='inline-block mix-blend-darken md:w-1/3' />
              <p className='mb-4 text-base font-medium md:mb-3'>Bạn chưa có sản phẩm nào trong giỏ hàng!</p>
            </div>
          ) : (
            <div className='col-span-4'>
              <div className='col-span-4 border-b pb-2'>Sản phẩm mới nhất</div>
              {listCartProduct?.slice(0, 5).map((product) => (
                <MenuItem key={product.product_id} className='col-span-4 flex items-center gap-4'>
                  <div className='mb-1 flex w-[280px] items-center gap-4'>
                    <img
                      src={product.Product.images ? product.Product.images[0].url : ''}
                      alt=''
                      className='h-12 w-12'
                    />
                    <Typography variant='small' color='blue-gray'>
                      {product.Product.name}
                    </Typography>
                  </div>

                  <Typography variant='small' color='red' className='font-bold'>
                    {product.Product.price.toLocaleString('vi-VN')} VNĐ
                  </Typography>
                </MenuItem>
              ))}
              <Link to={routes.cart} className='col-span-4 mt-3 flex justify-end'>
                <Button className='w-fit'>Xem giỏ hàng</Button>
              </Link>
            </div>
          )}
        </MenuList>
      </Menu>
    </ul>
  )
}

export default HeaderNavList
