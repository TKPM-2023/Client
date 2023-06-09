const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  profile: '/profile',
  changePassword: '/profile/change-password',
  userAddress: '/profile/user-address',
  userOrders: '/profile/my-oders',
  detailUserOrder: '/profile/my-oders/:orderId',
  reviews: '/profile/reviews',
  admin: '/admin',
  manageOrders: '/admin/manage-orders',
  manageUsers: '/admin/manage-users',
  manageCategories: '/admin/manage-categories',
  manageProducts: '/admin/manage-products',
  detailProduct: '/product/:id',
  detailCategory: '/category/:categoryId',
  order: '/order-and-payment',
  cart: '/my-cart',
  search: '/search'
} as const

export default routes
