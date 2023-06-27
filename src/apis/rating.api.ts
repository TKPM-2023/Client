import { SuccessResponse } from 'src/types/utils.type'
import { PostRatingType } from 'src/types/rating.type'
import http from 'src/utils/http'

const ratingApi = {
  postRating: (productId: string, body: PostRatingType) => {
    return http.post<SuccessResponse<string>>(`client/products/${productId}/rating`, body)
  }
}

export default ratingApi
