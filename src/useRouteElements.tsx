import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthLayout from './layouts/AuthLayout'
import config from './config'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import MainLayout from './layouts/MainLayout'
import Profile from './components/Profile'

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
