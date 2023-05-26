import { useId } from 'react'
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole
} from '@floating-ui/react'
import Button from '../Button'

interface Props {
  type?: string
  headingTitle: string
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit?: React.FormEventHandler<HTMLFormElement>
}

function Modal({ type, headingTitle, children, isOpen, setIsOpen, onSubmit }: Props) {
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen
  })

  const click = useClick(context)
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown'
  })
  const role = useRole(context)

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  // Set up label and description ids
  const headingId = useId()
  const descriptionId = useId()

  return (
    <div>
      <button ref={refs.setReference} {...getReferenceProps()} hidden>
        Delete balloon
      </button>

      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay className='flex items-center justify-center bg-black/80' lockScroll>
            <FloatingFocusManager context={context}>
              <div
                className='m-4 rounded-md bg-white'
                ref={refs.setFloating}
                aria-labelledby={headingId}
                aria-describedby={descriptionId}
                {...getFloatingProps()}
              >
                <div className='relative'>
                  <h2 id={headingId} className='px-6 py-4 text-2xl font-medium capitalize'>
                    {headingTitle}
                  </h2>

                  <button className='absolute right-2 top-2 p-2' onClick={() => setIsOpen(false)}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                      <path
                        fillRule='evenodd'
                        d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>

                <div className='h-[1px] bg-gray-200'></div>

                <div className='w-[calc(100vw-80px)] max-w-[60rem] px-6'>
                  <form onSubmit={onSubmit}>
                    {children}

                    <div className='h-[1px] bg-gray-200'></div>

                    <div className='flex items-center justify-end gap-1 px-4 py-3'>
                      <Button
                        type='button'
                        onClick={() => setIsOpen(false)}
                        className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'
                      >
                        <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                          Thoát
                        </span>
                      </Button>

                      {type !== 'VIEW' && (
                        <Button
                          type='submit'
                          className='group relative mb-2 mr-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800'
                        >
                          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
                            Đồng ý
                          </span>
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </div>
  )
}

export default Modal
