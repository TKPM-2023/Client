import { useContext, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import config from 'src/config'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import { getProfile, loginAccount } from 'src/apis/auth.api'
import schema, { LoginFormDataType } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/auth.type'
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import useTitle from 'src/hooks/useTitle'

type FormData = LoginFormDataType
const loginSchema = schema.omit(['first_name', 'last_name', 'confirm_password'])

function Login() {
  useTitle('Đăng nhập')
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body)
  })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: ({ signal }) => getProfile({ signal }),
    enabled: loginAccountMutation.isSuccess,
    onSuccess: (data) => {
      setProfile(data.data.data)
      setIsAuthenticated(true)
      navigate(config.routes.home)
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: () => {
        // Khi login thành công thì sẽ gọi api get profile
        // Query key của hàm invalidateQueries match với query key của useQuery trên => Gọi API trên
        queryClient.invalidateQueries({
          queryKey: ['profile']
        })
      },
      onError: (error) => {
        if (isAxiosBadRequestError<ErrorResponse>(error)) {
          // Kiểm tra lỗi có phải từ API trả về không
          const formError = error.response?.data

          if (formError && formError.error_key === 'ErrEmailOrPasswordInvalid') {
            setError('password', {
              message: formError.message,
              type: 'server'
            })
          }
        }
      }
    })
  })

  return (
    <div className='grid grid-cols-1 gap-8 bg-primary px-8 py-28 lg:grid-cols-5'>
      <div className='mx-8 lg:col-span-2 lg:col-start-4'>
        <form className='rounded bg-white px-8 py-6 shadow-md' noValidate onSubmit={onSubmit}>
          <h3 className='text-xl'>Đăng nhập</h3>

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
              type='password'
              name='password'
              placeholder='Mật khẩu'
              register={register}
              errorMessage={errors.password?.message}
            />
          </div>

          <Button
            type='submit'
            className='mt-2 w-full rounded bg-primary px-4 py-2 text-sm uppercase text-white'
            isLoading={loginAccountMutation.isLoading || profileQuery.isInitialLoading}
            disabled={loginAccountMutation.isLoading || profileQuery.isInitialLoading}
          >
            Đăng nhập
          </Button>

          <div className='mt-8 text-center text-sm'>
            <span className='mr-1 text-gray-400'>Bạn đã có tài khoản?</span>
            <Link to={config.routes.register} className='text-red-500'>
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
