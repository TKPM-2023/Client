import { Link } from 'react-router-dom'
import config from 'src/config'

function Register() {
  return (
    <div className='grid grid-cols-1 gap-8 bg-orange px-8 py-28 lg:grid-cols-5'>
      <div className='lg:col-span-2 lg:col-start-4'>
        <form className='rounded bg-white px-8 py-6 shadow-md'>
          <h3 className='text-xl'>Đăng ký</h3>

          <div className='mt-6'>
            <div className='mt-2'>
              <input
                type='text'
                name='username'
                className='w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                placeholder='Tên tài khoản'
              />
              <div className='min-h-[1rem] text-xs text-red-400'></div>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                name='password'
                className='w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                placeholder='Mật khẩu'
              />
              <div className='min-h-[1rem] text-xs text-red-400'></div>
            </div>
            <div className='mt-2'>
              <input
                type='password'
                name='confirm_password'
                className='w-full border border-gray-300 p-2 text-sm outline-none focus:border-gray-400'
                placeholder='Nhập lại mật khẩu'
              />
              <div className='min-h-[1rem] text-xs text-red-400'></div>
            </div>
          </div>

          <button type='submit' className='mt-2 w-full rounded bg-orange px-4 py-2 text-sm uppercase text-white'>
            Đăng ký
          </button>

          <div className='mt-8 text-center text-sm'>
            <span className='mr-1 text-gray-400'>Bạn đã có tài khoản?</span>
            <Link to={config.routes.login} className='text-red-500'>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
