import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { UserSchema } from 'src/utils/rules'

const URL = 'admin/users'

const userApi = {
  updateUser: (id: string | undefined, body: UserSchema) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${id}`, body)
  },
  changePassword: (id: string | undefined, body: { password: string; new_password: string }) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${id}/password`, body)
  }
}

export default userApi
