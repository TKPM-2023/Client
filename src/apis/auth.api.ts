import http from 'src/utils/http'
import { LoginResponse } from 'src/types/auth.type'
import { UserSchema } from 'src/utils/rules'
import { Profile } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'

export const URL_REGISTER = 'register'
export const URL_LOGIN = 'authenticate'
export const URL_REFRESH_TOKEN = 'refresh'

const authApi = {
  registerAccount: (body: Pick<UserSchema, 'email' | 'first_name' | 'last_name' | 'password'>) => {
    return http.post<SuccessResponse<string>>(URL_REGISTER, body)
  },
  loginAccount: (body: Pick<UserSchema, 'email' | 'password'>) => {
    return http.post<LoginResponse>(URL_LOGIN, body)
  },
  getProfile: ({ signal }: { signal?: AbortSignal }) => {
    return http.get<SuccessResponse<Profile>>('client/users/profile', { signal })
  }
}

export default authApi
