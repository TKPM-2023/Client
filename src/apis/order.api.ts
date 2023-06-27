import { CreateOrderType, OrderListConfig, OrderResponseType, OrderType } from 'src/types/order.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL = 'client/orders'

export type UploadOrderBody = Pick<OrderType, 'order_status'>

const orderApi = {
  createOrder: (body: CreateOrderType) => {
    return http.post<SuccessResponse<string>>(URL, body)
  },
  getListOrder: (params: OrderListConfig, signal?: AbortSignal) => {
    return http.get<OrderResponseType>(URL, { params, signal })
  },
  getDetailOrder: (orderId: string) => {
    return http.get<SuccessResponse<OrderType>>(`${URL}/${orderId}`)
  },
  deleteOrder: (orderId: string) => {
    return http.delete<SuccessResponse<boolean>>(`${URL}/${orderId}`)
  },
  updateOrder: (orderId: string | undefined, body: UploadOrderBody) => {
    return http.patch<SuccessResponse<boolean>>(`${URL}/${orderId}`, body)
  }
}

export default orderApi
