import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import routes from './constants/routes'
import { AppContext } from './contexts/app.context'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
// user profile
import UserProfile from './pages/UserProfile'
import GeneralInfor from './pages/UserProfile/pages/GeneralInfor'
import ChangePassword from './pages/UserProfile/pages/ChangePassword'
import UserAddress from './pages/UserProfile/pages/UserAddress'
import UserOrders from './pages/UserProfile/pages/Orders'
import DetailOrdered from './pages/UserProfile/pages/DetailOrdered'
import Reviews from './pages/UserProfile/pages/Reviews'
//
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Dashboard from './pages/Admin/components/Dashboard'
import UserManagement from './pages/Admin/pages/UserManagement'
import ProductManagement from './pages/Admin/pages/ProductManagement'
import CategoryManagement from './pages/Admin/pages/CategoryManagement'
import DetailProduct from './pages/DetailProduct'
import DetailCategory from './pages/DetailCategory'
import Cart from './pages/Cart'
import Order from './pages/Order'
import NotFound from './pages/NotFound'
import OrderManagement from './pages/Admin/pages/OrderManagement'
import SearchProduct from './pages/SearchProduct'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={routes.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Navigate to={routes.home} /> : <Outlet />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [
        { path: routes.home, element: <Home /> },
        { path: routes.detailProduct, element: <DetailProduct /> },
        { path: routes.detailCategory, element: <DetailCategory /> },
        { path: routes.search, element: <SearchProduct /> }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: routes.profile,
              element: <UserProfile />,
              children: [
                {
                  element: <GeneralInfor />,
                  index: true
                },
                {
                  path: routes.changePassword,
                  element: <ChangePassword />
                },
                {
                  path: routes.userAddress,
                  element: <UserAddress />
                },
                {
                  path: routes.userOrders,
                  element: <UserOrders />
                },
                {
                  path: routes.reviews,
                  element: <Reviews />
                },
                {
                  path: routes.detailUserOrder,
                  element: <DetailOrdered />
                }
              ]
            },
            { path: routes.cart, element: <Cart /> },
            { path: routes.order, element: <Order /> }
          ]
        },
        {
          path: routes.admin,
          element: <Admin />,
          children: [
            { element: <Dashboard />, index: true },
            { path: routes.manageUsers, element: <UserManagement /> },
            { path: routes.manageProducts, element: <ProductManagement /> },
            { path: routes.manageCategories, element: <CategoryManagement /> },
            { path: routes.manageOrders, element: <OrderManagement /> }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '',
          element: <AuthLayout />,
          children: [
            { path: routes.login, element: <Login /> },
            { path: routes.register, element: <Register /> }
          ]
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}

export default useRouteElements
