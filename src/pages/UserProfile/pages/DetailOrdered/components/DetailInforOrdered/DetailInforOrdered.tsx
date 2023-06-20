import { Card, CardBody, CardFooter, Typography } from '@material-tailwind/react'

function DetailInforOrdered() {
  return (
    <div className='mt-8 flex justify-center'>
      <Card className='w-[640px] bg-gray-200'>
        <CardBody>
          <div className='mb-2 flex justify-between border-b border-gray-400 pb-3'>
            <Typography variant='h5' color='blue-gray' className=''>
              Thông tin hóa đơn
            </Typography>
            <Typography variant='h5' color='red' className=''>
              5.000.000 VNĐ
            </Typography>
          </div>
          <div className='flex '>
            <Typography variant='head' color='blue-gray' className='flex-1'>
              <span className='font-bold'>Mã hóa đơn: </span>456yrrtrt
            </Typography>
            <Typography variant='head' color='blue-gray' className='flex-1'>
              <span className='font-bold'>Ngày mua </span>27/05/2023
            </Typography>
          </div>
          <div className='flex '>
            <Typography variant='head' color='blue-gray' className='flex-1'>
              <span className='font-bold'>Tên khách hàng: </span>Tràn Anh Thi
            </Typography>
            <Typography variant='head' color='blue-gray' className='flex-1'>
              <span className='font-bold'>Số điện thoại: </span>035958588
            </Typography>
          </div>
          <Typography variant='head' color='blue-gray' className='flex-1'>
            <span className='font-bold'>Địa chỉ: </span>134 Cao Bá Đạt, Võ Xu, Đức Linh, Bình Thuận
          </Typography>
          <Typography variant='head' color='blue-gray' className='flex-1'>
            <span className='font-bold'>Phí ship: </span>50.000 VNĐ
          </Typography>
          <Typography variant='head' color='blue-gray' className='flex-1'>
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
