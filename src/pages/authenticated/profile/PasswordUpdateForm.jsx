import React, { useState } from "react"

function PasswordUpdateForm() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleOldPasswordChange = event => {
    setOldPassword(event.target.value)
  }

  const handleNewPasswordChange = event => {
    setNewPassword(event.target.value)
  }

  const handleConfirmPasswordChange = event => {
    setConfirmPassword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    // TODO: Handle form submission
  }

  return (
    <PageWrapper>
      {() => (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Update Password</h1>
          <a href="/" className="text-blue-500 underline mb-4">
            Go Back
          </a>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block font-medium text-gray-700 mb-2"
              >
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                className="border border-gray-400 p-2 rounded-lg w-full"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="border border-gray-400 p-2 rounded-lg w-full"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="border border-gray-400 p-2 rounded-lg w-full"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}
    </PageWrapper>
  )
}

export default PasswordUpdateForm
