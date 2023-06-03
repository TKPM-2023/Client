import { StatusParams } from './utils.type'

export type Product = {
  id: string
  status: StatusParams
  created_at: string
  updated_at: string
  name: string
  description: string
  price: number
  quantity: number
  images: {
    id: number
    url: string
    width: number
    height: number
  }[]
  total_rating: number
  category_id: string
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
    category_id?: number
  }
}

export interface ProductListConfig {
  limit?: number
  status?: StatusParams
  category_id?: string
}
