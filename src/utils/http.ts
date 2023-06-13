import axios from 'axios'
import { toast } from 'react-toastify'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS } from './auth'
import { LoginResponse } from 'src/types/auth.type'

const API_URL = import.meta.env.VITE_API_URL as string

const createHttpInstance = () => {
  let access_token = getAccessTokenFromLS()

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

      if (url === 'authenticate') {
        const data = response.data.data as LoginResponse
        access_token = data.access_token.token
        setAccessTokenToLS(access_token)
      }

      return response
    },
    function (error) {
      if (error.config.url !== 'authenticate' && error.config.url !== 'register') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any | undefined = error.response?.data
        const errorMessage = data?.message || error.message
        toast.error(errorMessage)

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
