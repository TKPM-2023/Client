import { Typography, Tooltip, Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react'
import { useState } from 'react'
interface Props {
  status: number
}

function ListOrderedProduct({ status }: Props) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)
  return (
    <div className='mb-3 flex justify-center'>
      <div className=' grid w-[940px] grid-cols-[400px_150px_170px_175px_25px] rounded-md bg-gray-200 p-3'>
        <div color='blue-gray' className='flex items-center font-bold'>
          <div className=' flex w-fit items-center'>
            <Tooltip
              content='Xem sản phẩm'
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 }
              }}
              placement='bottom'
            >
              <img
                src='https://storage.googleapis.com/my-image-products/iphone-14-pro-max--p459617sku=220909017.webp'
                alt=''
                width={50}
              />
            </Tooltip>

            <Typography variant='small' color='blue-gray' className='ml-3 flex items-center font-medium'>
              Iphone 14 Pro Max 1TB Deep purple
            </Typography>
          </div>
        </div>
        <Typography variant='small' color='red' className='flex items-center font-medium'>
          500.000 VNĐ
        </Typography>
        <Typography variant='small' color='blue-gray' className='ml-6 flex items-center'>
          1
        </Typography>
        <Typography variant='small' color='red' className='flex items-center font-medium'>
          500.000 VNĐ
        </Typography>
        {status === 2 ? (
          <Tooltip
            content='Đánh giá sản phẩm'
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 }
            }}
            placement='bottom'
          >
            <button onClick={handleOpen} className='flex cursor-pointer content-end items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-5 w-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z'
                />
              </svg>
            </button>
          </Tooltip>
        ) : (
          <div></div>
        )}
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          The key to more success is to have a lot of pillows. Put it this way, it took me twenty five years to get
          these plants, twenty five years of blood sweat and tears, and I&apos;m never giving up, I&apos;m just getting
          started. I&apos;m up to something. Fan luv.
        </DialogBody>
        <DialogFooter>
          <Button variant='text' color='red' onClick={handleOpen} className='mr-1'>
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default ListOrderedProduct
