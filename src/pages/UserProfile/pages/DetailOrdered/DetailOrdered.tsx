import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import { Typography, Button } from '@material-tailwind/react'
import DetailInforOrdered from './components/DetailInforOrdered'
import StatusOrdered from './components/StatusOrdered'
import ListOrderedProduct from './components/ListOrderedProduct'
import { Link } from 'react-router-dom'
import routes from 'src/constants/routes'

function DetailOrdered() {
  const status = 2
  return (
    <>
      <div className='bg-gray-300 px-2 py-6'>
        <div className='rounded bg-white p-8 shadow'>
          {' '}
          <div className='  border-b border-gray-400 text-start'>
            <div className='flex justify-between'>
              <div className=' flex items-center gap-2'>
                <Link to={routes.userOrders}>
                  <ChevronLeftIcon className='h-6 w-6 hover:text-blue-700'></ChevronLeftIcon>
                </Link>
                <h1 className='text-2xl font-bold text-gray-700'>Đơn hàng #1231312</h1>{' '}
              </div>
              <Button disabled={status === 2 ? true : false} color='red'>
                Hủy đơn hàng
              </Button>
            </div>
            <div className='mt-4 flex justify-center text-start text-gray-500'></div>{' '}
          </div>
          {/* Trạng thái */}
          <StatusOrdered status={status} />
          {/* Danh sách sản phẩm trong đơn hàng */}
          <div className='mb-6 flex justify-center'>
            <div className=' grid w-[940px] grid-cols-[400px_150px_170px_175px_25px] rounded-md bg-gray-200 p-3'>
              <div color='blue-gray' className='flex items-center font-bold'>
                <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                  Sản phẩm
                </Typography>
              </div>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Đơn giá
              </Typography>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Số lượng
              </Typography>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Thành tiền
              </Typography>
              <div></div>
            </div>
          </div>
          <ListOrderedProduct status={status} />
          <ListOrderedProduct status={status} />
          <DetailInforOrdered />
        </div>
      </div>
    </>
  )
}

export default DetailOrdered
