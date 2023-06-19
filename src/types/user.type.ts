import { StatusParams } from './utils.type'

export interface User {
  id: string
  status: StatusParams
  created_at: string
  updated_at: string
  email: string
  password?: string
  avatar: {
    url: string
    id: number
  }
  last_name: string
  first_name: string
  phone: string
  role: 'user' | 'admin'
  cart_id?: string
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
    status?: StatusParams
  }
}

export interface UserListConfig {
  limit?: number | string
  status?: number | string
  role?: string
  cursor?: string
  page?: number | string
}

export type Profile = Pick<
  User,
  | 'id'
  | 'created_at'
  | 'email'
  | 'first_name'
  | 'last_name'
  | 'phone'
  | 'role'
  | 'status'
  | 'updated_at'
  | 'avatar'
  | 'cart_id'
>
