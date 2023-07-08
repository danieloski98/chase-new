import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ClosedEyeIcon, OpenEyeIcon } from "@/components/Svgs"
import { useAuth } from "../../context/authContext"
import { PATH_NAMES } from "../../constants/paths.constant"
import { toast } from "react-toastify"
import ButtonSpinner from "../ButtonSpinners"

const LoginForm = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const { username, password } = userDetails
  const { login } = useAuth()
  const navigate = useNavigate()

  const togglePasswordVisibility = () => setShowPassword(state => !state)

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails(info => ({
      ...info,
      [name]: value,
    }))
  }

  const handleLogin = async () => {
    try {
      await login(userDetails);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false)
    }
  };

  const handleSubmit = event => {
    event.preventDefault()
    setLoading(true)
    handleLogin()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[463px] w-full gap-4"
    >
      <input
        className="w-full rounded-lg border border-purple-100 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
        placeholder="Username"
        name="username"
        onChange={handleChange}
        type="text"
        value={username}
      />
      <div className="relative w-full">
        <input
          className="w-full rounded-lg border border-purple-100 outline-chasescrollBlue px-3 py-2.5 text-chasescrollTextGrey"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          value={password}
        />
        <div
          className="absolute right-2 top-2 cursor-pointer text-chasescrollTextGrey"
          onClick={togglePasswordVisibility}
        >
          {!showPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
        </div>
      </div>
      <div className="flex justify-between text-xs p-0.5">
        <Link to="/forgot-password" className="text-chasescrollBlue">
          Forgot password
        </Link>
        <p className="text-chasescrollTextGrey opacity-70">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-chasescrollBlue">
            Sign up
          </Link>
        </p>
      </div>
      <button
        type="submit"
        className={`bg-chasescrollBlue text-white py-2.5 text-center rounded-lg font-bold text-xl flex items-center gap-4 justify-center ${loading && 'bg-opacity-50 cursor-not-allowed'}`}
        disabled={loading}
      >
        Sign In {loading && <ButtonSpinner />}
      </button>
    </form>
  )
}

export default LoginForm
