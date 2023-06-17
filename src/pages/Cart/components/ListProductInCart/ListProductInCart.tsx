import { Typography, Checkbox, Tooltip } from '@material-tailwind/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

import { useState } from 'react'

const product = {
  quantity: 10
}

function ListProductInCart() {
  const [quantityOrder, setQuantityOrder] = useState<number>(1)

  const handlePlusButton = () => {
    if (quantityOrder < product.quantity) setQuantityOrder(quantityOrder + 1)
    else setQuantityOrder(product.quantity)
  }

  const handleMinusButton = () => {
    if (quantityOrder > 2) setQuantityOrder(quantityOrder - 1)
    else setQuantityOrder(1)
  }
  return (
    <div className='flex flex-col '>
      <div className=' grid w-full grid-cols-[400px_150px_170px_175px_25px] rounded-md bg-white'>
        <div color='blue-gray' className='flex items-center font-bold'>
          <Checkbox />
          <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
            Tất cả (5 sản phẩm)
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
        <Tooltip
          content='Xóa các mục đã chọn'
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 }
          }}
          placement='bottom'
        >
          <div className='flex cursor-pointer content-end items-center'>
            <svg
              viewBox='64 64 896 896'
              focusable='false'
              data-icon='delete'
              width='1em'
              height='1em'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z'></path>
            </svg>
          </div>
        </Tooltip>
      </div>

      <div className=' mt-3 grid w-full grid-cols-[400px_150px_170px_175px_25px] rounded-md bg-white'>
        <div className='flex items-center font-bold'>
          <Checkbox id='hihi' />
          <div className='flex items-center py-3 pr-8'>
            <img
              src='https://storage.googleapis.com/my-image-products/ghe-corsair-tc200-leatherette-black-black--s220806204.png'
              alt=''
              width={77}
            ></img>
            <Typography variant='small' color='blue-gray' className='flex items-center font-bold'>
              Ghế Corsair TC200 Leatherette Black-Black
            </Typography>
          </div>
        </div>
        <Typography variant='small' color='red' className='flex items-center '>
          8.500.000 VNĐ
        </Typography>
        <div color='blue-gray' className='font-meidum flex items-center'>
          <div className='flex w-fit items-center rounded border border-gray-700'>
            <button
              className='rounded-0 flex items-center gap-3 p-3 py-2 hover:rounded hover:bg-gray-300'
              onClick={handleMinusButton}
            >
              <MinusIcon strokeWidth={2} className='h-3 w-3' />
            </button>
            <div className='border-x border-gray-700 px-3 '>{quantityOrder}</div>
            <button
              className='flex items-center gap-3 p-3 py-2 hover:rounded hover:bg-gray-300'
              onClick={handlePlusButton}
            >
              <PlusIcon strokeWidth={2} className='h-3 w-3' />
            </button>
          </div>
        </div>
        <Typography variant='small' color='red' className='flex items-center '>
          8.500.000 VNĐ
        </Typography>
        <div className='flex cursor-pointer content-end items-center'>
          <svg
            viewBox='64 64 896 896'
            focusable='false'
            data-icon='delete'
            width='1em'
            height='1em'
            fill='currentColor'
            aria-hidden='true'
          >
            <path d='M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z'></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ListProductInCart
