import axios from 'axios'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from './auth'
import { LoginResponse } from 'src/types/auth.type'
import { URL_LOGIN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosUnauthorizedError } from './utils'
import { ErrorResponse } from 'src/types/utils.type'

const API_URL = import.meta.env.VITE_API_URL as string

const createHttpInstance = () => {
  let access_token = getAccessTokenFromLS()
  let refresh_token = getRefreshTokenFromLS()

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
    function (error) {
      if (error.config.url !== URL_LOGIN && error.config.url !== URL_REGISTER) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const errorMessage = data?.message || error.message
        toast.error(errorMessage)
      }

      // Unauthorized error
      if (isAxiosUnauthorizedError(error)) {
        const data = error.response?.data as ErrorResponse
        // Wrong access token
        if (data.error_key === 'ErrInvalidToken') {
          access_token = ''
          clearLS()
        }
      }

      return Promise.reject(error)
    }
  )

  return http
}

export default createHttpInstance()
