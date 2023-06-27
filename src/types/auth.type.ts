import { SuccessResponse } from './utils.type'

export type LoginResponse = {
  access_token: {
    token: string
  }
  refresh_token: {
    token: string
  }
}

export type RefreshTokenResponse = SuccessResponse<{
  access_token: {
    token: string
    created: string
    expiry: number
  }
}>
