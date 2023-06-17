import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'
import { ProductSchema } from 'src/utils/rules'

const URL = 'admin/products'
const URL_USER = '/products'

const productApi = {
  getProducts: (params: ProductListConfig, signal?: AbortSignal) => {
    return http.get<ProductList>(URL, { params, signal })
  },
  getProductDetail: (id: string) => {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },
  createProduct: (body: ProductSchema) => {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  updateProduct: (id: string, body: ProductSchema) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${id}`, body)
  },
  deleteProduct: (id: string) => {
    return http.delete<SuccessResponse<boolean>>(`${URL}/${id}`)
  },
  getProductsFromUser: (params: ProductListConfig, signal?: AbortSignal) => {
    return http.get<ProductList>(URL_USER, { params, signal })
  },
  getProductDetailFromUser: (id: string) => {
    return http.get<SuccessResponse<Product>>(`${URL_USER}/${id}`)
  }
}

export default productApi
