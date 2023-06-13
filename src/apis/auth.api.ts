import http from 'src/utils/http'
import { LoginResponse } from 'src/types/auth.type'
import { UserSchema } from 'src/utils/rules'
import { Profile } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'

const authApi = {
  registerAccount: (body: Pick<UserSchema, 'email' | 'first_name' | 'last_name' | 'password'>) => {
    return http.post<SuccessResponse<string>>('register', body)
  },
  loginAccount: (body: Pick<UserSchema, 'email' | 'password'>) => {
    return http.post<LoginResponse>('authenticate', body)
  },
  getProfile: ({ signal }: { signal?: AbortSignal }) => {
    return http.get<SuccessResponse<Profile>>('profile', { signal })
  }
}

export default authApi
