import { useRoutes } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import config from './config'

function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: config.routes.home,
      element: <Home />
    },
    {
      path: config.routes.login,
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: config.routes.register,
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElements
