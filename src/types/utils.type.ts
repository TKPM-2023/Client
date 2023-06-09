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
export type OrderStatusParams = 1 | 2 | 3 | 4

export type FilterType = {
  param: string
  options: { name: string; value: string | number; disabled?: boolean }[]
}
