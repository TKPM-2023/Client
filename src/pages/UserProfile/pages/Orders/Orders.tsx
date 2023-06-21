import { Typography } from '@material-tailwind/react'
import ListOrdered from './components/ListOrdered'
import orderApi from 'src/apis/order.api'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AppContext } from 'src/contexts/app.context'
import { Link } from 'react-router-dom'
import images from 'src/assets/images'

function Orders() {
  const { profile } = useContext(AppContext)

  const orderQueryConfig = {
    user_id: `"${profile?.id}"`
  }
  const { data: orderData } = useQuery({
    queryKey: ['order', orderQueryConfig],
    queryFn: () => orderApi.getListOrder(orderQueryConfig),
    keepPreviousData: true
  })

  const orderList = orderData?.data.data

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
          {/* Hiển thị đanh sách các order */}
          {orderList?.length === 0 ? (
            <div className='mb-16 text-center'>
              <img src={images.emptyCart} alt='empty-cart' className='inline-block mix-blend-darken md:w-1/3' />
              <p className='mb-4 text-base font-medium md:mb-3'>Bạn chưa chưa mua bất kì thứ gì!</p>
              <button
                type='button'
                className='ant-btn css-1e3x2xa ant-btn-default h-12 w-full rounded-md bg-[#9333EA] text-base font-bold text-white md:w-72'
              >
                <Link to='/'>Tiếp tục mua sắm</Link>
              </button>
            </div>
          ) : (
            <div className='mt-8'>
              <div className='mb-5 grid w-full grid-cols-[80px_100px_100px_175px_380px_150px_120px_20px] rounded-md bg-gray-200 p-3'>
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

              {orderList?.map((order) => (
                <ListOrdered key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Orders
