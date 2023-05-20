import http from 'src/utils/http'
import { LoginResponse } from 'src/types/auth.type'
import { LoginFormDataType, RegisterFormDataType } from 'src/utils/rules'
import { User } from 'src/types/user.type'

export const registerAccount = (body: Omit<RegisterFormDataType, 'confirm_password'>) => {
  return http.post('register', body)
}

export const loginAccount = (body: LoginFormDataType) => {
  return http.post<LoginResponse>('authenticate', body)
}

export const getProfile = ({ signal }: { signal?: AbortSignal }) => {
  return http.get<{ data: User }>('profile', {
    signal
  })
}
