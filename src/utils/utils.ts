import { type AxiosError, isAxiosError, HttpStatusCode } from 'axios'
import { ErrorResponse } from 'src/types/utils.type'

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosUnauthorizedError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosUnauthorizedError<ErrorResponse>(error) && error.response?.data.error_key === 'ErrTokenExpired'
}

export const formatDate = (date: string) => {
  const _date = new Date(date)
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  const formattedDate = _date.toLocaleDateString('en-GB', options)

  return formattedDate
}

export const formatNumber = (num: number) => {
  return Intl.NumberFormat('en-DE').format(num)
}

export const renderRole = (role: 'user' | 'admin') => (role === 'admin' ? 'Quản trị' : 'Người dùng')

export const renderStatus = (status: 1 | 0) => (status === 1 ? 'Tồn tại' : 'Đã xóa')

export const renderOrderStatus = (orderStatus: 4 | 3 | 2 | 1 | -1) => {
  if (orderStatus === -1) return 'Tất cả'
  if (orderStatus === 1) return 'Chờ xác nhận'
  if (orderStatus === 2) return 'Đang giao hàng'
  if (orderStatus === 3) return 'Hoàn thành'
  if (orderStatus === 4) return 'Đã hủy'
  return ''
}
