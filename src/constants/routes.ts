const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  changePassword: '/profile/change-password',
  userAddress: '/profile/user-address',
  oders: '/profile/oders',
  carts: '/profile/carts',
  reviews: '/profile/reviews',
  admin: '/admin',
  manageUsers: '/admin/manage-users',
  manageCategories: '/admin/manage-categories',
  manageProducts: '/admin/manage-products',
  detailProduct: '/product/:id',
  categoryApi: '/category/:id'
} as const

export default routes
