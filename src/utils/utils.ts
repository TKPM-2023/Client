import { type AxiosError, isAxiosError, HttpStatusCode } from 'axios'

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
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
