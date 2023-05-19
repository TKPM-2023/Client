import { useRoutes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AuthLayout from './layouts/AuthLayout'
import config from './config'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: config.routes.home,
      element: <Home />
    },
    {
      path: '',
      element: <AuthLayout />,
      children: [
        {
          path: config.routes.login,
          element: <Login />
        },
        {
          path: config.routes.register,
          element: <Register />
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElements
