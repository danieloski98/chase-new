import { createRoot } from "react-dom/client"
import { AuthProvider } from "./context/authContext"
import App from "./App"
import "react-phone-number-input/style.css"
import "@splidejs/react-splide/css"
import "react-toastify/dist/ReactToastify.css"
import "./index.css"

import './config/firebase'

createRoot((document as any).getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
