import { Product } from './product.type'

export interface Category {
  id: string
  status: number
  created_at: string
  updated_at: string
  name: string
  description: string
  icon: {
    id: number
    url: string
    width: number
    height: number
  }
  total_product: number
  products: Product[]
}

export interface CategoryList {
  data: Category[]
  paging: {
    page?: number
    limit?: number
    total?: number
    cursor?: string
    next_cursor?: string
  }
  filter: {
    status?: number
  }
}

export interface CategoryListConfig {
  limit?: number | string
  status?: number
  cursor?: string
  page?: number | string
}
