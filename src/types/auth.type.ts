export type LoginResponse = {
  data: {
    access_token: {
      token: string
      created: string
      expiry: number
    }
    refresh_token: {
      token: string
      created: string
      expiry: number
    }
  }
}
