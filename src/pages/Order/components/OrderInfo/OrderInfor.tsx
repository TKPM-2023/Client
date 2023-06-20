import { Typography, Radio } from '@material-tailwind/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { ProductIsOrderingType } from 'src/types/cart.type'
import { useState } from 'react'

interface Props {
  listProductIsOrdering: ProductIsOrderingType[]
  setDeliveryCost: React.Dispatch<React.SetStateAction<number>>
}

const TABLE_HEAD = ['Tên sản phẩm', 'Đơn giá', 'Số lượng', 'Thành tiền']

function OrderInfor({ listProductIsOrdering, setDeliveryCost }: Props) {
  const [isFastDeliveryMethod, setIsFastDeliveryMethod] = useState<boolean>(true)
  const [paymentMethod, setPaymentMethod] = useState('cash')

  const handleFastDeliveryButton = () => {
    setIsFastDeliveryMethod(true)
    setDeliveryCost(50000)
  }

  const handleNowDeliveryButton = () => {
    setIsFastDeliveryMethod(false)
    setDeliveryCost(20000)
  }

  const handleSetPaymentMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value)
  }

  return (
    <div className='flex h-full w-[920px] flex-col '>
      <div className='h-full w-[920px] rounded-md bg-white p-4'>
        <div className='mb-2 text-xl font-bold'>Danh sách sản phẩm</div>
        <div className='flex h-full w-full justify-center'>
          <table className='h-full w-full min-w-max  text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography variant='small' color='black' className='font-normal leading-none'>
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listProductIsOrdering.map((product) => (
                <tr key={product.product_id} className='even:bg-blue-gray-50/50'>
                  <td className='w-[400px] p-4'>
                    <div className=' flex w-fit items-center'>
                      <img src={product.images[0].url} alt='' width={77}></img>
                      <Typography variant='small' color='blue-gray' className='ml-3 flex items-center font-bold'>
                        {product.name}
                      </Typography>
                    </div>
                  </td>
                  <td className='w-[150px] p-4'>
                    <Typography variant='small' color='red' className='flex items-center '>
                      {product.price.toLocaleString('vi-VN')} VNĐ
                    </Typography>
                  </td>
                  <td className='w-[100px] p-4'>
                    <Typography variant='small' color='blue-gray' className='font-normal'>
                      {product.quantity}
                    </Typography>
                  </td>
                  <td className='w-[165px] p-4'>
                    <Typography as='a' href='#' variant='small' color='blue' className='font-medium'>
                      <Typography variant='small' color='red' className='flex items-center '>
                        {(product.price * product.quantity).toLocaleString('vi-VN')} VNĐ
                      </Typography>
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Phần phương thức vận chuyển */}

        <div className=''>
          <div className='my-2 text-xl font-bold'>Phương thức giao hàng</div>
          <div className='flex gap-4'>
            <button
              onClick={handleFastDeliveryButton}
              className={`${
                isFastDeliveryMethod ? 'border-2 border-deep-purple-500' : 'border-gray-200'
              } flex w-fit items-start justify-center gap-20 gap-3 rounded-lg border bg-gray-100 p-4`}
            >
              <span className='flex flex-col items-start'>
                <span className=''>
                  <span className='mr-2 font-black text-yellow-400'>FAST</span>Giao hàng nhanh
                </span>
                <span className='font-light'>1-2 ngày nhận hàng</span>
                <span className='mt-6 text-red-500'>50.000 VNĐ</span>
              </span>
              <CheckCircleIcon className={`${isFastDeliveryMethod ? '' : 'invisible'} h5 w-5 text-deep-purple-500`} />
            </button>
            <button
              onClick={handleNowDeliveryButton}
              className={`${
                !isFastDeliveryMethod ? 'border-2 border-deep-purple-500' : 'border-gray-200'
              } flex w-fit cursor-pointer items-start justify-center gap-20 gap-3 rounded-lg border bg-gray-100 p-4`}
            >
              <span className='flex flex-col items-start'>
                <span className=''>
                  <span className='mr-2 font-black text-red-500'>NOW</span>Giao hàng tiết kiệm
                </span>
                <span className='font-light'>4-6 ngày nhận hàng</span>
                <span className='mt-6 text-red-500'>20.000 VNĐ</span>
              </span>
              <CheckCircleIcon className={`${!isFastDeliveryMethod ? '' : 'invisible'} h5 w-5 text-deep-purple-500`} />
            </button>
          </div>
        </div>

        {/* Phần phương thức thanh toán */}
        <div>
          <div className='mt-2 text-xl font-bold'>Phương thức thanh toán</div>
          <div className='flex gap-10'>
            <Radio
              name='type'
              value='cash'
              checked={paymentMethod === 'cash'}
              onChange={handleSetPaymentMethod}
              label={
                <div className='flex items-center gap-2'>
                  <img
                    src='data:image/png;base64,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'
                    alt='later-money'
                    width='32'
                    height='32'
                  />
                  <span>Thanh toán khi nhận được hàng</span>
                </div>
              }
            />

            <Radio
              name='type'
              value='momo'
              checked={paymentMethod === 'momo'}
              onChange={handleSetPaymentMethod}
              label={
                <div className='flex items-center gap-2'>
                  <img
                    src='data:image/png;base64,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'
                    alt='vnpay-img'
                    width='34'
                    height='34'
                  />
                  <span>Thanh toán bằng Momo</span>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderInfor
