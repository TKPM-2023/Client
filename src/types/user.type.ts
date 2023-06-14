export type User = {
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

export type Profile = Pick<
  User,
  'id' | 'created_at' | 'email' | 'first_name' | 'last_name' | 'phone' | 'role' | 'status' | 'updated_at' | 'avatar'
>
