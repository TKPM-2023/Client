import { CartType, AddProductToCartType } from 'src/types/cart.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'client/carts'

const cartApi = {
  getCart: () => {
    return http.get<CartType>(`${URL}`)
  },
  updateProductQuantity: (body: AddProductToCartType) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/quantity`, body)
  },
  addProductToCard: (body: AddProductToCartType[]) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}`, body)
  },
  deleteProductFromCart: (body: AddProductToCartType[]) => {
    return http.request<SuccessResponse<boolean>>({
      url: `${URL}`,
      method: 'DELETE',
      data: body
    })
  }
}

export default cartApi
