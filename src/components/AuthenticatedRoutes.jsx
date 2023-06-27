import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PATH_NAMES, NAVIGATION_ROUTES, OTHER_AUTHENTICATED_ROUTES, OTHER_UNAUTHENTICATED_ROUTES } from "@/constants";
import ErrorPage from "@/pages/unauthenticated/ErrorPage";
import { useAuth } from "@/context/authContext";
import Onboarding from "../pages/unauthenticated/onboarding";

const AuthenticatedRoutes = () => {
  const { authorized } = useAuth();

  const authenticatedRoutes = createBrowserRouter([
    {
      path: PATH_NAMES.root,
      element: <Onboarding />,
      // errorElement: <ErrorPage />,
    },
    ...NAVIGATION_ROUTES.map((route) => ({
      path: route.path,
      element: authorized ? <route.element /> : window.location.assign(PATH_NAMES.root),
    })),
    ...OTHER_UNAUTHENTICATED_ROUTES.map((route) => ({
      path: route.path,
      element: <route.element />,
    })),
    ...OTHER_AUTHENTICATED_ROUTES.map((route) => ({
      path: route.path,
      element: authorized ? <route.element /> : window.location.assign(PATH_NAMES.root),
    })),
  ]);

  return <RouterProvider router={authenticatedRoutes} />;
};

export default AuthenticatedRoutes;
