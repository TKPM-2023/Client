import { Product } from 'src/types/product.type'
import { Upload } from './upload.type'

export type AddProductToCartType = {
  product_id: string
  quantity?: number
}

export type CartProductType = {
  cart_id: string
  product_id: string
  quantity: number
  Product: Product
}

export type CartType = {
  data: {
    id: string
    status: 1
    created_at: string
    updated_at: string
    total_product: number
    cart_products: CartProductType[]
  }
}

export type ProductIsOrderingType = {
  product_id: string
  price: number
  quantity: number
  name: string
  images: Upload[]
}
