import { User } from './user.type'
import { Product } from './product.type'

export type PostRatingType = {
  point: number
  comment: string
  detail_id: string
}

export type RatingsConfig = {
  status?: number
  user_id: string
}

export type RatingByUser = {
  id: string
  status: number
  created_at: string
  updated_at: string
  point: number
  comment: string
  user_id: string
  product_id: string
  User: User
  product: Product
  detail_id: string
}

export type ListRatingByUser = {
  data: RatingByUser[]
  paging: {
    page: number
    limit: number
    total: number
  }
  filter: {
    status: number
    user_id: string
  }
}
