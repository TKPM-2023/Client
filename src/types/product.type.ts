import { Upload } from './upload.type'

export type Product = {
  id: string
  status: number
  created_at: string
  updated_at: string
  name: string
  description: string
  price: number
  quantity: number
  images?: Upload[]
  total_rating?: number
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
    status?: number
    category_id?: string
    page?: number | string
  }
}

export interface ProductListConfig {
  limit?: number | string
  page?: number | string
  status?: number
  category_id?: string
}
