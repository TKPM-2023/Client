import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'
import { OrderType } from 'src/types/order.type'
import { formatTime } from 'src/pages/DetailProduct/components/ProductReview/ProductReview'

interface Props {
  detailOrder: OrderType
}

function DetailInforOrdered({ detailOrder }: Props) {
  return (
    <div className='mt-8 flex justify-center'>
      <Card className='w-[640px] bg-gray-200'>
        <CardBody>
          <div className='mb-2 flex justify-between border-b border-gray-400 pb-3'>
            <Typography variant='h5' color='blue-gray' className=''>
              Thông tin hóa đơn
            </Typography>
            <Typography variant='h5' color='red' className=''>
              {detailOrder?.total_price.toLocaleString('vi-VN')} VNĐ
            </Typography>
          </div>
          <div className='flex '>
            <Typography variant='lead' color='blue-gray' className='flex-1'>
              <span className='font-bold'>Mã hóa đơn: </span>
              {detailOrder?.id.slice(-5)}
            </Typography>
            <Typography variant='lead' color='blue-gray' className='flex-1'>
              <span className='font-bold'>Ngày mua </span>
              {formatTime(detailOrder?.created_at)}
            </Typography>
          </div>
          <div className='flex '>
            <Typography variant='lead' color='blue-gray' className='flex-1'>
              <span className='font-bold'>Tên khách hàng: </span>
              {detailOrder?.contact.name}
            </Typography>
            <Typography variant='lead' color='blue-gray' className='flex-1'>
              <span className='font-bold'>Số điện thoại: </span>
              {detailOrder?.contact.phone}
            </Typography>
          </div>
          <Typography variant='lead' color='blue-gray' className='flex-1'>
            <span className='font-bold'>Địa chỉ: </span>
            {detailOrder?.contact.addr}
          </Typography>
          <Typography variant='lead' color='blue-gray' className='flex-1'>
            <span className='font-bold'>Phí ship: </span>50.000 VNĐ
          </Typography>
          <Typography variant='lead' color='blue-gray' className='flex-1'>
            <span className='font-bold'>Hình thức thanh toán </span>Tiền mặt
          </Typography>
        </CardBody>
        <CardFooter className='pt-0'>
          <div className='text-end text-xs opacity-50'>Hóa đơn phát hành bởi công ty MTP</div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default DetailInforOrdered
