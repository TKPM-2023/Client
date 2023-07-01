import { Suspense, lazy, useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import routes from './constants/routes'
import { AppContext } from './contexts/app.context'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
// user profile
const UserProfile = lazy(() => import('./pages/UserProfile'))
const GeneralInfor = lazy(() => import('./pages/UserProfile/pages/GeneralInfor'))
const ChangePassword = lazy(() => import('./pages/UserProfile/pages/ChangePassword'))
const UserAddress = lazy(() => import('./pages/UserProfile/pages/UserAddress'))
const UserOrders = lazy(() => import('./pages/UserProfile/pages/Orders'))
const DetailOrdered = lazy(() => import('./pages/UserProfile/pages/DetailOrdered'))
const Reviews = lazy(() => import('./pages/UserProfile/pages/Reviews'))
//
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Admin = lazy(() => import('./pages/Admin'))
const Dashboard = lazy(() => import('./pages/Admin/components/Dashboard'))
const UserManagement = lazy(() => import('./pages/Admin/pages/UserManagement'))
const ProductManagement = lazy(() => import('./pages/Admin/pages/ProductManagement'))
const CategoryManagement = lazy(() => import('./pages/Admin/pages/CategoryManagement'))
const DetailProduct = lazy(() => import('./pages/DetailProduct'))
const DetailCategory = lazy(() => import('./pages/DetailCategory'))
const Cart = lazy(() => import('./pages/Cart'))
const Order = lazy(() => import('./pages/Order'))
const NotFound = lazy(() => import('./pages/NotFound'))
const OrderManagement = lazy(() => import('./pages/Admin/pages/OrderManagement'))
const SearchProduct = lazy(() => import('./pages/SearchProduct'))

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
        {
          path: routes.home,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          )
        },
        {
          path: routes.detailProduct,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <DetailProduct />
            </Suspense>
          )
        },
        {
          path: routes.detailCategory,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <DetailCategory />
            </Suspense>
          )
        },
        {
          path: routes.search,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <SearchProduct />
            </Suspense>
          )
        }
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
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <UserProfile />
                </Suspense>
              ),
              children: [
                {
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <GeneralInfor />
                    </Suspense>
                  ),
                  index: true
                },
                {
                  path: routes.changePassword,
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <ChangePassword />
                    </Suspense>
                  )
                },
                {
                  path: routes.userAddress,
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <UserAddress />
                    </Suspense>
                  )
                },
                {
                  path: routes.userOrders,
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <UserOrders />
                    </Suspense>
                  )
                },
                {
                  path: routes.reviews,
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <Reviews />
                    </Suspense>
                  )
                },
                {
                  path: routes.detailUserOrder,
                  element: (
                    <Suspense fallback={<div>Loading...</div>}>
                      <DetailOrdered />
                    </Suspense>
                  )
                }
              ]
            },
            {
              path: routes.cart,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Cart />
                </Suspense>
              )
            },
            {
              path: routes.order,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Order />
                </Suspense>
              )
            }
          ]
        },
        {
          path: routes.admin,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Admin />
            </Suspense>
          ),
          children: [
            {
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
                </Suspense>
              ),
              index: true
            },
            {
              path: routes.manageUsers,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <UserManagement />
                </Suspense>
              )
            },
            {
              path: routes.manageProducts,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <ProductManagement />
                </Suspense>
              )
            },
            {
              path: routes.manageCategories,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <CategoryManagement />
                </Suspense>
              )
            },
            {
              path: routes.manageOrders,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <OrderManagement />
                </Suspense>
              )
            }
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
            {
              path: routes.login,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              )
            },
            {
              path: routes.register,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Register />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      )
    }
  ])

  return routeElements
}

export default useRouteElements
