import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react'

function UserAddress() {
  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-12 rounded bg-white p-8 shadow'>
          {' '}
          <div className='  border-b text-start'>
            <div className=' flex justify-between'>
              {' '}
              <h1 className='text-2xl font-bold text-gray-700'>Đơn hàng đã mua</h1>{' '}
            </div>{' '}
            <div className='mt-4 flex justify-center text-start text-gray-500'></div>{' '}
          </div>
          <div className='mt-8'>
            <Card className='w-full flex-row border-t '>
              <CardHeader shadow={false} floated={false} className='m-0 w-2/5 shrink-0 rounded-r-none'>
                <img
                  src='https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
                  alt=''
                  className='h-full w-full object-cover'
                />
              </CardHeader>
              <CardBody className='m-0 w-3/5 shrink-0 rounded-r-none'>
                <Typography variant='h6' color='green' className='mb-4 border-b pb-4 text-end uppercase'>
                  Đã giao hàng
                </Typography>
                <div className='flex items-center justify-between border-b pb-4'>
                  <div>
                    <Typography variant='h4' color='blue-gray' className='mb-2'>
                      Nón Pro vip 123
                    </Typography>
                    <Typography color='gray' className=' font-normal'>
                      Số lượng: <span>1</span>
                    </Typography>
                    <Typography color='gray' className=' font-normal'>
                      Đơn giá: <span className='text-primary'>1 vnđ</span>
                    </Typography>
                  </div>
                  <div className=''>
                    <span>Thành tiền: </span>
                    <span className='text-2xl text-primary'>500,000</span>
                  </div>
                </div>
                <div className='mt-4 flex justify-end gap-4'>
                  <Button variant='gradient'>Đánh giá</Button>
                  <Button variant='outlined'>Mua lại</Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAddress
