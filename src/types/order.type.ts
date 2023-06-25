import { AddressType } from './contact.type'
import { Upload } from './upload.type'
import { OrderStatusParams } from './utils.type'

export type OrderProductType = {
  product_origin: { id: string }
  quantity: number
  discount?: number
}

export type CreateOrderType = {
  contact_id: string
  products: OrderProductType[]
  total_price: number
}

type ProductOriginType = {
  id: string
  name: string
  description: string
  images: Upload[]
}

export type OrderedProductType = {
  id: string
  status: number
  created_at: string
  updated_at: string
  order_id: string
  product_origin: ProductOriginType
  price: number
  quantiy: number
  discount: number
}

export type OrderType = {
  id: string
  status: number
  created_at: string
  updated_at: string
  user_id: string
  total_price: number
  order_status: OrderStatusParams
  products: OrderedProductType[]
  contact_id: string | null
  contact: AddressType
}

export type OrderResponseType = {
  data: OrderType[]
  paging: {
    page: number
    limit: number
    total: number
    cursor: string
    next_cursor: string
  }
  filter: {
    user_id: string
  }
}

export interface OrderListConfig {
  limit?: number | string
  status?: number | string
  order_status?: number | string
  cursor?: string
  page?: number | string
  user_id?: string
}
