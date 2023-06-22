import { Card, CardBody, Typography } from '@material-tailwind/react'
import { OrderType } from 'src/types/order.type'
interface Props {
  detailOrder: OrderType
}

function CustomerDetail({ detailOrder }: Props) {
  return (
    <div className='mt-8 flex justify-center'>
      <Card className='w-full bg-gray-200'>
        <CardBody>
          <Typography color='blue-gray' className='mb-2 border-b border-blue-gray-100 pb-3 text-lg font-bold'>
            Thông tin khách hàng và đơn hàng
          </Typography>
          <div className='mb-2 flex items-center justify-between border-b border-blue-gray-100 pb-3'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Mã đơn hàng:
            </Typography>
            <Typography color='blue-gray' className='text-sm font-normal'>
              {detailOrder?.id.slice(-5).toUpperCase()}
              {''}
            </Typography>
          </div>
          <div className='mb-2 flex items-center justify-between border-b border-blue-gray-100 pb-3'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Tên khách hàng:
            </Typography>
            <Typography color='blue-gray' className='text-sm font-normal'>
              {detailOrder?.contact.name}
              {''}
            </Typography>
          </div>
          <div className='mb-2 flex items-center justify-between border-b border-blue-gray-100 pb-3'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Số điện thoại:
            </Typography>
            <Typography color='blue-gray' className='text-sm font-normal'>
              {detailOrder?.contact.phone}
              {''}
            </Typography>
          </div>
          <div className='mb-2 flex items-center justify-between border-b border-blue-gray-100 pb-3'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Địa chỉ:
            </Typography>
            <Typography color='blue-gray' className='text-sm font-normal'>
              {detailOrder?.contact.addr}
              {''}
            </Typography>
          </div>
          <div className='flex items-center justify-between'>
            <Typography color='blue-gray' className=' text-sm font-bold'>
              Hình thức giao hàng:
            </Typography>
            <Typography color='blue-gray' className='text-sm font-normal'>
              <span className='mr-2 font-black text-red-400'>FAST</span>Giao hàng tiết kiệm
            </Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default CustomerDetail
