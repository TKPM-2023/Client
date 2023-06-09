import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import routes from 'src/constants/routes'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import authApi from 'src/apis/auth.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { userSchema, UserSchema } from 'src/utils/rules'
import { ErrorResponse } from 'src/types/utils.type'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<UserSchema, 'email' | 'first_name' | 'last_name' | 'password' | 'confirm_password'>

function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(userSchema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate(routes.login)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorResponse>(error)) {
          const formError = error.response?.data
          if (formError) {
            if (formError.error_key === 'ErrEmailExist') {
              setError('email', {
                message: formError.message,
                type: 'server'
              })
            }

            if (formError.error_key === 'InvalidPasswordFormat') {
              setError('password', {
                message: formError.message,
                type: 'server'
              })
            }
          }
        }
      }
    })
  })

  return (
    <div className='grid grid-cols-1 gap-8 bg-cyan-600 px-8 py-28 lg:grid-cols-5'>
      <Helmet>
        <title>Nón Trùm | Đăng Ký</title>
        <meta name='description' content='Đăng ký tài khoản để sử dụng Nón Trùm' />
      </Helmet>
      <div className='col-start-2 flex items-center'>
        <span className='hidden items-center md:block'>
          <img
            src='https://www.october16th.store/assets/logo-3c597220.png'
            alt='logo'
            className='h-300 w-300 object-contain '
          />
        </span>
      </div>
      <div className='mx-8 lg:col-span-2 lg:col-start-4'>
        <form className='rounded bg-white px-8 py-6 shadow-md' noValidate onSubmit={onSubmit}>
          <h1 className='text-xl'>Đăng ký</h1>

          <div className='mt-6'>
            <Input
              className='mt-2'
              type='email'
              name='email'
              placeholder='Email'
              register={register}
              errorMessage={errors.email?.message}
            />
            <Input
              className='mt-2'
              type='text'
              name='first_name'
              placeholder='Họ tên đệm'
              register={register}
              errorMessage={errors.first_name?.message}
            />
            <Input
              className='mt-2'
              type='text'
              name='last_name'
              placeholder='Tên'
              register={register}
              errorMessage={errors.last_name?.message}
            />
            <Input
              className='mt-2'
              type='password'
              name='password'
              placeholder='Mật khẩu'
              register={register}
              errorMessage={errors.password?.message}
            />
            <Input
              className='mt-2'
              type='password'
              name='confirm_password'
              placeholder='Nhập lại mật khẩu'
              register={register}
              errorMessage={errors.confirm_password?.message}
            />
          </div>

          <Button
            type='submit'
            className='mt-2 w-full rounded bg-cyan-400 px-4 py-2 text-sm uppercase text-white'
            isLoading={registerMutation.isLoading}
            disabled={registerMutation.isLoading}
          >
            Đăng ký
          </Button>
          <div className='mt-8 text-center text-sm'>
            <span className='mr-1 text-gray-400'>Bạn đã có tài khoản?</span>
            <Link to={routes.login} className='text-cyan-700'>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
