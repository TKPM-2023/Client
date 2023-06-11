import { Input, Typography, Button } from '@material-tailwind/react'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

function ChangePassword() {
  return (
    <>
      <div className='bg-gray-300 p-16 pt-6'>
        <div className='mt-12 rounded bg-white p-8 shadow'>
          {' '}
          <div className=' border-b text-start'>
            {' '}
            <h1 className='text-2xl font-bold text-gray-700'>Đổi mật khẩu</h1>{' '}
            <p className='mt-3 font-light text-gray-600'>
              Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
            </p>{' '}
            <div className='mt-8 flex justify-center text-start text-gray-500'></div>{' '}
          </div>{' '}
          <div className='mt-8'>
            <div className='w-[32rem]'>
              <Input type='password' label='Nhập mật khẩu' variant='outlined' required />
              <Typography variant='small' color='gray' className='mt-2 flex items-center gap-1 font-normal'>
                <InformationCircleIcon className='-mt-px h-4 w-4' />
                Mật khẩu mới có ít nhất 8 kí tự
              </Typography>
            </div>
            <div className='mt-6 w-[32rem]'>
              <Input type='password' label='Nhập lại mật khẩu' variant='outlined' required />
            </div>
            <Button className='mt-6' variant='gradient'>
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePassword
