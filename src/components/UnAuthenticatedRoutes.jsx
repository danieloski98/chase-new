import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Onboarding from "@/pages/unauthenticated/onboarding"
import ErrorPage from "@/pages/unauthenticated/ErrorPage"
import { PATH_NAMES } from "@/constants"
import { OTHER_UNAUTHENTICATED_ROUTES } from "@/constants"

const unAuthenticatedRoutes = createBrowserRouter([
  {
    path: PATH_NAMES.root,
    element: <Onboarding />,
    errorElement: <ErrorPage />,
  },
  ...OTHER_UNAUTHENTICATED_ROUTES.map(route => ({
    path: route.path,
    element: <route.element />
  })),
])

const UnAuthenticatedRoutes = () => (
  <RouterProvider router={unAuthenticatedRoutes} />
)

export default UnAuthenticatedRoutes
