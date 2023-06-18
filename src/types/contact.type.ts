export type AddressType = {
  id?: string
  name: string
  phone: string
  addr: string
  user_id?: string
}

export interface ContactListConfig {
  limit?: number | string
  page?: number | string
  user_id?: string
  status?: number
}

export type ContactList = {
  data: AddressType[]
  paging: {
    page: number
    limit: number
    total: number
    cursor?: string
    next_cursor?: string
  }
  filter: {
    user_id?: string | null
    status?: number
  }
}
