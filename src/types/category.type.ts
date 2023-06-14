import { Product } from './product.type'
import { Upload } from './upload.type'
import { StatusParams } from './utils.type'

export interface Category {
  id: string
  status: StatusParams
  created_at: string
  updated_at: string
  name: string
  description: string
  icon?: Upload
  total_product: number
  products?: Product[]
}

export interface CategoryList {
  data: Category[]
  paging: {
    page: number
    limit: number
    total: number
    cursor?: string
    next_cursor?: string
  }
  filter: {
    status?: StatusParams
  }
}

export interface CategoryListConfig {
  limit?: number | string
  status?: number | string
  cursor?: string
  page?: number | string
}
