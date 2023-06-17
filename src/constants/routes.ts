const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  changePassword: '/profile/change-password',
  userAddress: '/profile/user-address',
  userOrders: '/profile/my-oders',
  reviews: '/profile/reviews',
  admin: '/admin',
  manageUsers: '/admin/manage-users',
  manageCategories: '/admin/manage-categories',
  manageProducts: '/admin/manage-products',
  detailProduct: '/product/:id',
  detailCategory: '/category/:categoryId',
  order: '/order-and-payment',
  cart: '/my-cart'
} as const

export default routes
