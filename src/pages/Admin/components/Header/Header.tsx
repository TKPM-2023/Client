import { offset, useClick, useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import images from 'src/assets/images'
import routes from 'src/constants/routes'
import { AppContext } from 'src/contexts/app.context'
import { clearLS } from 'src/utils/auth'

function Header() {
  const { setIsAuthenticated, profile, setProfile } = useContext(AppContext)

  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    middleware: [offset(4)]
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss])

  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
  }

  return (
    <header className='flex items-center justify-end border-b-4 border-indigo-600 bg-white px-12 py-4'>
      <div className='flex items-center '>
        <button className='mx-4 flex text-gray-600 focus:outline-none'>
          <svg className='h-6 w-6' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9'
              stroke='currentColor'
              strokeWidth={2}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <div className='relative'>
          <button
            className='relative z-10 block h-8 w-8 overflow-hidden rounded-full shadow focus:outline-none'
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            <img
              className='h-full w-full object-cover'
              src={profile?.avatar?.url ? profile.avatar.url : images.avatar}
              alt={profile?.email || 'Your avatar'}
            />
          </button>
          <AnimatePresence>
            {isOpen && (
              <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className='z-20 mt-2 w-40 rounded-md bg-white py-2 shadow-xl'>
                    <Link
                      to={routes.profile}
                      className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-indigo-600 hover:text-white'
                    >
                      Trang cá nhân
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-indigo-600 hover:text-white'
                    >
                      Đăng xuất
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export default Header
