import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import config from 'src/config'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { registerAccount } from 'src/apis/auth.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import schema, { RegisterFormDataType } from 'src/utils/rules'
import { ErrorResponse } from 'src/types/auth.type'

type FormData = RegisterFormDataType

function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate(config.routes.login)
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorResponse>(error)) {
          const formError = error.response?.data
          if (formError && formError.error_key === 'ErrEmailExist') {
            setError('email', {
              message: formError.message,
              type: 'server'
            })
          }
        }
      }
    })
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

          <Button
            type='submit'
            className='mt-2 w-full rounded bg-orange px-4 py-2 text-sm uppercase text-white'
            isLoading={registerMutation.isLoading}
            disabled={registerMutation.isLoading}
          >
            Đăng ký
          </Button>
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
