import { Card, CardBody, Typography } from '@material-tailwind/react'
import { OrderType } from 'src/types/order.type'
import { formatTime } from 'src/pages/DetailProduct/components/ProductReview/ProductReview'

interface Props {
  detailOrder: OrderType
}

function DetailInforOrdered({ detailOrder }: Props) {
  return (
    <div className='-row mt-6 flex flex-col justify-center gap-6'>
      <Card className=' w-full bg-gray-300'>
        <CardBody className='flex items-center gap-2'>
          <div className='flex items-center gap-3'>
            <img src='https://www.october16th.store/assets/logo-3c597220.png' alt='logo' width='32' height='32' />
            <div className='font-bold'>CÔNG TY TNHH MTV THƯƠNG MẠI DỊCH VỤ</div>
          </div>
        </CardBody>
      </Card>

      <Card className=' w-full bg-gray-300'>
        <CardBody className='flex flex-col gap-2'>
          <Typography color='blue-gray' className='mb-2 border-b border-blue-gray-100 pb-3 text-lg font-bold'>
            Hóa đơn chi tiết
          </Typography>
          <div className='mb-2 flex items-center justify-between border-b border-blue-gray-100 pb-3'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Ngày mua:
            </Typography>
            <Typography color='blue-gray' className='text-sm font-normal'>
              {formatTime(detailOrder?.created_at)}
              {''}
            </Typography>
          </div>
          <div className='mb-2 flex items-center justify-between border-b border-blue-gray-100 pb-3'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Hình thức thanh toán:
            </Typography>
            <div className='flex items-center gap-2'>
              <img
                src='data:image/png;base64,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'
                alt='vnpay-img'
                width='34'
                height='34'
              />
              <span>Momo</span>
            </div>
          </div>
          <div className='mb-2 flex items-center justify-between border-b border-blue-gray-100 pb-3'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Thành tiền:
            </Typography>
            <Typography color='red' className='text-sm font-normal'>
              {(detailOrder?.total_price - 20000).toLocaleString('vi-VN')} VNĐ
              {''}
            </Typography>
          </div>
          <div className='flex items-center justify-between '>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Phí vận chuyển:
            </Typography>
            <Typography color='red' className='text-sm font-normal'>
              20.000 VNĐ
              {''}
            </Typography>
          </div>
        </CardBody>
      </Card>

      <Card className=' w-full bg-gray-300'>
        <CardBody className=''>
          <div className='flex items-center justify-between'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Tổng tiền:
            </Typography>
            <Typography color='red' className=' text-[16px] font-bold'>
              {detailOrder?.total_price.toLocaleString('vi-VN')} VNĐ
              {''}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default DetailInforOrdered
