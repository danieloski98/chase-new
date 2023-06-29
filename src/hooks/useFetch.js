import CONFIG from "@/config"
import { useState } from "react"
import { toast } from "react-toastify"

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendRequest = async (
    url,
    method = "GET",
    body = null,
    headers = {},
    isFormData = false
  ) => {
    setIsLoading(true)

    try {
      const fetchOptions = {
        method,
        headers: {
          ...headers,
        },
      }

      if (body) {
        fetchOptions.body = isFormData ? body : JSON.stringify(body)
        if (isFormData) {
          delete fetchOptions.headers["Content-Type"]
        } else {
          fetchOptions.headers["Content-Type"] = "application/json"
        }
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, fetchOptions)

      const responseData = await response.json()

      if (!response.ok) {
        toast.error(responseData?.error_description)
        throw new Error(
          responseData.message ||
            responseData?.error_description ||
            "An unknown error occurred."
        )
      }

      setIsLoading(false)

      return responseData
    } catch (error) {
      setIsLoading(false)
      setError(error)
      throw error
    }
  }

  return { sendRequest, isLoading, error }
}
