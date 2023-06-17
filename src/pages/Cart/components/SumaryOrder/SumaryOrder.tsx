import { Card, CardBody, Input } from '@material-tailwind/react'

function SumaryOrder() {
  return (
    <>
      <div className='flex w-96 flex-col gap-4'>
        <Card className=' w-full'>
          <CardBody className='flex items-center gap-2'>
            <div className='flex items-center gap-3'>
              <img src='https://www.october16th.store/assets/logo-3c597220.png' alt='logo' width='32' height='32' />
              <div className='font-bold'>CÔNG TY TNHH MTV THƯƠNG MẠI DỊCH VỤ</div>
            </div>
          </CardBody>
        </Card>

        <div className='flex flex-col'>
          <Card className=' h-full w-full rounded-b-none'>
            <CardBody>
              <div color='blue-gray' className='mb-2 text-lg font-bold'>
                Chính sách bán hàng
              </div>

              <div className='flex w-fit gap-3'>
                <Input
                  type='text'
                  placeholder='Nhập mã giảm giá'
                  className='!border-t-blue-gray-200 focus:!border-t-blue-500 '
                  labelProps={{
                    className: 'before:content-none after:content-none'
                  }}
                  containerProps={{
                    className: 'min-w-0'
                  }}
                />
                <button className='w-32 rounded-lg border border-gray-400 bg-deep-purple-400 p-3 py-2 text-white hover:border-indigo-700'>
                  Áp dụng
                </button>
              </div>
            </CardBody>
          </Card>
          <Card className=' h-full w-full rounded-none border-t border-gray-300'>
            <CardBody>
              <div className='flex items-center justify-between'>
                <span className='text-black'>Tạm tính</span>
                <span className='text-sm font-bold text-gray-900'>8.500.000 VNĐ</span>
              </div>
            </CardBody>
          </Card>
          <Card className=' h-full w-full rounded-none border-t border-gray-300'>
            <CardBody>
              <div className='flex h-10 items-center justify-between bg-white '>
                <div className='flex items-center gap-1 leading-none'>
                  <span className='text-black'>Tổng cộng</span>
                  <div className='md:hidden'>
                    <span role='img' aria-label='caret-up' className='anticon anticon-caret-up text-gray-500'>
                      <svg
                        viewBox='0 0 1024 1024'
                        focusable='false'
                        data-icon='caret-up'
                        width='1em'
                        height='1em'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path d='M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z'></path>
                      </svg>
                    </span>
                  </div>
                </div>
                <span className='flex flex-col'>
                  <span className='text-xl font-medium text-red-500 md:text-base'>8.500.000 VNĐ</span>
                  <span className='block text-[10px]'>(Đã bao gồm VAT nếu có)</span>
                </span>
              </div>
            </CardBody>
          </Card>

          <button className='w-full rounded-lg rounded-t-none border border-gray-400 bg-deep-purple-400 p-3 text-lg text-white hover:border-indigo-700'>
            Mua hàng (0)
          </button>
        </div>
      </div>
    </>
  )
}

export default SumaryOrder
