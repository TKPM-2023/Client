import { SuccessResponse } from 'src/types/utils.type'
import { PostRatingType, RatingsConfig, ListRatingByUser } from 'src/types/rating.type'
import http from 'src/utils/http'

const URL = 'client/products/rating'

const ratingApi = {
  postRating: (productId: string, body: PostRatingType) => {
    return http.post<SuccessResponse<string>>(`client/products/${productId}/rating`, body)
  },
  getListRatingByUser: (params: RatingsConfig, signal?: AbortSignal) => {
    return http.get<ListRatingByUser>(URL, { params, signal })
  },
  updateRating: (ratingId: string, body: { point: number; comment: string }) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${ratingId}`, body)
  }
}

export default ratingApi
