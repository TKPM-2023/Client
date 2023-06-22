import { Card, CardHeader, CardBody, Typography, Avatar } from '@material-tailwind/react'
import { StarIcon } from '@heroicons/react/24/solid'
function Reviews() {
  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-12 rounded bg-white p-8 shadow'>
          {' '}
          <div className='  border-b text-start'>
            <div className=' flex justify-between'>
              {' '}
              <h1 className='text-2xl font-bold text-gray-700'>Danh sách đánh giá</h1>{' '}
            </div>{' '}
            <div className='mt-4 flex justify-center text-start text-gray-500'></div>{' '}
          </div>
          <div className='mt-8 rounded border-2 p-6'>
            <Card color='transparent' shadow={false} className='w-full '>
              <CardHeader
                color='transparent'
                floated={false}
                shadow={false}
                className='mx-0 flex items-center gap-4 pb-8 pt-0'
              >
                <Avatar
                  size='lg'
                  variant='circular'
                  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                  alt='candice wu'
                />
                <div className='flex w-full flex-col gap-0.5'>
                  <div className='flex items-center justify-between'>
                    <Typography variant='h5' color='blue-gray'>
                      Thi đẹp trai
                    </Typography>
                    <div className='flex items-center justify-center gap-4'>
                      <Avatar
                        src='https://nontrum.vn/wp-content/uploads/2018/11/royal-m139-den-bong-e1681460645978.jpg'
                        alt='avatar'
                        variant='square'
                      />
                      <Typography variant='h6' color='blue-gray'>
                        nón siêu cấp
                      </Typography>
                    </div>
                    <div className='5 flex items-center gap-0'>
                      <StarIcon className='h-5 w-5 text-yellow-700' />
                      <StarIcon className='h-5 w-5 text-yellow-700' />
                      <StarIcon className='h-5 w-5 text-yellow-700' />
                      <StarIcon className='h-5 w-5 text-yellow-700' />
                      <StarIcon className='h-5 w-5 text-yellow-700' />
                    </div>
                  </div>
                  <Typography color='blue-gray'>27/5/2023</Typography>
                </div>
              </CardHeader>
              <CardBody className='mb-2 p-0'>
                <Typography>&quot;Cũng đẹp đấy&quot;</Typography>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reviews
