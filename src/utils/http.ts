import axios, { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from './auth'
import { LoginResponse, RefreshTokenResponse } from 'src/types/auth.type'
import { URL_LOGIN, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

const API_URL = import.meta.env.VITE_API_URL as string

const createHttpInstance = () => {
  let access_token = getAccessTokenFromLS()
  let refresh_token = getRefreshTokenFromLS()
  let refreshTokenRequest: Promise<void> | null = null

  const http = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Add a request interceptor
  http.interceptors.request.use(
    function (config) {
      if (access_token) config.headers.Authorization = 'Bearer ' + access_token
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  http.interceptors.response.use(
    function (response) {
      const url = response.config.url

      if (url === URL_LOGIN) {
        const data = response.data.data as LoginResponse
        access_token = data.access_token.token
        refresh_token = data.refresh_token.token
        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
      }

      return response
    },
    async function (error: AxiosError) {
      if (
        error.config?.url !== URL_LOGIN &&
        error.config?.url !== URL_REGISTER &&
        error.response?.status !== HttpStatusCode.Unauthorized
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const errorMessage = data?.message || error.message
        toast.error(errorMessage)
      }

      // Unauthorized error
      if (isAxiosUnauthorizedError<ErrorResponse>(error)) {
        const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)
        const { url } = config

        // Trường hợp token hết hạn và request đó không phải của refresh token
        // thì mới gọi refresh token
        if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
          // Tránh gọi refresh token 2 lần
          refreshTokenRequest = refreshTokenRequest
            ? refreshTokenRequest
            : handleRefreshToken().finally(() => {
                // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                setTimeout(() => {
                  refreshTokenRequest = null
                }, 10000)
              })

          await refreshTokenRequest
          return await http(config)
        }

        // Còn những trường hợp token không đúng
        // không truyền token
        // token hết hạn
        // nhưng gọi refresh token fail
        // thì tiến hành xóa local storage và toast message
        access_token = ''
        refresh_token = ''
        clearLS()
        toast.error(error.response?.data.message || error.message)
      }

      return Promise.reject(error)
    }
  )

  const handleRefreshToken = async () => {
    try {
      const res = await http.post<RefreshTokenResponse>(URL_REFRESH_TOKEN, { refresh_token })
      access_token = res.data.data.access_token.token
      setAccessTokenToLS(access_token)
    } catch (error) {
      clearLS()
      access_token = ''
      refresh_token = ''
      throw error
    }
  }

  return http
}

export default createHttpInstance()
