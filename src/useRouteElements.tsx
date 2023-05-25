import { useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import config from './config'
import { AppContext } from './contexts/app.context'

import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Profile from './components/Profile'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Dashboard from './pages/Admin/Dashboard'
import UserManagement from './pages/Admin/contents/UserManagement'
import ProductManagement from './pages/Admin/contents/ProductManagement'
import CategoryManagement from './pages/Admin/contents/CategoryManagement'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Outlet /> : <Navigate to={config.routes.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)

  return isAuthenticated ? <Navigate to={config.routes.home} /> : <Outlet />
}

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <MainLayout />,
      children: [{ path: config.routes.home, element: <Home /> }]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [{ path: config.routes.profile, element: <Profile /> }]
        },
        {
          path: config.routes.admin,
          element: <Admin />,
          children: [
            { element: <Dashboard />, index: true },
            { path: config.routes.manageUsers, element: <UserManagement /> },
            { path: config.routes.manageProducts, element: <ProductManagement /> },
            { path: config.routes.manageCategories, element: <CategoryManagement /> }
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
            { path: config.routes.login, element: <Login /> },
            { path: config.routes.register, element: <Register /> }
          ]
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
