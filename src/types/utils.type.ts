export type ErrorResponse = {
  error_key: string
  log: string
  message: string
  status_code: number
}

export type SuccessResponse<Data> = {
  data: Data
}

export type ToUndefined<T> = {
  [P in keyof T]?: ToUndefined<T[P]>
}

export type StatusParams = 0 | 1
export type OrderStatusParams = 0 | 1 | 2
