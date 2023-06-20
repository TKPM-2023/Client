import { Collapse, Tooltip, Typography, Chip } from '@material-tailwind/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function ListOrdered() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen((cur) => !cur)
  return (
    <div className=''>
      <div
        className={`${
          isOpen ? 'rounded-b-none bg-blue-50' : 'mt-3'
        } grid w-full grid-cols-[80px_100px_100px_175px_400px_150px_100px_20px] rounded-md bg-gray-200 px-3 py-6 hover:bg-gray-100`}
      >
        <Tooltip
          content='Xem chi tiết đơn hàng'
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 }
          }}
          placement='bottom'
        >
          <Link to={`/profile/my-oders/1231`}>
            <Typography variant='small' color='blue-gray' className='flex items-center font-medium hover:font-bold'>
              #e5352
            </Typography>
          </Link>
        </Tooltip>

        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          27/5/2023
        </Typography>
        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          <span className='ml-6'>3</span>
        </Typography>
        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          <span>Trần Anh Thi</span>
        </Typography>
        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          134 Cao Bá Đạt, Võ Xu, Đức Linh, Bình Thuận
        </Typography>
        <Typography variant='small' color='red' className='flex items-center font-medium'>
          2.000.000 VNĐ
        </Typography>
        <Typography variant='small' color='blue-gray' className='flex items-center font-medium'>
          <Chip
            variant='ghost'
            color='green'
            size='sm'
            value='Success'
            className='rounded-full'
            icon={<span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />}
          />
        </Typography>

        <Tooltip
          content='Xem thêm'
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 }
          }}
          placement='bottom'
        >
          <button onClick={toggleOpen} className='flex cursor-pointer content-end items-center rounded-full bg-white'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
              <path
                fillRule='evenodd'
                d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </Tooltip>
      </div>
      <Collapse open={isOpen}>
        <div className='mb-3 w-full rounded-md rounded-t-none border-t border-gray-400 bg-gray-200 px-12'>
          <div className='flex h-full w-full justify-center'>
            <table className='h-full w-full min-w-max  text-left'>
              <tbody>
                <tr className='even:bg-blue-gray-50/50'>
                  <td className='w-[300px] p-4'>
                    <div className=' flex w-fit items-center'>
                      <img
                        src='https://storage.googleapis.com/my-image-products/iphone-14-pro-max--p459617sku=220909017.webp'
                        alt=''
                        width={50}
                      ></img>
                      <Typography variant='small' color='blue-gray' className='ml-3 flex items-center font-bold'>
                        Iphone 14 Pro Max 1TB Deep purple
                      </Typography>
                    </div>
                  </td>
                  <td className='w-[150px] p-4'>
                    <Typography variant='small' color='red' className='flex items-center '>
                      500.000 VNĐ
                    </Typography>
                  </td>
                  <td className='w-[100px] p-4'>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      x2
                    </Typography>
                  </td>
                  <td className='w-[165px] p-4'>
                    <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                      <Typography variant='small' color='red' className='flex items-center '>
                        1.000.000 VNĐ
                      </Typography>
                    </Typography>
                  </td>
                </tr>
                <tr className='even:bg-blue-gray-50/50'>
                  <td className='w-[300px] p-4'>
                    <div className=' flex w-fit items-center'>
                      <img
                        src='https://storage.googleapis.com/my-image-products/iphone-14-pro-max--p459617sku=220909017.webp'
                        alt=''
                        width={50}
                      ></img>
                      <Typography variant='small' color='blue-gray' className='ml-3 flex items-center font-bold'>
                        Iphone 14 Pro Max 1TB Deep purple
                      </Typography>
                    </div>
                  </td>
                  <td className='w-[150px] p-4'>
                    <Typography variant='small' color='red' className='flex items-center '>
                      500.000 VNĐ
                    </Typography>
                  </td>
                  <td className='w-[100px] p-4'>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      x2
                    </Typography>
                  </td>
                  <td className='w-[165px] p-4'>
                    <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                      <Typography variant='small' color='red' className='flex items-center '>
                        1.000.000 VNĐ
                      </Typography>
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Collapse>
    </div>
  )
}

export default ListOrdered
