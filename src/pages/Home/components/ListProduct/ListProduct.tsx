import { Card, CardHeader, CardBody, Typography, Button, CardFooter, Rating } from '@material-tailwind/react'

function ListProduct() {
  const number = 20000
  //toLocaleString('vi-VN')
  return (
    <div className='ml-12 flex flex-wrap items-center gap-x-8 gap-y-6'>
      <Card className='h-fit w-64'>
        <CardHeader shadow={false} floated={false} className='h-48'>
          <img
            src='https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80'
            className='h-full w-full object-cover'
            alt=''
          />
        </CardHeader>
        <CardBody>
          <div className='mb-2 flex items-center justify-between'>
            <Typography color='blue-gray' className='font-bold'>
              Apple AirPods
            </Typography>
          </div>
          <div className='flex items-center justify-between'>
            <div className='mr-2 border-r-2 border-gray-700 pr-2'>
              <Rating value={4} readonly unratedColor='red' ratedColor='red' />
            </div>
            <Typography variant='small' color='gray' className='font-normal opacity-75'>
              Số lượng: 100
            </Typography>
          </div>
          <Typography variant='h6' color='red' className='mt-4 font-semibold'>
            500.000 VNĐ
          </Typography>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button
            ripple={false}
            fullWidth={true}
            className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
          >
            Thêm vào giỏ
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ListProduct
