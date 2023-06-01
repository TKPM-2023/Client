import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponse, ToUndefined } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'admin/products'

const productApi = {
  getProducts: (params: ProductListConfig) => {
    return http.get<ProductList>(URL, { params })
  },
  getProductDetail: (id: string) => {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`)
  },
  createProduct: (body: Product) => {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  updateProduct: (id: string, body: ToUndefined<Product>) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${id}`, body)
  },
  deleteProduct: (id: string) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${id}`)
  }
}

export default productApi
