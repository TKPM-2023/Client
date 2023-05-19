import http from 'src/utils/http'
import { LoginResponse } from 'src/types/auth.type'
import { LoginFormDataType, RegisterFormDataType } from 'src/utils/rules'

export const registerAccount = (body: Omit<RegisterFormDataType, 'confirm_password'>) => {
  return http.post('register', body)
}

export const loginAccount = (body: LoginFormDataType) => {
  return http.post<LoginResponse>('login', body)
}
