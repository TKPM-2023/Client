import { User, UserList, UserListConfig } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { UserSchema } from 'src/utils/rules'

const URL = 'admin/users'

const userApi = {
  getUsers: (params: UserListConfig, signal?: AbortSignal) => {
    return http.get<UserList>(URL, { params, signal })
  },
  getUserDetail: (id: string) => {
    return http.get<SuccessResponse<User>>(`${URL}/${id}`)
  },
  createUser: (
    body: Pick<UserSchema, 'email' | 'first_name' | 'last_name' | 'password' | 'confirm_password' | 'phone' | 'role'>
  ) => {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  updateUser: (id: string, body: Pick<UserSchema, 'first_name' | 'last_name' | 'phone'>) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${id}`, body)
  },
  deleteUser: (id: string) => {
    return http.delete<SuccessResponse<boolean>>(`${URL}/${id}`)
  }
}

export default userApi
