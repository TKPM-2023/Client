import { Upload } from './upload.type'
import { StatusParams } from './utils.type'
import { User } from './user.type'

export type RatingType = {
  id: string
  status: StatusParams
  created_at: string
  updated_at: string
  point: number
  comment: string
  user_id: string
  product_id: string
  User: User
}

export type Product = {
  id: string
  status: StatusParams
  created_at: string
  updated_at: string
  name: string
  description: string
  price: number
  quantity: number
  images?: Upload[]
  total_rating?: number
  category_id: string
  ratings?: RatingType[]
}

export type ProductList = {
  data: Product[]
  paging: {
    page: number
    limit: number
    total: number
    cursor?: string
    next_cursor?: string
  }
  filter: {
    status?: StatusParams
    category_id?: string
    page?: number | string
  }
}

export interface ProductListConfig {
  limit?: number | string
  page?: number | string
  status?: number | string
  category_id?: string
}
