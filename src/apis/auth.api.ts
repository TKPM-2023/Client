import http from 'src/utils/http'
import { LoginResponse } from 'src/types/auth.type'
import { Schema } from 'src/utils/rules'
import { User } from 'src/types/user.type'

export const registerAccount = (body: Pick<Schema, 'email' | 'first_name' | 'last_name' | 'password'>) => {
  return http.post('register', body)
}

export const loginAccount = (body: Pick<Schema, 'email' | 'password'>) => {
  return http.post<LoginResponse>('authenticate', body)
}

export const getProfile = ({ signal }: { signal?: AbortSignal }) => {
  return http.get<{ data: User }>('profile', {
    signal
  })
}
