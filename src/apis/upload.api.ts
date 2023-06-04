import { Upload } from 'src/types/upload.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const uploadApi = {
  upload: (body: FormData) => {
    return http.post<SuccessResponse<Upload>>('upload', body, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  remove: (id: string) => {
    return http.delete<SuccessResponse<true>>(`admin/upload/remove/${id}`)
  }
}

export default uploadApi
