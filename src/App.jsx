import { lazy, Suspense, useContext } from "react"
import chasescrollLogo from "@/assets/images/chasescroll-logo-large.png"
import { useAuth } from "./context/authContext"
import { ToastContainer } from "react-toastify"
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider, QueryClient } from 'react-query'
import "react-toggle/style.css"
import { theme } from "./theme"

const AuthenticatedRoutes = lazy(() =>
  import("@/components/AuthenticatedRoutes")
)
const UnAuthenticatedRoutes = lazy(() =>
  import("@/components/UnAuthenticatedRoutes")
)

const queryClient = new QueryClient();

const App = () => {
  const { authorized } = useAuth()

  const suspenseFallback = (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="flex flex-col gap-8 justify-center items-center">
        <img alt="logo" className="w-40 h-40" src={chasescrollLogo} />
        <p className="font-semibold text-center w-fit text-4xl text-chasescrollPurple">
          Chasescroll
        </p>
      </div>
    </div>
  )

  return (
    <Suspense fallback={suspenseFallback}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <>
            <ToastContainer />
            {authorized ? <AuthenticatedRoutes /> : <UnAuthenticatedRoutes />}
          </>
        </QueryClientProvider>
      </ChakraProvider>
    </Suspense>
  )
}

export default App
