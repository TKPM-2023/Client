export type LoginResponse = {
  access_token: {
    token: string
  }
  refresh_token: {
    token: string
  }
}

export type ErrorResponse = {
  error_key: string
  log: string
  message: string
  status_code: number
}
