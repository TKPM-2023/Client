import { useContext, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import routes from 'src/constants/routes'
import Input from 'src/components/Input'
import Button from 'src/components/Button'
import authApi from 'src/apis/auth.api'
import schema, { Schema } from 'src/utils/rules'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { Helmet } from 'react-helmet-async'

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

function Login() {
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
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: ({ signal }) => authApi.getProfile({ signal }),
    enabled: loginAccountMutation.isSuccess,
    onSuccess: (data) => {
      const profile = data.data.data
      setProfile(profile)
      setProfileToLS(profile)
      setIsAuthenticated(true)
      navigate(routes.home)
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
      <Helmet>
        <title>Nón Trùm | Đăng Nhập</title>
        <meta name='description' content='Đăng nhập để truy cập vào Nón Trùm' />
      </Helmet>
      <div className='mx-8 lg:col-span-2 lg:col-start-4'>
        <form className='rounded bg-white px-8 py-6 shadow-md' noValidate onSubmit={onSubmit}>
          <h1 className='text-xl'>Đăng nhập</h1>

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
            <Link to={routes.register} className='text-red-500'>
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
