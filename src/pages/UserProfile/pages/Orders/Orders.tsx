import { Typography } from '@material-tailwind/react'
import ListOrdered from './components/ListOrdered'

function Orders() {
  return (
    <>
      <div className='bg-gray-300 px-2 py-6'>
        <div className='rounded bg-white p-8 shadow'>
          {' '}
          <div className='  border-b border-gray-400 text-start'>
            <div className=' flex justify-between'>
              {' '}
              <div>
                <h1 className='text-2xl font-bold text-gray-700'>Đơn hàng đã mua</h1>{' '}
                <div className='opacity-60'>Để xem chi tiết đơn hàng bấm vào ID đơn hàng</div>
              </div>
            </div>{' '}
            <div className='mt-4 flex justify-center text-start text-gray-500'></div>{' '}
          </div>
          <div className='mt-8'>
            <div className='mb-5 grid w-full grid-cols-[80px_100px_100px_175px_400px_150px_100px_20px] rounded-md bg-gray-200 p-3'>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                ID
              </Typography>

              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Ngày
              </Typography>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Sẩn phẩm
              </Typography>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Người nhận
              </Typography>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Địa chỉ
              </Typography>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Thành tiền
              </Typography>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                Trạng thái
              </Typography>
              <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
                {''}
              </Typography>
            </div>

            <ListOrdered />
            <ListOrdered />
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders
