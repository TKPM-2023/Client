import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import routes from '../../../../constants/routes'
import React from 'react'
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody
} from '@material-tailwind/react'
import { ShoppingBagIcon, PowerIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function UserSidebar() {
  const [open, setOpen] = React.useState(0)

  const handleOpen = (value: React.SetStateAction<number>) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <Card className='h-full min-h-max w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? 'rotate-180' : ''}`}
            />
          }
        >
          <ListItem className='p-0' selected={open === 1}>
            <AccordionHeader onClick={() => handleOpen(1)} className='border-b-0 p-3'>
              <ListItemPrefix>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                  <path
                    fillRule='evenodd'
                    d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </ListItemPrefix>
              <Typography color='blue-gray' className='mr-auto font-normal'>
                Tài khoản của tôi
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className='py-1'>
            <List className='p-0'>
              <NavLink
                to={routes.profile}
                end={true}
                className={({ isActive }) =>
                  classNames('', {
                    'rounded-lg bg-gray-600 text-white': isActive
                  })
                }
              >
                <ListItem>
                  <ListItemPrefix>
                    <div className='h-3 w-5'></div>
                  </ListItemPrefix>
                  Thông tin chung
                </ListItem>
              </NavLink>
              <ListItem>
                <ListItemPrefix>
                  <div className='h-3 w-5'></div>
                </ListItemPrefix>
                Địa chỉ
              </ListItem>
              <NavLink
                to={routes.changePassword}
                className={({ isActive }) =>
                  classNames('', {
                    'rounded-lg bg-gray-600 text-white': isActive
                  })
                }
              >
                <ListItem>
                  <ListItemPrefix>
                    <div className='h-3 w-5'></div>
                  </ListItemPrefix>
                  Đổi mật khẩu
                </ListItem>
              </NavLink>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem className='border-b-0 p-0 p-3'>
          <ListItemPrefix>
            <ShoppingBagIcon className='h-5 w-5' />
          </ListItemPrefix>
          <Typography color='blue-gray' className='mr-auto font-normal'>
            Đơn mua
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
              <path d='M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z' />
            </svg>
          </ListItemPrefix>
          Giỏ hàng
          <ListItemSuffix>
            <Chip value='14' size='sm' variant='ghost' color='blue-gray' className='rounded-full' />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
              <path
                fillRule='evenodd'
                d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                clipRule='evenodd'
              />
            </svg>
          </ListItemPrefix>
          Đánh giá
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <PowerIcon className='h-5 w-5' />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  )
}

export default UserSidebar
