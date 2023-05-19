import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'

import config from 'src/config'
import schema, { Schema } from 'src/utils/rules'

type FormData = Schema

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='grid grid-cols-1 gap-8 bg-orange px-8 py-28 lg:grid-cols-5'>
      <div className='mx-8 lg:col-span-2 lg:col-start-4'>
        <form className='rounded bg-white px-8 py-6 shadow-md' noValidate onSubmit={onSubmit}>
          <h3 className='text-xl'>Đăng ký</h3>

          <div className='mt-6'>
            <Input<FormData>
              className='mt-2'
              type='email'
              name='email'
              placeholder='Email'
              register={register}
              errorMessage={errors.email?.message}
            />
            <Input<FormData>
              className='mt-2'
              type='text'
              name='first_name'
              placeholder='Họ tên đệm'
              register={register}
              errorMessage={errors.first_name?.message}
            />
            <Input<FormData>
              className='mt-2'
              type='text'
              name='last_name'
              placeholder='Tên'
              register={register}
              errorMessage={errors.last_name?.message}
            />
            <Input<FormData>
              className='mt-2'
              type='password'
              name='password'
              placeholder='Mật khẩu'
              register={register}
              errorMessage={errors.password?.message}
            />
            <Input<FormData>
              className='mt-2'
              type='password'
              name='confirm_password'
              placeholder='Nhập lại mật khẩu'
              register={register}
              errorMessage={errors.confirm_password?.message}
            />
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
