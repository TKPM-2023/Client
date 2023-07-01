import { Typography, Button, Menu, MenuHandler, Avatar, MenuList, MenuItem } from '@material-tailwind/react'
import { UserCircleIcon, PowerIcon, WrenchScrewdriverIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import React from 'react'
import routes from 'src/constants/routes'
import { AppContext } from 'src/contexts/app.context'

interface Props {
  avatarUrl: string
  handleLogout: () => void
}

function ProfileMenu({ avatarUrl, handleLogout }: Props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { profile } = React.useContext(AppContext)

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false)
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler {...triggers}>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pl-0.5 pr-2 lg:ml-auto'
        >
          <Avatar
            variant='circular'
            size='sm'
            alt='candice wu'
            className='border border-blue-500 p-0.5'
            src={avatarUrl}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </MenuHandler>
      <MenuList {...triggers} className='p-1'>
        <Link to={routes.profile}>
          <MenuItem className='flex items-center gap-2 rounded'>
            {React.createElement(UserCircleIcon, {
              className: 'h-4 w-4',
              strokeWidth: 2
            })}
            <Typography as='span' variant='small' className='font-normal'>
              Tài khoản của tôi
            </Typography>
          </MenuItem>
        </Link>

        {profile?.role === 'admin' ? (
          <Link to={routes.admin}>
            <MenuItem className='flex items-center gap-2 rounded'>
              {React.createElement(WrenchScrewdriverIcon, {
                className: 'h-4 w-4',
                strokeWidth: 2
              })}
              <Typography as='span' variant='small' className='font-normal'>
                Trang quản lý
              </Typography>
            </MenuItem>
          </Link>
        ) : (
          ''
        )}

        <MenuItem
          className={'flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'}
          onClick={handleLogout}
        >
          {React.createElement(PowerIcon, {
            className: 'h-4 w-4 text-red-500',
            strokeWidth: 2
          })}
          <Typography as='span' variant='small' className='font-normal' color='red'>
            Đăng xuất
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default ProfileMenu
