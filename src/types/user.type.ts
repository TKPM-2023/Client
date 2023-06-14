export interface User {
  id: string
  status: number
  created_at: string
  updated_at: string
  email: string
  password: string
  avatar: {
    url: string
    id: number
  }
  last_name: string
  first_name: string
  phone: string
  role: 'user' | 'admin'
}

export interface UserList {
  data: User[]
  paging: {
    page: number
    limit: number
    total: number
    cursor?: string
    next_cursor?: string
  }
  filter: {
    status?: number
  }
}

export interface UserListConfig {
  limit?: number | string
  status?: number | string
  cursor?: string
  page?: number | string
}

export type Profile = Pick<
  User,
  'id' | 'created_at' | 'email' | 'first_name' | 'last_name' | 'phone' | 'role' | 'status' | 'updated_at' | 'avatar'
>

export type AddressType = {
  name: string
  phone: string
  address: string
}
