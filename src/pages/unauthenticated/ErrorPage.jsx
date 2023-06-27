import { useEffect, useState } from "react"
import { useNavigate, useRouteError } from "react-router-dom"
import { PATH_NAMES } from "../../constants";
import lostImage from "@/assets/svg/void.svg"

const ErrorPage = () => {
  const error = useRouteError()
  const navigate = useNavigate()
  console.error(error)

  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    setTimeout(() => navigate(PATH_NAMES.root), 5000)
  }, [])

  const decreaseCountdown = () => setCountdown(countdown => countdown - 1)

  useEffect(() => {
    const interval = setInterval(decreaseCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={lostImage} alt="" className="w-40 h-40" />
        <h1 className="text-3xl font-semibold">Uh oh!</h1>
        <p className="text-lg">you seem lost... taking you home in {countdown}</p>

        {/* <p>
          <em>{error.statusText || error.message}</em>
        </p> */}
      </div>
    </div>
  )
}

export default ErrorPage
