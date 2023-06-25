import { CartType, AddProductToCartType } from 'src/types/cart.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'client/carts'

const cartApi = {
  getCart: () => {
    return http.get<CartType>(URL)
  },
  updateProductQuantity: (cartId: string, body: AddProductToCartType) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${cartId}/quantity`, body)
  },
  addProductToCard: (cartId: string, body: AddProductToCartType[]) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${cartId}`, body)
  },
  deleteProductFromCart: (cartId: string, body: AddProductToCartType[]) => {
    return http.request<SuccessResponse<boolean>>({
      url: `${URL}/${cartId}`,
      method: 'DELETE',
      data: body
    })
  }
}

export default cartApi
