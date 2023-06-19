import { Product } from 'src/types/product.type'

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

export type PriceQuantityType = {
  product_id: string
  price: number
  quantity: number
}
